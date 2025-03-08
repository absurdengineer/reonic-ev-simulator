import { useState } from "react";
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
import SimulatorForm, { Errors, FormData } from "./SimulatorForm";

const SimulatorContent = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    chargingSpeed: "11",
    numChargers: "20",
    avgCarConsumption: "18",
    multiplier: "120",
  });

  const [errors, setErrors] = useState<Errors>({
    chargingSpeed: "",
    numChargers: "",
    avgCarConsumption: "",
    multiplier: "",
  });

  const [result, setResult] = useState<SimulationResultData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

    const chargingSpeed = parseFloat(formData.chargingSpeed) || 0;
    const numChargers = parseInt(formData.numChargers) || 0;
    const avgCarConsumption = parseFloat(formData.avgCarConsumption) || 0;

    const validations = {
      chargingSpeed: validateField("chargingSpeed", chargingSpeed),
      numChargers: validateField("numChargers", numChargers),
      avgCarConsumption: validateField("avgCarConsumption", avgCarConsumption),
    };

    const newErrors = {
      chargingSpeed: validations.chargingSpeed.error,
      numChargers: validations.numChargers.error,
      avgCarConsumption: validations.avgCarConsumption.error,
      multiplier: "",
    };

    setErrors(newErrors);

    if (Object.values(validations).some((v) => !v.isValid)) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const timeLabels = generateTimeLabels();
      const powerConsumptionData = generateHourlyPowerConsumption(
        chargingSpeed,
        numChargers,
        avgCarConsumption
      );
      const usagePatternData = generateUsagePattern(numChargers);
      const efficiencyData = generateChargingEfficiency();
      const performanceMetrics = generatePerformanceMetrics();

      const simulationResult: SimulationResultData = {
        overviewData: {
          totalEnergyConsumption:
            chargingSpeed * numChargers * 24 * (0.5 + Math.random() * 0.4),
          peakLoad: chargingSpeed * numChargers * (0.8 + Math.random() * 0.3),
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

  const resetResult = () => {
    setResult(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "numChargers") {
      // Only allow integers for numChargers
      if (/^\d*$/.test(value)) {
        setFormData({
          ...formData,
          [name]: value,
        });
        const numValue = parseInt(value) || 0;
        const validation = validateField(name, numValue);
        if (validation.isValid) {
          setErrors((prev) => ({ ...prev, [name]: "" }));
        }
      }
    } else {
      if (/^\d*\.?\d*$/.test(value)) {
        setFormData({
          ...formData,
          [name]: value,
        });
        const numValue = parseFloat(value) || 0;
        const validation = validateField(name, numValue);
        if (validation.isValid) {
          setErrors((prev) => ({ ...prev, [name]: "" }));
        }
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingAnimation />
      ) : !result ? (
        <SimulatorForm
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        <SimulationResult result={result!} resetResult={resetResult} />
      )}
    </>
  );
};

export default SimulatorContent;
