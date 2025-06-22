/*!
 * Minimal theme switcher
 *
 * Pico.css - https://picocss.com
 * Copyright 2020 - Licensed under MIT
 */

const themeSwitcher = {
  // Config
  buttonsTarget: "a[data-theme-switcher]",
  buttonAttribute: "data-theme-switcher", rootAttribute: "data-theme",

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
    let theme = "dark";

    if (localStorage) {
      if (localStorage.hasOwnProperty(this.rootAttribute)) {
        theme = localStorage.getItem(this.rootAttribute);
      }
      else {
        localStorage.setItem(this.rootAttribute, "dark");
      }
    }

    this.setTheme(theme);

    document.querySelectorAll(this.buttonsTarget).forEach(
      function (button) {
        if (theme === "light") {
          button.setAttribute(this.buttonAttribute, "light");
          button.className = "theme-toggle";
        } else {
          button.setAttribute(this.buttonAttribute, "dark");
          button.className = "theme-toggle theme-toggle--toggled";
        }

        button.addEventListener(
          "click",
          function (event) {
            event.preventDefault();
            const theme = button.getAttribute(this.buttonAttribute);
            const otherTheme = (theme === "dark") ? "light" : "dark";

            if (theme === "dark") {
              this.setTheme("light");
              button.setAttribute(this.buttonAttribute, "light");
              button.className = "theme-toggle";
            } else {
              this.setTheme("dark");
              button.setAttribute(this.buttonAttribute, "dark");
              button.className = "theme-toggle theme-toggle--toggled";
            }

            if (localStorage)
              localStorage.setItem(this.rootAttribute, otherTheme);
          }.bind(this),
          false
        );
      }.bind(this)
    );
  },
};

// Init
document.addEventListener("DOMContentLoaded", () => {
  themeSwitcher.init();
});
