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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const chargingSpeed = parseFloat(formData.chargingSpeed) || 0;
      const numChargers = parseFloat(formData.numChargers) || 0;
      const avgCarConsumption = parseFloat(formData.avgCarConsumption) || 0;
      let containsError = false;

      if (chargingSpeed < 5) {
        setErrors((prev) => ({
          ...prev,
          chargingSpeed: "charging_speed_error",
        }));
        containsError = true;
      }
      if (numChargers < 2) {
        setErrors((prev) => ({
          ...prev,
          numChargers: "num_chargers_error",
        }));
        containsError = true;
      }
      if (avgCarConsumption < 7) {
        setErrors((prev) => ({
          ...prev,
          avgCarConsumption: "avg_car_consumption_error",
        }));
        containsError = true;
      }
      if (containsError) {
        setIsLoading(false);
        return;
      }

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
    if (/^\d*\.?\d*$/.test(value)) {
      setFormData({
        ...formData,
        [name]: value,
      });
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
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
