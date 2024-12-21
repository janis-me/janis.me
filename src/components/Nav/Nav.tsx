import Moon from "lucide-solid/icons/moon";
import Sun from "lucide-solid/icons/sun";

import {
  getPreferredTheme,
  getReverseTheme,
  setTheme,
} from "$utils/theme.utils";
import { createSignal } from "solid-js";

import "./Nav.scss";

export default function Nav() {
  const [currentTheme, setCurrentTheme] = createSignal<"dark" | "light">(
    getPreferredTheme()
  );

  const handleThemeToggle = () => {
    const newTheme = getReverseTheme(currentTheme());
    setTheme(newTheme, true);
    setCurrentTheme(newTheme);
  };

  return (
    <nav class="nav">
      <h1 class="nav__title">
        <a href="/">janis.me</a>
      </h1>

      <button class="nav__toggle-theme-button" onClick={handleThemeToggle}>
        {currentTheme() === "light" ? <Moon /> : <Sun />}
      </button>
    </nav>
  );
}
