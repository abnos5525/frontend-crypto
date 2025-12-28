"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Language, TranslationKeys } from "@/src/langs";
import { translations, defaultLanguage } from "@/src/langs";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && (savedLang === "fa" || savedLang === "en")) {
      setLanguageState(savedLang);
      document.documentElement.dir = savedLang === "fa" ? "rtl" : "ltr";
      document.documentElement.lang = savedLang;
    } else {
      document.documentElement.dir = defaultLanguage === "fa" ? "rtl" : "ltr";
      document.documentElement.lang = defaultLanguage;
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

