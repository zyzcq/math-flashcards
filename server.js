const http = require('http');
const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const ROOT_DIR = __dirname;
const DATA_DIR = path.join(ROOT_DIR, 'server-data');
const STATS_FILE = path.join(DATA_DIR, 'analytics.json');
const PORT = Number(process.env.PORT || 3000);
const SESSION_MAX_AGE_MS = 8 * 60 * 60 * 1000;
const VISITOR_MAX_AGE_SECONDS = 365 * 24 * 60 * 60;
const ADMIN_USER = {
    username: process.env.ADMIN_USERNAME || 'zyz',
    password: process.env.ADMIN_PASSWORD || '123'
};

const sessions = new Map();
let stats = createEmptyStats();

const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.md': 'text/markdown; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml; charset=utf-8',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp'
};

function createEmptyStats() {
    return {
        version: 1,
        startedAt: new Date().toISOString(),
        totalVisits: 0,
        visitors: {},
        pages: {},
        visits: []
    };
}

async function loadStats() {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        const raw = await fs.readFile(STATS_FILE, 'utf8');
        const parsed = JSON.parse(raw);
        stats = {
            ...createEmptyStats(),
            ...parsed,
            visitors: parsed.visitors && typeof parsed.visitors === 'object' ? parsed.visitors : {},
            pages: parsed.pages && typeof parsed.pages === 'object' ? parsed.pages : {},
            visits: Array.isArray(parsed.visits) ? parsed.visits : []
        };
    } catch (error) {
        if (error.code !== 'ENOENT') {
            console.warn('Unable to load analytics data, starting fresh:', error.message);
        }
        stats = createEmptyStats();
        await saveStats();
    }
}

async function saveStats() {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const tempFile = `${STATS_FILE}.tmp`;
    await fs.writeFile(tempFile, `${JSON.stringify(stats, null, 2)}\n`, 'utf8');
    await fs.rename(tempFile, STATS_FILE);
}

function parseCookies(header = '') {
    return header.split(';').reduce((cookies, part) => {
        const index = part.indexOf('=');
        if (index === -1) return cookies;
        const key = part.slice(0, index).trim();
        const value = part.slice(index + 1).trim();
        if (!key) return cookies;
        try {
            cookies[key] = decodeURIComponent(value);
        } catch {
            cookies[key] = value;
        }
        return cookies;
    }, {});
}

function appendCookie(res, cookie) {
    const current = res.getHeader('Set-Cookie');
    if (!current) {
        res.setHeader('Set-Cookie', cookie);
    } else if (Array.isArray(current)) {
        res.setHeader('Set-Cookie', [...current, cookie]);
    } else {
        res.setHeader('Set-Cookie', [current, cookie]);
    }
}

function serializeCookie(name, value, options = {}) {
    const segments = [`${name}=${encodeURIComponent(value)}`];
    if (options.maxAge !== undefined) segments.push(`Max-Age=${options.maxAge}`);
    segments.push(`Path=${options.path || '/'}`);
    if (options.httpOnly) segments.push('HttpOnly');
    segments.push(`SameSite=${options.sameSite || 'Lax'}`);
    return segments.join('; ');
}

function sendJson(res, statusCode, payload) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store'
    });
    res.end(JSON.stringify(payload));
}

function sendText(res, statusCode, text) {
    res.writeHead(statusCode, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(text);
}

function readRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
            if (body.length > 64 * 1024) {
                reject(new Error('Request body is too large'));
                req.destroy();
            }
        });
        req.on('end', () => resolve(body));
        req.on('error', reject);
    });
}

async function readJsonBody(req) {
    const body = await readRequestBody(req);
    if (!body) return {};
    return JSON.parse(body);
}

function createSession(username) {
    const id = crypto.randomBytes(32).toString('hex');
    const now = Date.now();
    sessions.set(id, {
        username,
        createdAt: now,
        expiresAt: now + SESSION_MAX_AGE_MS
    });
    return id;
}

function getSession(req) {
    const { sid } = parseCookies(req.headers.cookie);
    if (!sid) return null;

    const session = sessions.get(sid);
    if (!session) return null;
    if (session.expiresAt <= Date.now()) {
        sessions.delete(sid);
        return null;
    }
    return { id: sid, ...session };
}

function requireAdmin(req, res) {
    const session = getSession(req);
    if (!session || session.username !== ADMIN_USER.username) {
        sendJson(res, 401, { error: '需要 zyz 管理员登录' });
        return null;
    }
    return session;
}

function pruneSessions() {
    const now = Date.now();
    for (const [id, session] of sessions) {
        if (session.expiresAt <= now) sessions.delete(id);
    }
}

