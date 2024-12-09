export default {
  methods: {
    focusTrap(modalContentRef) {
      const modal = modalContentRef;
      if (!modal) return;

      // Get all focusable elements inside the modal
      const focusableElements = modal.querySelectorAll(
        'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
      );

      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];

      // Ensure focus is set only once when the modal is opened
      if (firstFocusableElement && !modal.hasAttribute('data-focused')) {
        firstFocusableElement.focus();
        modal.setAttribute('data-focused', 'true'); // Mark modal as focused
      }

      // Manage focus on Tab key press
      modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            // If shift + tab is pressed, focus should move backwards
            if (document.activeElement === firstFocusableElement) {
              e.preventDefault();
              lastFocusableElement.focus();
            }
          } else {
            // If tab is pressed normally, focus should move forwards
            if (document.activeElement === lastFocusableElement) {
              e.preventDefault();
              firstFocusableElement.focus();
            }
          }
        }
      });
    },
  },
};
