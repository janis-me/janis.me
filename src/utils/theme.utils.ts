import type { ThemeOption } from "$types/theme.types";

export function getPreferredTheme() {
  let theme: ThemeOption = "light";

  if (window.localStorage.getItem("theme")) {
    if (window.localStorage.getItem("theme") == "dark") {
      theme = "dark";
    }
  } else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    theme = "dark";
  }

  return theme;
}

export function setTheme(theme: ThemeOption, toLocalStorage: boolean = false) {
  document.documentElement.setAttribute("data-theme", theme);
  if (toLocalStorage) window.localStorage.setItem("theme", theme);
}

export function getReverseTheme(theme: ThemeOption) {
  return theme === "light" ? "dark" : "light";
}
