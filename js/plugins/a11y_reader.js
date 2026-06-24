/**
 * a11y_reader.js
 * Plugin for screen reader announcements.
 */

class A11yReader {
    constructor() {
        this.announcerElement = null;
        this.init();
    }

    init() {
        // Create an aria-live region for announcements
        this.announcerElement = document.createElement('div');
        this.announcerElement.setAttribute('aria-live', 'polite');
        this.announcerElement.setAttribute('aria-atomic', 'true');
        // Visually hide the element but keep it accessible to screen readers
        this.announcerElement.style.position = 'absolute';
        this.announcerElement.style.width = '1px';
        this.announcerElement.style.height = '1px';
        this.announcerElement.style.padding = '0';
        this.announcerElement.style.margin = '-1px';
        this.announcerElement.style.overflow = 'hidden';
        this.announcerElement.style.clip = 'rect(0, 0, 0, 0)';
        this.announcerElement.style.whiteSpace = 'nowrap';
        this.announcerElement.style.border = '0';
        
        // Append to body when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                document.body.appendChild(this.announcerElement);
            });
        } else {
            document.body.appendChild(this.announcerElement);
        }
    }

    /**
     * Announce text to screen readers.
     * @param {string} text - The text to announce.
     * @param {string} priority - 'polite' (default) or 'assertive'
     */
    announce(text, priority = 'polite') {
        if (!this.announcerElement) return;
        
        this.announcerElement.setAttribute('aria-live', priority);
        // Clear the content first to ensure repeated text is announced
        this.announcerElement.textContent = '';
        
        // Small delay to ensure the screen reader picks up the change
        setTimeout(() => {
            this.announcerElement.textContent = text;
        }, 50);
    }
}

// Make it available globally
window.a11yReader = new A11yReader();
