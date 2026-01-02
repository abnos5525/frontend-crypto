"use client";

import Image from "next/image";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { useTheme } from "@/src/contexts/ThemeContext";
import featuresTradeLight from "@/src/assets/images/home/features-trade.png";
import featuresTradeDark from "@/src/assets/images/home/features-trade-dark.png";
import featuresSimpleLight from "@/src/assets/images/home/features-simple.png";
import featuresSimpleDark from "@/src/assets/images/home/features-simple-dark.png";
import featuresCalcLight from "@/src/assets/images/home/features-calc.png";
import featuresCalcDark from "@/src/assets/images/home/features-calc-dark.png";
import featuresCoinLight from "@/src/assets/images/home/features-coin.png";
import featuresCoinDark from "@/src/assets/images/home/features-coin-dark.png";

export default function Features() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const features = [
    {
      title: t.pages.home.features.spotTrading.title,
      description: t.pages.home.features.spotTrading.description,
      image: isDark ? featuresTradeDark : featuresTradeLight,
    },
    {
      title: t.pages.home.features.marginTrading.title,
      description: t.pages.home.features.marginTrading.description,
      image: isDark ? featuresSimpleDark : featuresSimpleLight,
    },
    {
      title: t.pages.home.features.calculator.title,
      description: t.pages.home.features.calculator.description,
      image: isDark ? featuresCalcDark : featuresCalcLight,
    },
    {
      title: t.pages.home.features.instantTrade.title,
      description: t.pages.home.features.instantTrade.description,
      image: isDark ? featuresCoinDark : featuresCoinLight,
    },
  ];

  return (
    <div className="w-[95%] mx-auto my-16 lg:mt-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative bg-xcolor5/90 dark:bg-xcolor24/95 rounded-xl p-6 lg:p-8 flex flex-col items-center text-center transition-all duration-300 cursor-pointer border border-xcolor6/20 dark:border-xcolor7/20"
          >
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 mb-4 lg:mb-6 transition-transform duration-300 group-hover:scale-110">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 112px, (max-width: 1024px) 128px, 144px"
              />
            </div>
            <h3 className="text-lg lg:text-xl font-bold text-xcolor1 dark:text-xcolor21 mb-2 lg:mb-3">
              {feature.title}
            </h3>
            <p className="text-sm lg:text-base text-xcolor6 dark:text-xcolor7 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

