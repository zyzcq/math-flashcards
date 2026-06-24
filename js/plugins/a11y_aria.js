/**
 * a11y_aria.js
 * Dynamically injects ARIA attributes for accessibility
 */

(function() {
    'use strict';

    function injectAriaAttributes() {
        // Example: Add aria-label to buttons without text content
        const buttons = document.querySelectorAll('button:empty');
        buttons.forEach(button => {
            if (!button.hasAttribute('aria-label') && button.title) {
                button.setAttribute('aria-label', button.title);
            }
        });

        // Example: Add aria-hidden to decorative images
        const images = document.querySelectorAll('img[role="presentation"], img[alt=""]');
        images.forEach(img => {
            if (!img.hasAttribute('aria-hidden')) {
                img.setAttribute('aria-hidden', 'true');
            }
        });

        // Example: Ensure main landmarks
        const main = document.querySelector('main');
        if (main && !main.hasAttribute('role')) {
            main.setAttribute('role', 'main');
        }
    }

    document.addEventListener('DOMContentLoaded', injectAriaAttributes);
})();
