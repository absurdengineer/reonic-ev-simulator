import { t } from "i18next";
import { FaChargingStation } from "react-icons/fa6";
import InfoTooltip from "./InfoTooltip";
import InputField from "./InputField";
import Section from "./Section";

export interface Car {
  avgCarConsumption: string;
  multiplier: string;
}

export interface Charger {
  chargingSpeed: string;
  numChargers: string;
}

interface SimulatorFormProps {
  carDetails: Car;
  carErrors: Car;
  chargers: Charger[];
  chargerErrors: Charger[];
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  addNewCharger: () => void;
  removeCharger: (index: number) => void;
}

const SimulatorForm: React.FC<SimulatorFormProps> = ({
  carDetails,
  carErrors,
  chargers,
  chargerErrors,
  handleChange,
  handleSubmit,
  addNewCharger,
  removeCharger,
}) => {
  return (
    <form onSubmit={handleSubmit} className="px-4 sm:px-6">
      <h3 className="text-lg sm:text-xl text-primary-500 dark:text-primary-300 font-semibold mb-4">
        {t("simulation_parameters")}
      </h3>
      <Section title={t("charger_details")}>
        {chargers.map((charger, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row gap-4 my-2 justify-end"
          >
            <InputField
              id={"chargingSpeed:" + index}
              label={t("charging_speed")}
              value={charger.chargingSpeed}
              onChange={(e) => handleChange(e, index)}
              info={t("charging_speed_info")}
              error={chargerErrors[index].chargingSpeed}
            />
            <InputField
              id={"numChargers:" + index}
              label={t("num_chargers")}
              value={charger.numChargers}
              onChange={(e) => handleChange(e, index)}
              info={t("num_chargers_info")}
              error={chargerErrors[index].numChargers}
            />
            <button
              type="button"
              disabled={chargers.length < 2}
              className="disabled:cursor-not-allowed disabled:bg-red-300 px-3 py-2  bg-red-500 text-white border-neutral-300 rounded-md self-baseline md:mt-7"
              onClick={() => removeCharger(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="px-3 py-2 bg-gray-200 text-primary-700 dark:text-white dark:bg-gray-700 border-neutral-300 rounded-md flex flex-row items-center gap-2"
          onClick={addNewCharger}
        >
          <FaChargingStation /> Add New Charger
        </button>
      </Section>

      <Section title={t("car_details")}>
        <div className="flex flex-col sm:flex-row gap-4">
          <InputField
            id="avgCarConsumption"
            label={t("avg_car_consumption")}
            value={carDetails.avgCarConsumption}
            onChange={handleChange}
            info={t("avg_car_consumption_info")}
            error={carErrors.avgCarConsumption}
          />
          <div className="flex-1 flex flex-col">
            <label
              htmlFor="multiplier"
              className="mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center"
            >
              {t("multiplier")}
              <InfoTooltip text={t("multiplier_info")} />
            </label>
            <div className="flex w-full items-center gap-2">
              <input
                type="range"
                id="multiplier"
                name="multiplier"
                min="20"
                max="200"
                className="w-full p-2 border rounded-md accent-primary-500 focus:outline-none focus:ring-2 transition-colors duration-200"
                value={carDetails.multiplier}
                onChange={handleChange}
              />
              <span className="min-w-[60px] text-center cursor-not-allowed text-sm text-neutral-700 dark:text-white ring-1 ring-neutral-300 p-2 rounded-md">
                {carDetails.multiplier}%
              </span>
            </div>
            {carErrors.multiplier && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {carErrors.multiplier}
              </p>
            )}
          </div>
        </div>
      </Section>

      <div className="mt-6 sm:mt-8 flex flex-row justify-center">
        <button
          type="submit"
          className="w-full sm:w-auto bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white px-6 py-2 rounded-md transition duration-200"
        >
          {t("run_simulation")}
        </button>
      </div>
    </form>
  );
};

export default SimulatorForm;
