import { useEffect, useState } from "react";
import Icon from "./Icon";

type Theme = "dark" | "light";

const THEME_COLOR: Record<Theme, string> = { dark: "#07080c", light: "#f7f7fb" };

/** The pre-paint script in index.html sets the initial theme; this only toggles it. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[next]);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage unavailable (private mode) — the choice just won't persist.
    }
    setTheme(next);
  };

  const label = theme === "light" ? "Switch to dark theme" : "Switch to light theme";

  return (
    <button type="button" className="icon-btn" onClick={toggle} aria-label={label} title={label}>
      <Icon name={theme === "light" ? "moon" : "sun"} size={18} />
    </button>
  );
}
