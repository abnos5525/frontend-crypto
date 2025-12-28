"use client";

import { Button, Input } from "antd";
import Image from "next/image";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { useTheme } from "@/src/contexts/ThemeContext";
import heroDarkImage from "@/src/assets/images/hero-dark.png";
import heroLightImage from "@/src/assets/images/hero.png";

export default function HomePage() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
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

          <div className="order-2 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-lg lg:scale-110">
              <Image
                src={theme === "dark" ? heroDarkImage : heroLightImage}
                alt={t.pages.home.heroTitle}
                priority
                className="w-full h-auto"
                placeholder="blur"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
