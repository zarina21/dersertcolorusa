"use client";
import { useTheme } from "@/hooks/useTheme"; // Asegúrate de que la ruta sea correcta

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className="button is-rounded" onClick={toggleTheme}>
      {theme === "light" ? "Dark 🌙" : "Light ☀️"}
    </button>
  );
};

export default ThemeToggle;