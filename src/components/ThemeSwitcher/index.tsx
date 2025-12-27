"use client";

import { useTheme } from "@/src/contexts/ThemeContext";
import { Switch } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Switch
      checked={isDark}
      onChange={toggleTheme}
      checkedChildren={<SunOutlined />}
      unCheckedChildren={<MoonOutlined />}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      size="default"
    />
  );
}
