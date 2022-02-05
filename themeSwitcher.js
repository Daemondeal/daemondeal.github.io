/*!
 * Minimal theme switcher
 *
 * Pico.css - https://picocss.com
 * Copyright 2020 - Licensed under MIT
 */

const themeSwitcher = {
  // Config
  buttonsTarget: "a[data-theme-switcher]",
  buttonAttribute: "data-theme-switcher",
  rootAttribute: "data-theme",

  setTheme(theme) {
    document
      .querySelector("html")
      .setAttribute(
        this.rootAttribute,
        theme
      );
  },

  // Init
  init() {
    if (localStorage) {
      if (localStorage.hasOwnProperty(this.rootAttribute))
        this.setTheme(localStorage.getItem(this.rootAttribute));
      else
        localStorage.setItem(this.rootAttribute, "auto");
    }

    document.querySelectorAll(this.buttonsTarget).forEach(
      function (button) {
        button.addEventListener(
          "click",
          function (event) {
            event.preventDefault();
            const theme = event.target.getAttribute(this.buttonAttribute);
            this.setTheme(theme);
            if (localStorage)
              localStorage.setItem(this.rootAttribute, theme);
          }.bind(this),
          false
        );
      }.bind(this)
    );
  },
};

// Init
themeSwitcher.init();
