(function() {
    const config = window.MATH_FLASHCARDS_ANALYTICS || {};

    if (config.enabled === false) return;

    if (config.respectDoNotTrack && (
        navigator.doNotTrack === '1' ||
        window.doNotTrack === '1' ||
        navigator.msDoNotTrack === '1'
    )) {
        return;
    }

    const provider = String(config.provider || '').toLowerCase();
    const path = normalizePath(window.location.pathname);
    const excluded = (config.excludePaths || []).some(item => {
        const excludedPath = normalizePath(item);
        return excludedPath === path || path.endsWith(excludedPath);
    });
    if (excluded) return;

    const loaders = {
        cloudflare: loadCloudflare,
        google: loadGoogle,
        gtag: loadGoogle,
        baidu: loadBaidu,
        plausible: loadPlausible,
        umami: loadUmami
    };

    if (!loaders[provider]) {
        warn(`Unknown analytics provider: ${provider || '(empty)'}`);
        return;
    }

    loaders[provider]();

    function normalizePath(value) {
        const text = String(value || '/').split('?')[0].replace(/\/+$/, '');
        if (!text || text === '') return '/';
        if (text.endsWith('/index.html')) return text.slice(0, -'/index.html'.length) || '/';
        return text;
    }

    function hasValue(value) {
        const text = String(value || '').trim();
        return Boolean(text) && !/^(your-|填入|replace-|todo)/i.test(text);
    }

    function appendScript(src, attrs = {}) {
        const script = document.createElement('script');
        script.src = src;
        Object.entries(attrs).forEach(([key, value]) => {
            if (value === false || value === undefined || value === null) return;
            if (value === true) {
                script.setAttribute(key, '');
            } else {
                script.setAttribute(key, String(value));
            }
        });
        document.head.appendChild(script);
        return script;
    }

    function warn(message) {
        if (window.console && typeof window.console.warn === 'function') {
            window.console.warn(`[analytics] ${message}`);
        }
    }

    function loadCloudflare() {
        const token = config.cloudflare?.token;
        if (!hasValue(token)) {
            warn('Cloudflare token is empty. Fill js/analytics-config.js first.');
            return;
        }

        appendScript('https://static.cloudflareinsights.com/beacon.min.js', {
            defer: true,
            'data-cf-beacon': JSON.stringify({ token })
        });
    }

    function loadGoogle() {
        const measurementId = config.google?.measurementId;
        if (!hasValue(measurementId)) {
            warn('Google measurementId is empty. Fill js/analytics-config.js first.');
            return;
        }

        window.dataLayer = window.dataLayer || [];
        window.gtag = function() {
            window.dataLayer.push(arguments);
        };
        window.gtag('js', new Date());
        window.gtag('config', measurementId);

        appendScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`, {
            async: true
        });
    }

    function loadBaidu() {
        const siteId = config.baidu?.siteId;
        if (!hasValue(siteId)) {
            warn('Baidu siteId is empty. Fill js/analytics-config.js first.');
            return;
        }

        window._hmt = window._hmt || [];
        appendScript(`https://hm.baidu.com/hm.js?${encodeURIComponent(siteId)}`, {
            async: true
        });
    }

    function loadPlausible() {
        const domain = config.plausible?.domain || window.location.hostname;
        const src = config.plausible?.src || 'https://plausible.io/js/script.js';
        if (!hasValue(domain) || !hasValue(src)) {
            warn('Plausible domain or src is empty. Fill js/analytics-config.js first.');
            return;
        }

        appendScript(src, {
            defer: true,
            'data-domain': domain
        });
    }

    function loadUmami() {
        const websiteId = config.umami?.websiteId;
        const src = config.umami?.src;
        if (!hasValue(websiteId) || !hasValue(src)) {
            warn('Umami websiteId or src is empty. Fill js/analytics-config.js first.');
            return;
        }

        appendScript(src, {
            defer: true,
            'data-website-id': websiteId
        });
    }
})();
