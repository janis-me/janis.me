import Moon from "lucide-solid/icons/moon";
import Sun from "lucide-solid/icons/sun";
import Paintbrush from "lucide-solid/icons/paintbrush";
import PaintbrushVertical from "lucide-solid/icons/paintbrush-vertical";

import {
  getPreferredColorMode,
  getPreferredTheme,
  getReverseTheme,
  setColorMode,
  setTheme,
} from "$utils/theme.utils";
import { createSignal } from "solid-js";

import "./Nav.scss";

export default function Nav() {
  const [currentTheme, setCurrentTheme] = createSignal<"dark" | "light">(
    getPreferredTheme()
  );
  const [currentColorMode, setCurrentColorMode] = createSignal<boolean>(
    getPreferredColorMode()
  );

  const handleThemeToggle = () => {
    const newTheme = getReverseTheme(currentTheme());
    setTheme(newTheme, true);
    setCurrentTheme(newTheme);
  };

  const handleColorModeToggle = () => {
    const newColorMode = !currentColorMode();
    setColorMode(newColorMode, true);
    setCurrentColorMode(newColorMode);
  };

  const isCurrentlyLightMode = () => currentTheme() === "light";

  return (
    <nav class="nav">
      <h1 class="nav__title">
        <a href="/">janis.me</a>
      </h1>

      <div>
        <button
          class="nav__toggle-theme-button"
          onClick={handleThemeToggle}
          name={isCurrentlyLightMode() ? "dark mode" : "light mode"}
          title={isCurrentlyLightMode() ? "dark mode" : "light mode"}
        >
          {isCurrentlyLightMode() ? <Moon /> : <Sun />}
        </button>
        <button
          class="nav__toggle-theme-button"
          onClick={handleColorModeToggle}
          name={currentColorMode() ? "less colors" : "more colors!"}
          title={currentColorMode() ? "less colors" : "more colors"}
        >
          {currentColorMode() ? <Paintbrush /> : <PaintbrushVertical />}
        </button>
      </div>
    </nav>
  );
}
