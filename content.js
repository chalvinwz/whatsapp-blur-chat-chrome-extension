(function () {
  'use strict';

  // Function to apply blur to all list items
  function applyBlur() {
    const targetElements = document.querySelectorAll('[role="listitem"]');

    if (targetElements.length > 0) {
      targetElements.forEach((element) => {
        // Apply blur initially
        element.style.filter = 'blur(5px)';
        element.style.transition = 'filter 0.3s ease';

        // Add event listeners to unblur on hover and re-blur when not hovered
        element.addEventListener('mouseover', function () {
          this.style.filter = 'none'; // Unblur on hover
        });

        element.addEventListener('mouseout', function () {
          this.style.filter = 'blur(5px)'; // Reapply blur when not hovering
        });
      });
    }
  }

  // Debounce function to limit execution rate
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Debounced version of event handler
  const debouncedApplyBlur = debounce(applyBlur, 100);

  // Apply blur on page load
  applyBlur();

  // Observe dynamically added elements
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        debouncedApplyBlur();
      }
    });
  });

  // Start observing the document body for changes
  observer.observe(document.body, { childList: true, subtree: true });

  // Disconnect observer when the page unloads
  window.addEventListener('unload', () => {
    observer.disconnect();
  });

})();
