import { t } from "i18next";

interface SimulationResultProps {
  result: number;
  resetResult: () => void;
}

const SimulationResult: React.FC<SimulationResultProps> = ({
  result,
  resetResult,
}) => {
  return (
    <div>
      <h3 className="text-xl text-primary-500 dark:text-primary-300 font-semibold">
        {t("simulation_results")}
      </h3>
      <div className="mt-4 flex flex-row justify-center">
        <button
          onClick={resetResult}
          className="bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white px-6 py-2 rounded-md transition duration-200"
        >
          {t("reset_simulation")}
        </button>
      </div>
    </div>
  );
};

export default SimulationResult;
