const SESSION_KEY = 'math_flashcard_session';
const VALID_USER = { username: 'zyz', password: '123' };

function getSession() {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
}

function setSession(username) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ username, loginTime: Date.now() }));
}

function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.background = isError ? '#ef4444' : '#1e293b';
    toast.style.opacity = '1';
    setTimeout(() => {
        toast.style.opacity = '0';
    }, 2500);
}

function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    const icon = btn.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

function handleLogin() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    if (!username || !password) {
        showToast('请输入用户名和密码', true);
        return;
    }

    if (username !== VALID_USER.username || password !== VALID_USER.password) {
        showToast('用户名或密码错误', true);
        return;
    }

    setSession(username);
    showToast('登录成功！');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 800);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleLogin();
});

(function checkAutoLogin() {
    const session = getSession();
    if (session) {
        window.location.href = 'index.html';
    }
})();
