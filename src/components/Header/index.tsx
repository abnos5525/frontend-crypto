"use client";

import { Header as AntdHeader } from "antd/es/layout/layout";
import { Button } from "antd";
import LanguageSwitcher from "../LanguageSwitcher";
import ThemeSwitcher from "../ThemeSwitcher";
import { useLanguage } from "@/src/contexts/LanguageContext";

export default function Header() {
  const { t } = useLanguage();

  return (
    <AntdHeader className="!bg-white dark:!bg-xcolor1 border-b border-gray-200 dark:border-gray-700 !px-6 h-16 shadow-header">
      <div className="flex items-center justify-between align-middle h-full">
        <div className="flex items-center gap-3 h-full"></div>
        <div className="flex items-center h-full">
          <div className="flex flex-row items-center justify-center gap-5">
            <ThemeSwitcher />
            <LanguageSwitcher />
            <Button
              type="primary"
              size="middle"
              className="!h-9 !rounded-lg !px-4 !flex !items-center !justify-center !gap-2 !leading-none !text-sm"
            >
              <span className="leading-none">{t.common.register}</span>
              <span className="text-white/50 leading-none">|</span>
              <span className="leading-none">{t.common.login}</span>
            </Button>
          </div>
          <div className="w-[1px] h-[50%] bg-gray-200 dark:bg-xcolor10 mx-5"></div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 m-0 border border-r-2 border-gray-800 dark:border-gray-100 px-5 h-full flex items-center justify-center">
            آرنیتکس
          </h2>
        </div>
      </div>
    </AntdHeader>
  );
}
