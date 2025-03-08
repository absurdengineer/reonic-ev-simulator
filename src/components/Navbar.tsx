import { t } from "i18next";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { AiFillSun } from "react-icons/ai";
import { FaMoon } from "react-icons/fa6";
import { useTheme } from "../hooks/useTheme";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "de", name: "Deutsch" },
];

const Navbar = () => {
  const { i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const changeLanguage = useCallback(
    (lang: string) => {
      i18n.changeLanguage(lang).catch(console.error);
    },
    [i18n]
  );

  return (
    <nav className="w-full bg-gradient-to-r from-white to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 p-4 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary-600 dark:text-primary-300 transition-colors duration-300">
          {t("app_name")}
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-primary-500 dark:bg-primary-600 text-white hover:opacity-90 transition ease-in-out duration-200"
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? (
              <AiFillSun size={24} className="transition-colors duration-300" />
            ) : (
              <FaMoon size={24} className="transition-colors duration-300" />
            )}
          </button>
          <select
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="p-2 rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200"
            aria-label="Select language"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
