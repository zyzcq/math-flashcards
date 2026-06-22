const SESSION_KEY = 'math_flashcard_session';
const VALID_USER = { username: 'zyz', password: '123' };

let toastTimer = null;

function readSession() {
    try {
        const data = localStorage.getItem(SESSION_KEY);
        return data ? JSON.parse(data) : null;
    } catch {
        localStorage.removeItem(SESSION_KEY);
        return null;
    }
}

function setSession(username) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ username, loginTime: Date.now() }));
}

function getNextUrl() {
    const params = new URLSearchParams(window.location.search);
    const next = params.get('next');
    if (!next) return 'index.html';
    if (/^[a-z][a-z\d+.-]*:/i.test(next) || next.startsWith('//')) return 'index.html';
    return next;
}

function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.style.borderColor = isError ? 'rgba(239, 68, 68, 0.35)' : 'var(--border-color)';
    toast.style.color = isError ? '#dc2626' : 'var(--text-main)';
    toast.style.opacity = '1';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.style.opacity = '0';
    }, 2200);
}

function setLoading(loading) {
    const button = document.getElementById('login-submit');
    if (!button) return;
    button.disabled = loading;
    button.style.opacity = loading ? '0.72' : '';
    button.querySelector('span').textContent = loading ? '登录中' : '登录';
}

function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    const icon = btn.querySelector('i');
    if (!input || !icon) return;

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

async function tryServerLogin(username, password) {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.status === 404 || response.status === 405) {
            return { available: false };
        }

        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
            return {
                available: true,
                ok: false,
                message: data.error || '登录失败'
            };
        }

        return { available: true, ok: true, data };
    } catch {
        return { available: false };
    }
}

function loginLocally(username, password) {
    if (username !== VALID_USER.username || password !== VALID_USER.password) {
        return { ok: false, message: '用户名或密码错误' };
    }
    return { ok: true };
}

async function handleLogin() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    if (!username || !password) {
        showToast('请输入账号和密码', true);
        return;
    }

    setLoading(true);

    try {
        const serverResult = await tryServerLogin(username, password);
        if (serverResult.available) {
            if (!serverResult.ok) {
                showToast(serverResult.message, true);
                return;
            }
        } else {
            const localResult = loginLocally(username, password);
            if (!localResult.ok) {
                showToast(localResult.message, true);
                return;
            }
        }

        localStorage.removeItem('shared_view');
        setSession(username);
        showToast('登录成功');
        setTimeout(() => {
            window.location.href = getNextUrl();
        }, 450);
    } finally {
        setLoading(false);
    }
}

async function checkAutoLogin() {
    const nextUrl = getNextUrl();
    const needsServerSession = nextUrl.includes('admin.html');

    try {
        const response = await fetch('/api/me', { credentials: 'same-origin' });
        if (response.ok) {
            const data = await response.json();
            if (data.authenticated && data.username) {
                setSession(data.username);
                window.location.href = nextUrl;
                return;
            }
        }
    } catch {
        // Static preview can continue with the local session below.
    }

    if (needsServerSession) return;

    const session = readSession();
    if (session?.username) {
        window.location.href = nextUrl;
    }
}

document.getElementById('login-form')?.addEventListener('submit', event => {
    event.preventDefault();
    handleLogin();
});

window.togglePassword = togglePassword;
window.handleLogin = handleLogin;

checkAutoLogin();
