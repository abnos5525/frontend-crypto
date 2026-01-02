"use client";

import Image from "next/image";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { useTheme } from "@/src/contexts/ThemeContext";
import heroDarkImage from "@/src/assets/images/home/hero-dark.png";
import heroLightImage from "@/src/assets/images/home/hero.png";

export default function HomeImage() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
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
  );
}

