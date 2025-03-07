import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "./hooks/useTheme";

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { toggleTheme } = useTheme();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4">
      <div className="space-x-2 mb-4">
        <button
          onClick={toggleTheme}
          className="p-2 bg-blue-500 text-white rounded"
        >
          {t("toggleTheme")}
        </button>
        <button
          onClick={() => changeLanguage("en")}
          className="p-2 bg-green-500 text-white rounded"
        >
          English
        </button>
        <button
          onClick={() => changeLanguage("de")}
          className="p-2 bg-red-500 text-white rounded"
        >
          Deutsch
        </button>
      </div>
      <h1 className="text-3xl font-bold">{t("title")}</h1>
    </div>
  );
};

export default App;
