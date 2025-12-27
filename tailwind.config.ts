import type { Config } from "tailwindcss";
import tailwindChildren from "tailwind-children";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#FF6B35",
        xerror1: "#FF8D69",
        xerror2: "#EF4444",
        xcolor1: "#1A1A1A",
        xcolor2: "#FFF5F0",
        xcolor3: "#FFFBF7",
        xcolor4: "#F5F5F5",
        xcolor5: "#E8E8E8",
        xcolor6: "#666666",
        xcolor7: "#999999",
        xcolor8: "#CCCCCC",
        xcolor9: "#F9F9F9",
        xcolor10: "#B8B8B8",
        xcolor11: "#FFB865",
        xcolor12: "#FF6B35",
        xcolor13: "#FFE5D9",
        xcolor14: "#A78BFA",
        xcolor15: "#E53E3E",
        xcolor16: "#FFF4E6",
        xcolor17: "#F59E0B",
        xcolor18: "#FEE2E2",
        xcolor19: "#3B82F6",
        xcolor20: "#E8F2FF",
        xcolor21: "#FFFFFF",
        xcolor22: "#10B981",
      },
      spacing: {
        layoutHeader: "68px",
        layoutSidebar: "81px",
        mediaPreviewHeight: "400px",
      },
      borderRadius: {
        10: "10px",
      },
    },
    fontFamily: {
      YBAKH: ["YBAKH"],
    },
  },
  plugins: [tailwindChildren],
  corePlugins: {
    preflight: false,
  },
};

export default config;
