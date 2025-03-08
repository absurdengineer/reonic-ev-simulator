export const generateTimeLabels = () =>
  Array.from({ length: 24 }, (_, i) => `${i}:00`);

export const generateHourlyPowerConsumption = (
  chargingSpeed: number,
  numChargers: number,
  avgCarConsumption: number
) => {
  const baseLoad = chargingSpeed * numChargers * (avgCarConsumption / 100);
  return Array.from({ length: 24 }, (_, hour) => {
    const timeMultiplier = hour >= 8 && hour <= 20 ? 1.2 : 0.6; // Higher usage during day
    const randomVariation = 0.5 + Math.random();
    return baseLoad * timeMultiplier * randomVariation;
  });
};

export const generateUsagePattern = (numChargers: number) => {
  return Array.from({ length: 24 }, (_, hour) => {
    const baseUsage = Math.random() * numChargers;
    const timeBasedUsage =
      hour >= 8 && hour <= 20 ? baseUsage * 1.3 : baseUsage * 0.7;
    return Math.min(timeBasedUsage, numChargers);
  });
};

export const generateChargingEfficiency = () => {
  const high = 50 + Math.random() * 20;
  const medium = 20 + Math.random() * 20;
  const low = Math.max(100 - high - medium, 5);
  return [high, medium, low];
};

export const generatePerformanceMetrics = () => {
  return [
    75 + Math.random() * 20, // Utilization
    80 + Math.random() * 15, // Efficiency
    85 + Math.random() * 10, // Availability
    90 + Math.random() * 8, // Reliability
  ];
};
