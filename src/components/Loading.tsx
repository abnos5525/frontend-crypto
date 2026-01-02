"use client";

import { Spin } from "antd";
import { useLanguage } from "@/src/contexts/LanguageContext";

export default function Loading() {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-xcolor21 dark:bg-xcolor1 transition-colors duration-300">
      <div className="flex flex-col items-center gap-4">
        <Spin size="large" className="text-primaryColor" />
        <p className="text-xcolor1 dark:text-xcolor21 text-sm sm:text-base font-medium">
          {t?.common?.loading || "Loading"}
        </p>
      </div>
    </div>
  );
}

