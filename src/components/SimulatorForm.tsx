import { t } from "i18next";
import InfoTooltip from "./InfoTooltip";
import InputField from "./InputField";
import Section from "./Section";

export interface FormData {
  chargingSpeed: string;
  numChargers: string;
  avgCarConsumption: string;
  multiplier: string;
}

export interface Errors {
  chargingSpeed: string;
  numChargers: string;
  avgCarConsumption: string;
  multiplier: string;
}
interface SimulatorFormProps {
  formData: FormData;
  errors: Errors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const SimulatorForm: React.FC<SimulatorFormProps> = ({
  formData,
  errors,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-xl text-primary-500 dark:text-primary-300 font-semibold">
        {t("simulation_parameters")}
      </h3>
      <Section title={t("charger_details")}>
        <div className="flex flex-row gap-4 my-2">
          <InputField
            id="chargingSpeed"
            label={t("charging_speed")}
            value={formData.chargingSpeed}
            onChange={handleChange}
            info={t("charging_speed_info")}
            error={errors.chargingSpeed}
          />
          <InputField
            id="numChargers"
            label={t("num_chargers")}
            value={formData.numChargers}
            onChange={handleChange}
            info={t("num_chargers_info")}
            error={errors.numChargers}
          />
        </div>
      </Section>

      <Section title={t("car_details")}>
        <div className="flex flex-row gap-4">
          <InputField
            id="avgCarConsumption"
            label={t("avg_car_consumption")}
            value={formData.avgCarConsumption}
            onChange={handleChange}
            info={t("avg_car_consumption_info")}
            error={errors.avgCarConsumption}
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
                value={formData.multiplier}
                onChange={handleChange}
              />
              <span className="cursor-not-allowed text-sm text-neutral-700 dark:text-white ring-1 ring-neutral-300 p-2 rounded-md">
                {formData.multiplier}%
              </span>
            </div>
            {errors.multiplier && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.multiplier}
              </p>
            )}
          </div>
        </div>
      </Section>

      <div className="mt-4 flex flex-row justify-center">
        <button
          type="submit"
          className="bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white px-6 py-2 rounded-md transition duration-200"
        >
          {t("run_simulation")}
        </button>
      </div>
    </form>
  );
};

export default SimulatorForm;
