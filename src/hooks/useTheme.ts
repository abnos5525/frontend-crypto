"use client";

import { useTheme as useThemeContext } from "@/src/contexts/ThemeContext";

export function useTheme() {
  const { theme, setTheme, toggleTheme } = useThemeContext();
  
  return {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === "dark",
    isLight: theme === "light",
  };
}

