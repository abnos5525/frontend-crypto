import { fa } from "./fa";
import { en } from "./en";
import type { Language } from "./types";

export type { Language, TranslationKeys } from "./types";

export const translations = {
  fa,
  en,
} as const;

export const defaultLanguage: Language = "fa";

export function getTranslation(lang: Language = defaultLanguage) {
  return translations[lang] || translations[defaultLanguage];
}

export { fa, en };