function getClientIp(req) {
    const forwarded = req.headers['x-forwarded-for'];
    if (typeof forwarded === 'string' && forwarded.trim()) {
        return forwarded.split(',')[0].trim();
    }
    return req.socket.remoteAddress || '';
}

function hashIp(value) {
    if (!value) return '';
    return crypto.createHash('sha256').update(value).digest('hex').slice(0, 16);
}

function truncate(value, length = 180) {
    const text = String(value || '');
    return text.length > length ? `${text.slice(0, length)}...` : text;
}

function getLocalDateKey(value) {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function normalizePagePath(urlPath) {
    if (urlPath === '/') return '/index.html';
    return urlPath;
}

async function recordVisit(req, res, urlPath) {
    const cookies = parseCookies(req.headers.cookie);
    let visitorId = cookies.visitor_id;
    if (!visitorId || !/^[a-f0-9]{32,64}$/i.test(visitorId)) {
        visitorId = crypto.randomBytes(24).toString('hex');
        appendCookie(res, serializeCookie('visitor_id', visitorId, {
            maxAge: VISITOR_MAX_AGE_SECONDS,
            httpOnly: true
        }));
    }

    const now = new Date().toISOString();
    const pagePath = normalizePagePath(urlPath);
    const userAgent = truncate(req.headers['user-agent']);
    const referrer = truncate(req.headers.referer || req.headers.referrer || '');
    const ipHash = hashIp(getClientIp(req));

    stats.totalVisits += 1;

    if (!stats.visitors[visitorId]) {
        stats.visitors[visitorId] = {
            id: visitorId,
            firstSeen: now,
            lastSeen: now,
            visits: 0,
            userAgent,
            ipHash
        };
    }
    stats.visitors[visitorId].lastSeen = now;
    stats.visitors[visitorId].visits += 1;
    stats.visitors[visitorId].lastPath = pagePath;
    stats.visitors[visitorId].userAgent = userAgent;
    stats.visitors[visitorId].ipHash = ipHash;

    if (!stats.pages[pagePath]) {
        stats.pages[pagePath] = {
            path: pagePath,
            visits: 0,
            visitors: {},
            lastSeen: now
        };
    }
    stats.pages[pagePath].visits += 1;
    stats.pages[pagePath].lastSeen = now;
    stats.pages[pagePath].visitors[visitorId] = true;

    stats.visits.unshift({
        id: crypto.randomUUID(),
        at: now,
        path: pagePath,
        visitorId,
        userAgent,
        referrer,
        ipHash
    });
    stats.visits = stats.visits.slice(0, 1000);

    await saveStats();
}

function buildStatsResponse() {
    const visits = Array.isArray(stats.visits) ? stats.visits : [];
    const visitors = Object.values(stats.visitors || {});
    const todayKey = getLocalDateKey(new Date());
    const todayVisits = visits.filter(visit => getLocalDateKey(visit.at) === todayKey);
    const activeCutoff = Date.now() - 15 * 60 * 1000;

    const pages = Object.values(stats.pages || {})
        .map(page => ({
            path: page.path,
            visits: page.visits || 0,
            uniqueVisitors: Object.keys(page.visitors || {}).length,
            lastSeen: page.lastSeen || ''
        }))
        .sort((a, b) => b.visits - a.visits);

    return {
        generatedAt: new Date().toISOString(),
        summary: {
            totalVisits: stats.totalVisits || 0,
            uniqueVisitors: visitors.length,
            todayVisits: todayVisits.length,
            todayUniqueVisitors: new Set(todayVisits.map(visit => visit.visitorId)).size,
            activeVisitors: visitors.filter(visitor => Date.parse(visitor.lastSeen) >= activeCutoff).length,
            trackedPages: pages.length
        },
        pages,
        visitors: visitors
            .map(visitor => ({
                id: visitor.id.slice(0, 8),
                visits: visitor.visits || 0,
                firstSeen: visitor.firstSeen,
                lastSeen: visitor.lastSeen,
                lastPath: visitor.lastPath || '',
                userAgent: visitor.userAgent || ''
            }))
            .sort((a, b) => Date.parse(b.lastSeen) - Date.parse(a.lastSeen))
            .slice(0, 100),
        recentVisits: visits.slice(0, 100).map(visit => ({
            id: visit.id,
            at: visit.at,
            path: visit.path,
            visitorId: visit.visitorId.slice(0, 8),
            userAgent: visit.userAgent || '',
            referrer: visit.referrer || ''
        }))
    };
}

function isInsideRoot(filePath) {
    const resolved = path.resolve(filePath);
    const root = path.resolve(ROOT_DIR);
    return resolved === root || resolved.startsWith(`${root}${path.sep}`);
}

function resolveStaticPath(urlPath) {
    let decodedPath;
    try {
        decodedPath = decodeURIComponent(urlPath);
    } catch {
        return null;
    }

    decodedPath = decodedPath.replace(/\\/g, '/');
    if (decodedPath === '/') decodedPath = '/index.html';
    if (decodedPath.endsWith('/')) decodedPath += 'index.html';

    const filePath = path.resolve(ROOT_DIR, `.${decodedPath}`);
    if (!isInsideRoot(filePath)) return null;
    return filePath;
}

function shouldTrackStaticRequest(req, urlPath, filePath) {
    if (req.method !== 'GET') return false;
    if (urlPath.startsWith('/api/')) return false;
    if (path.basename(filePath).toLowerCase() === 'admin.html') return false;
    return path.extname(filePath).toLowerCase() === '.html';
}

async function serveStatic(req, res, urlPath) {
    const filePath = resolveStaticPath(urlPath);
    if (!filePath) {
        sendText(res, 400, 'Bad request');
        return;
    }

    try {
        const file = await fs.readFile(filePath);
        if (shouldTrackStaticRequest(req, urlPath, filePath)) {
            await recordVisit(req, res, urlPath);
        }

        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, {
            'Content-Type': mimeTypes[ext] || 'application/octet-stream',
            'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600'
        });
        if (req.method === 'HEAD') {
            res.end();
        } else {
            res.end(file);
        }
    } catch (error) {
        if (error.code === 'ENOENT' || error.code === 'EISDIR') {
            sendText(res, 404, 'Not found');
        } else {
            console.error(error);
            sendText(res, 500, 'Internal server error');
        }
    }
}

