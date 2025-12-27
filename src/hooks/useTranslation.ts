"use client";

import { useLanguage } from "@/src/contexts/LanguageContext";

export function useTranslation() {
  const { t, language, setLanguage } = useLanguage();
  
  return {
    t,
    language,
    setLanguage,
    isRTL: language === "fa",
    isLTR: language === "en",
  };
}

