// js/plugins/a11y_contrast.js
document.addEventListener('DOMContentLoaded', () => {
    const toggleButtonId = 'a11y-contrast-toggle';
    const contrastClass = 'high-contrast-mode';
    const storageKey = 'a11y-contrast-preference';

    // Check saved preference
    if (localStorage.getItem(storageKey) === 'enabled') {
        document.body.classList.add(contrastClass);
    }

    // Function to toggle contrast
    window.toggleHighContrast = function() {
        if (document.body.classList.contains(contrastClass)) {
            document.body.classList.remove(contrastClass);
            localStorage.setItem(storageKey, 'disabled');
        } else {
            document.body.classList.add(contrastClass);
            localStorage.setItem(storageKey, 'enabled');
        }
    };

    // Attempt to bind to a toggle button if it exists
    const toggleBtn = document.getElementById(toggleButtonId);
    if (toggleBtn) {
        toggleBtn.addEventListener('click', window.toggleHighContrast);
    }
});
