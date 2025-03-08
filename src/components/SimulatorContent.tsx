import { useState } from "react";
import SimulationResult from "./SimulationResult";
import SimulatorForm, { Errors, FormData } from "./SimulatorForm";

const SimulatorContent = () => {
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

  const [result, setResult] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const chargingSpeed = parseFloat(formData.chargingSpeed) || 0;
    const numChargers = parseFloat(formData.numChargers) || 0;
    const avgCarConsumption = parseFloat(formData.avgCarConsumption) || 0;
    const multiplier = parseFloat(formData.multiplier) || 0;
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
    if (containsError) return;
    setResult(
      (chargingSpeed * numChargers * avgCarConsumption * multiplier) / 100
    );
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
      {!result ? (
        <SimulatorForm
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        <SimulationResult result={result} resetResult={resetResult} />
      )}
    </>
  );
};

export default SimulatorContent;
