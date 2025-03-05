(function () {
  'use strict';

  // Function to apply the blur style
  function applyBlur() {
    const targetDivs = document.querySelectorAll('div._aigw');
    if (targetDivs.length > 0) {
      targetDivs.forEach((div) => {
        // Add blur style
        div.style.filter = 'blur(5px)';
        div.style.transition = 'filter 0.3s ease';

        // Add event listeners for hover
        div.addEventListener('mouseenter', () => {
          div.style.filter = 'none'; // Remove blur on hover
        });

        div.addEventListener('mouseleave', () => {
          div.style.filter = 'blur(5px)'; // Reapply blur when not hovering
        });
      });
      console.log(`Blur style applied to ${targetDivs.length} div(s).`);
    }
  }

  // Debounce function to limit the rate of execution
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Debounced version of applyBlur
  const debouncedApplyBlur = debounce(applyBlur, 100);

  // Apply the blur style immediately (if the div already exists)
  applyBlur();

  // Set up a MutationObserver to detect when the div is added dynamically
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        debouncedApplyBlur();
      }
    });
  });

  // Start observing the document body for changes
  observer.observe(document.body, { childList: true, subtree: true });

  // Disconnect the observer when the script is no longer needed
  window.addEventListener('unload', () => {
    observer.disconnect();
  });
})();
