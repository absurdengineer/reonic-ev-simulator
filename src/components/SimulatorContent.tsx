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
    const chargingSpeed = parseFloat(formData.chargingSpeed);
    const numChargers = parseFloat(formData.numChargers);
    const avgCarConsumption = parseFloat(formData.avgCarConsumption);
    const multiplier = parseFloat(formData.multiplier);

    if (chargingSpeed < 0) {
      setErrors((prev) => ({
        ...prev,
        chargingSpeed: "Charging speed must be a positive number",
      }));
      return;
    }
    if (numChargers < 0) {
      setErrors((prev) => ({
        ...prev,
        numChargers: "Number of chargers must be a positive number",
      }));
      return;
    }
    if (avgCarConsumption < 0) {
      setErrors((prev) => ({
        ...prev,
        avgCarConsumption: "Average car consumption must be a positive number",
      }));
      return;
    }
    if (multiplier < 60) {
      setErrors((prev) => ({
        ...prev,
        multiplier: "Multiplier must be a positive number",
      }));
      return;
    }

    setResult(
      (chargingSpeed * numChargers * avgCarConsumption * multiplier) / 100
    );
  };

  const resetResult = () => {
    setResult(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="">
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
    </div>
  );
};

export default SimulatorContent;
