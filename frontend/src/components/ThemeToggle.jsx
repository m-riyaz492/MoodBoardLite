import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("mood_theme") || "light";
    setTheme(saved);
    document.body.classList.add(saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.body.classList.remove(theme);
    document.body.classList.add(newTheme);
    setTheme(newTheme);
    localStorage.setItem("mood_theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        padding: "8px 12px",
        background: "var(--card)",
        color: "var(--text)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        cursor: "pointer",
        zIndex: 100,
      }}
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}