async function handleApi(req, res, pathname) {
    if (pathname === '/api/health' && req.method === 'GET') {
        sendJson(res, 200, { ok: true });
        return true;
    }

    if (pathname === '/api/login' && req.method === 'POST') {
        let body;
        try {
            body = await readJsonBody(req);
        } catch {
            sendJson(res, 400, { error: '请求内容不是有效 JSON' });
            return true;
        }

        const username = String(body.username || '').trim();
        const password = String(body.password || '');
        if (username !== ADMIN_USER.username || password !== ADMIN_USER.password) {
            sendJson(res, 401, { error: '用户名或密码错误' });
            return true;
        }

        const sessionId = createSession(username);
        appendCookie(res, serializeCookie('sid', sessionId, {
            maxAge: Math.floor(SESSION_MAX_AGE_MS / 1000),
            httpOnly: true
        }));
        sendJson(res, 200, { username, isAdmin: true });
        return true;
    }

    if (pathname === '/api/logout' && req.method === 'POST') {
        const { sid } = parseCookies(req.headers.cookie);
        if (sid) sessions.delete(sid);
        appendCookie(res, serializeCookie('sid', '', {
            maxAge: 0,
            httpOnly: true
        }));
        sendJson(res, 200, { ok: true });
        return true;
    }

    if (pathname === '/api/me' && req.method === 'GET') {
        const session = getSession(req);
        sendJson(res, 200, {
            authenticated: Boolean(session),
            username: session?.username || null,
            isAdmin: session?.username === ADMIN_USER.username
        });
        return true;
    }

    if (pathname === '/api/admin/stats' && req.method === 'GET') {
        if (!requireAdmin(req, res)) return true;
        sendJson(res, 200, buildStatsResponse());
        return true;
    }

    if (pathname === '/api/admin/stats/reset' && req.method === 'POST') {
        if (!requireAdmin(req, res)) return true;
        stats = createEmptyStats();
        await saveStats();
        sendJson(res, 200, buildStatsResponse());
        return true;
    }

    if (pathname.startsWith('/api/')) {
        sendJson(res, 404, { error: '接口不存在' });
        return true;
    }

    return false;
}

async function handleRequest(req, res) {
    pruneSessions();

    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    if (await handleApi(req, res, url.pathname)) return;

    if (!['GET', 'HEAD'].includes(req.method)) {
        sendText(res, 405, 'Method not allowed');
        return;
    }

    await serveStatic(req, res, url.pathname);
}

loadStats().then(() => {
    http.createServer((req, res) => {
        handleRequest(req, res).catch(error => {
            console.error(error);
            if (!res.headersSent) {
                sendText(res, 500, 'Internal server error');
            } else {
                res.end();
            }
        });
    }).listen(PORT, () => {
        console.log(`Math flashcards server running at http://localhost:${PORT}`);
        console.log(`Admin user: ${ADMIN_USER.username}`);
    });
});
