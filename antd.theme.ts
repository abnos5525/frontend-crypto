import { type ThemeConfig, theme } from 'antd';
import tailwindConfig from './tailwind.config.ts';

interface CustomThemeType {
  primaryColor: string;
  xerror1: string;
  xerror2: string;
  xcolor1: string;
  xcolor2: string;
  xcolor3: string;
  xcolor4: string;
  xcolor5: string;
  xcolor6: string;
  xcolor7: string;
  xcolor8: string;
  xcolor9: string;
  xcolor10: string;
  xcolor11: string;
  xcolor12: string;
  xcolor13: string;
  xcolor14: string;
  xcolor15: string;
  xcolor16: string;
  xcolor17: string;
  xcolor18: string;
  xcolor19: string;
  xcolor20: string;
  xcolor21: string;
  xcolor22: string;
}

const tailwindTheme = (tailwindConfig?.theme?.extend?.colors || {}) as unknown as CustomThemeType;

export const getLightTheme = (): ThemeConfig => ({
  algorithm: theme.defaultAlgorithm,
  token: {
    colorText: tailwindTheme.xcolor1,
    colorTextPlaceholder: tailwindTheme.xcolor7,
    colorTextTertiary: tailwindTheme.xcolor7,
    colorTextLabel: tailwindTheme.xcolor6,
    colorTextDescription: tailwindTheme.xcolor6,
    colorIcon: tailwindTheme.xcolor6,
    colorTextSecondary: tailwindTheme.xcolor6,
    colorTextHeading: tailwindTheme.xcolor1,
    colorTextDisabled: tailwindTheme.xcolor10,
    borderRadius: 8,
    fontFamily: `YBAKH, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
    colorPrimary: tailwindTheme.primaryColor,
    colorPrimaryHover: "#FF8554",
    colorPrimaryActive: "#E55A25",
    colorBgBase: tailwindTheme.xcolor21,
    colorBgContainer: tailwindTheme.xcolor21,
    colorBgElevated: tailwindTheme.xcolor21,
    colorBgLayout: tailwindTheme.xcolor9,
    colorBgSpotlight: tailwindTheme.xcolor3,
    colorBorder: tailwindTheme.xcolor5,
    colorBorderSecondary: tailwindTheme.xcolor8,
    colorFill: tailwindTheme.xcolor9,
    colorFillSecondary: tailwindTheme.xcolor4,
    colorFillTertiary: tailwindTheme.xcolor3,
    colorSuccess: tailwindTheme.xcolor22,
    colorWarning: tailwindTheme.xcolor17,
    colorError: tailwindTheme.xerror2,
    colorInfo: tailwindTheme.xcolor19,
  }
});

export const getDarkTheme = (): ThemeConfig => ({
  algorithm: theme.darkAlgorithm,
  token: {
    colorText: "#F9FAFB",
    colorTextPlaceholder: "#9CA3AF",
    colorTextTertiary: "#9CA3AF",
    colorTextLabel: "#9CA3AF",
    colorTextDescription: "#9CA3AF",
    colorIcon: tailwindTheme.primaryColor,
    colorTextSecondary: tailwindTheme.primaryColor,
    colorTextHeading: "#F9FAFB",
    colorTextDisabled: "#6B7280",
    borderRadius: 6,
    fontFamily: `YBAKH, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
    colorPrimary: tailwindTheme.primaryColor,
    colorPrimaryHover: tailwindTheme.primaryColor,
    colorBorderSecondary: "#374151",
    colorBorder: "#4B5563",
    colorBgContainer: "#1F2937",
    colorBgElevated: "#1F2937",
  }
});

const customTheme: ThemeConfig = getLightTheme();

export default customTheme;
