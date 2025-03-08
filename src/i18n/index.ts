import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import de from "./de.json";
import en from "./en.json";

const LANGUAGE_KEY = "app_language";

// Get browser language
const getBrowserLanguage = () => {
  if (typeof window !== "undefined") {
    return window.navigator.language.split("-")[0];
  }
  return "en";
};

// Get stored or browser language
const getInitialLanguage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(LANGUAGE_KEY) || getBrowserLanguage();
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
  lng: getInitialLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  localStorage.setItem(LANGUAGE_KEY, lng);
});

export default i18n;
