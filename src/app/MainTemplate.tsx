"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, App as AntdApp, notification } from "antd";
import fa_IR from "antd/locale/fa_IR";
import en_US from "antd/locale/en_US";
import { getLightTheme, getDarkTheme } from "@/antd.theme";
import { useState, useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/src/contexts/LanguageContext";
import { ThemeProvider, useTheme } from "@/src/contexts/ThemeContext";

function TemplateContent({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();
  const { theme: currentTheme } = useTheme();

  useEffect(() => {
    notification.config({
      placement: "topRight",
      bottom: 50,
      duration: 3,
      rtl: language === "fa",
    });
  }, [language]);

  const antdLocale = language === "fa" ? fa_IR : en_US;
  const direction = language === "fa" ? "rtl" : "ltr";
  const antdTheme = currentTheme === "dark" ? getDarkTheme() : getLightTheme();

  return (
    <ConfigProvider 
      theme={antdTheme} 
      locale={antdLocale} 
      direction={direction}
      warning={{ strict: false }}
    >
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  );
}

export default function MainTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 1000 * 60 * 60 * 24,
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TemplateContent>{children}</TemplateContent>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
