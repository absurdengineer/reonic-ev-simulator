import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import de from "./de.json";
import en from "./en.json";

const LANGUAGE_KEY = "@app_language";

const getStoredLanguage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(LANGUAGE_KEY) || "en";
  }
  return "en";
};

const resources = {
  en: {
    translation: en,
  },
  de: {
    translation: de,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: getStoredLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem(LANGUAGE_KEY, lng);
});

export default i18n;
