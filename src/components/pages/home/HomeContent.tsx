"use client";

import { Button, Input } from "antd";
import { useLanguage } from "@/src/contexts/LanguageContext";

export default function HomeContent() {
  const { t } = useLanguage();

  return (
    <div className="order-1 lg:order-1 flex flex-col items-center lg:ltr:items-start lg:rtl:items-end mb-10 lg:mb-0">
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white text-center lg:ltr:text-left lg:rtl:text-right max-w-xl w-full">
        {t.pages.home.heroTitle}
      </h1>

      <p className="text-lg mt-0 lg:text-2xl text-gray-700 dark:text-gray-300 text-center lg:ltr:text-left lg:rtl:text-right max-w-xl w-full">
        {t.pages.home.heroSubtitle}
      </p>

      <div className="w-full max-w-xl flex justify-center lg:justify-start">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 w-[80%]">
          <Input
            size="large"
            placeholder={t.pages.home.feature1}
            className="!h-14 bg-white dark:bg-xcolor24 !rounded-lg sm:ltr:!rounded-l-lg sm:ltr:!rounded-r-none sm:rtl:!rounded-r-lg sm:rtl:!rounded-l-none !text-base flex-1"
          />
          <Button
            type="primary"
            size="large"
            className="!h-14 !px-8 !text-base ltr:!rounded-r-lg ltr:!rounded-l-none rtl:!rounded-l-lg rtl:!rounded-r-none whitespace-nowrap !bg-[#f77440] hover:!bg-[#fc8357]"
            style={{
              boxShadow:
                "0 0 15px rgba(255, 133, 84, 0.7), 0 0 35px rgba(255, 133, 84, 0.4)",
            }}
          >
            {t.pages.home.startButton}
          </Button>
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 text-center lg:ltr:text-left lg:rtl:text-right max-w-xl w-full">
        {t.pages.home.feature2}
      </p>
    </div>
  );
}

