function initDocument() {
  /*
   * Callout fold/unfold
   */
  document.querySelectorAll('.callout.is-collapsible > .callout-title')
    .forEach(titleEl => {
      // Add a listener on the title element
      titleEl.addEventListener('click', () => {
        const calloutEl = titleEl.parentElement;
        // Toggle the collapsed class
        calloutEl.classList.toggle('is-collapsed');
        titleEl.querySelector('.callout-fold').classList.toggle('is-collapsed');
        // Show/hide the content
        calloutEl.querySelector('.callout-content').style.display = calloutEl.classList.contains('is-collapsed') ? 'none' : '';
      });
    });

  /*
   * List fold/unfold
   */
  document.querySelectorAll('.list-collapse-indicator')
    .forEach(collapseEl => {
      collapseEl.addEventListener('click', () => {
        // Toggle the collapsed class
        collapseEl.classList.toggle('is-collapsed');
        collapseEl.parentElement.classList.toggle('is-collapsed');
      });
    });

  /*
   * Light/Dark theme toggle
   */
  const toggleDarkMode = () => {
    document.body.classList.toggle('theme-dark');
    document.body.classList.toggle('theme-light');
  };
  const activateMode = (dark) => {
    if (dark) {
      document.body.classList.add('theme-dark');
      document.body.classList.remove('theme-light');
    } else {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
    }
  };

  const themeToggleEl = document.querySelector('#theme-mode-toggle');
  themeToggleEl.onclick = () => {
    toggleDarkMode();
  };
  // go to dark mode automatically if needed on start
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    activateMode(true);
  }
  // switch to dark/light mode on browser event
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    const dark = event.matches;
    activateMode(dark);
  });

  /*
   * Copy code button
   */
  document.querySelectorAll('button.copy-code-button')
    .forEach(buttonEl => {
      buttonEl.addEventListener('click', () => {
        const codeEl = buttonEl.parentElement.querySelector('code');
        navigator.clipboard.writeText(codeEl.innerText.trim()).then();
      });
    });

  /*
   * Responsive mobile classes
   */
  function toggleMobileClasses() {
    const mobileClasses = ['is-mobile', 'is-phone'];
    if (window.innerWidth <= 768) {
      // Is mobile
      document.body.classList.add(...mobileClasses);
    } else {
      document.body.classList.remove(...mobileClasses);
    }
  }

  toggleMobileClasses();
  window.addEventListener('resize', toggleMobileClasses);

  /*
   * Lucide icons
   */
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = '/lucide.min.js';
  script.onload = () => {
    lucide.createIcons({
      attrs: {
        class: ['callout-icon']
      },
      nameAttr: 'data-share-note-lucide'
    });
  };
  document.head.appendChild(script);
  /*
   * title editable
   */
  document.querySelectorAll("[contenteditable=true]").forEach(x => x.setAttribute("contenteditable", "false"));
}
