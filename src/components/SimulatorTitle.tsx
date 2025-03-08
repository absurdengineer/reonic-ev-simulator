import { t } from "i18next";

const SimulatorTitle = () => {
  return (
    <div className="border-b border-neutral-300 dark:border-neutral-700 pb-4 mb-4">
      <h1 className="text-2xl font-bold mb-4 text-primary-500 dark:text-primary-300">
        {t("ev_simulator_title")}
      </h1>
      <p className="text-neutral-800 dark:text-neutral-200">
        {t("ev_simulator_description")}
      </p>
    </div>
  );
};

export default SimulatorTitle;
