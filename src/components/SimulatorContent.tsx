import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  generateChargingEfficiency,
  generateHourlyPowerConsumption,
  generatePerformanceMetrics,
  generateTimeLabels,
  generateUsagePattern,
} from "../utils/simulationUtils";
import LoadingAnimation from "./LoadingAnimation";
import SimulationResult, { SimulationResultData } from "./SimulationResult";
import SimulatorForm, { Car, Charger } from "./SimulatorForm";

const SimulatorContent = () => {
  const { t } = useTranslation();
  const [carDetails, setCarDetails] = useState<Car>({
    avgCarConsumption: "18",
    multiplier: "120",
  });
  const [chargers, setChargers] = useState<Charger[]>([
    {
      chargingSpeed: "11",
      numChargers: "20",
    },
  ]);
  const [chargerErrors, setChargerErrors] = useState<Charger[]>([
    {
      chargingSpeed: "",
      numChargers: "",
    },
  ]);
  const [carErrors, setCarErrors] = useState<Car>({
    avgCarConsumption: "",
    multiplier: "",
  });

  const [result, setResult] = useState<SimulationResultData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);

  useEffect(() => {
    const hasErrors =
      Object.values(carErrors).some((error) => error !== "") ||
      chargerErrors.some(
        (error) => error.chargingSpeed !== "" || error.numChargers !== ""
      );
    setIsFormValid(!hasErrors);
  }, [carErrors, chargerErrors]);

  const validateField = (
    name: string,
    value: number
  ): { isValid: boolean; error: string } => {
    switch (name) {
      case "chargingSpeed":
        return {
          isValid: value >= 5,
          error: value >= 5 ? "" : "charging_speed_error",
        };
      case "numChargers":
        return {
          isValid: value >= 2 && Number.isInteger(value),
          error:
            value >= 2 && Number.isInteger(value) ? "" : "num_chargers_error",
        };
      case "avgCarConsumption":
        return {
          isValid: value >= 7,
          error: value >= 7 ? "" : "avg_car_consumption_error",
        };
      default:
        return { isValid: true, error: "" };
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const timeLabels = generateTimeLabels();

      // Calculate total values from all chargers
      const totalChargingPower = chargers.reduce(
        (sum, charger) =>
          sum +
          (parseFloat(charger.chargingSpeed) || 0) *
            parseInt(charger.numChargers),
        0
      );

      const totalNumChargers = chargers.reduce(
        (sum, charger) => sum + parseInt(charger.numChargers),
        0
      );

      const avgCarConsumption = parseFloat(carDetails.avgCarConsumption);

      // Generate data using the first charger for base patterns
      const powerConsumptionData = generateHourlyPowerConsumption(
        parseFloat(chargers[0].chargingSpeed),
        totalNumChargers,
        avgCarConsumption
      );
      const usagePatternData = generateUsagePattern(totalNumChargers);
      const efficiencyData = generateChargingEfficiency();
      const performanceMetrics = generatePerformanceMetrics();

      const simulationResult: SimulationResultData = {
        overviewData: {
          totalEnergyConsumption:
            totalChargingPower * 24 * (0.5 + Math.random() * 0.4),
          peakLoad: totalChargingPower * (0.8 + Math.random() * 0.3),
        },
        powerConsumptionData: {
          labels: timeLabels,
          datasets: [
            {
              label: t("power_consumption_label"),
              data: powerConsumptionData,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        usagePatternData: {
          labels: timeLabels,
          datasets: [
            {
              label: t("charger_usage_label"),
              data: usagePatternData,
              borderColor: "rgba(54, 162, 235, 1)",
              tension: 0.4,
              fill: false,
            },
          ],
        },
        chargingEfficiencyData: {
          labels: [
            t("efficiency_high"),
            t("efficiency_medium"),
            t("efficiency_low"),
          ],
          datasets: [
            {
              data: efficiencyData,
              backgroundColor: [
                "rgba(75, 192, 192, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(255, 99, 132, 0.8)",
              ],
            },
          ],
        },
        performanceMetricsData: {
          labels: [
            t("metrics_utilization"),
            t("metrics_efficiency"),
            t("metrics_availability"),
            t("metrics_reliability"),
          ],
          datasets: [
            {
              label: t("metrics_label"),
              data: performanceMetrics,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              pointBackgroundColor: "rgba(54, 162, 235, 1)",
              pointBorderColor: "#fff",
            },
          ],
        },
      };

      setResult(simulationResult);
      setIsLoading(false);
    }, 1500);
  };

  const changeSimulationParameters = () => {
    setResult(null);
  };

  const getChargerPropName = (fieldName: string) => fieldName.split(":")[0];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const { name: fieldName, value } = e.target;
    if (index !== undefined) {
      const name = getChargerPropName(fieldName);
      if (name === "numChargers" && !/^\d*$/.test(value)) return;
      else if (!/^\d*\.?\d*$/.test(value)) return;
      setChargers((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...prev[index],
          [name]: value,
        };
        return updated;
      });
      const numValue = parseInt(value);
      const validation = validateField(name, numValue);
      const chargerErrorToBeUpdated = chargerErrors[index];
      setChargerErrors((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...chargerErrorToBeUpdated,
          [name]: validation.error,
        };
        return updated;
      });
    }

    if (!/^\d*\.?\d*$/.test(value)) return;
    setCarDetails({
      ...carDetails,
      [fieldName]: value,
    });
    const numValue = parseFloat(value) || 0;
    const validation = validateField(fieldName, numValue);
    setCarErrors((prev) => ({ ...prev, [fieldName]: validation.error }));
  };

  const addNewCharger = () => {
    setChargers([
      ...chargers,
      {
        chargingSpeed: "11",
        numChargers: "20",
      },
    ]);
    setChargerErrors([
      ...chargerErrors,
      {
        chargingSpeed: "",
        numChargers: "",
      },
    ]);
  };

  const removeCharger = (index: number) => {
    setChargers((prev) => prev.filter((prev, idx) => idx !== index));
    setChargerErrors((prev) => prev.filter((prev, idx) => idx !== index));
  };

  return (
    <>
      {isLoading ? (
        <LoadingAnimation />
      ) : !result ? (
        <SimulatorForm
          carDetails={carDetails}
          carErrors={carErrors}
          chargers={chargers}
          chargerErrors={chargerErrors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          addNewCharger={addNewCharger}
          removeCharger={removeCharger}
          isFormInvalid={!isFormValid}
        />
      ) : (
        <SimulationResult
          result={result!}
          changeSimulationParameters={changeSimulationParameters}
        />
      )}
    </>
  );
};

export default SimulatorContent;
