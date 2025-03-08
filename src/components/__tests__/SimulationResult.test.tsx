import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SimulationResult from "../SimulationResult";

// Mock Chart.js
jest.mock("chart.js");

describe("SimulationResult Component", () => {
  const mockResult = {
    overviewData: {
      totalEnergyConsumption: 1000,
      peakLoad: 50,
    },
    powerConsumptionData: {
      labels: ["00:00", "01:00"],
      datasets: [
        {
          label: "Power Consumption",
          data: [30, 40],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    usagePatternData: {
      labels: ["00:00", "01:00"],
      datasets: [
        {
          label: "Usage Pattern",
          data: [5, 8],
          borderColor: "rgba(54, 162, 235, 1)",
          tension: 0.4,
          fill: false,
        },
      ],
    },
    chargingEfficiencyData: {
      labels: ["High", "Medium", "Low"],
      datasets: [
        {
          data: [60, 30, 10],
          backgroundColor: [
            "rgba(75, 192, 192, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 99, 132, 0.8)",
          ],
        },
      ],
    },
    performanceMetricsData: {
      labels: ["Utilization", "Efficiency", "Availability", "Reliability"],
      datasets: [
        {
          label: "Metrics",
          data: [80, 85, 90, 95],
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          pointBackgroundColor: "rgba(54, 162, 235, 1)",
          pointBorderColor: "#fff",
        },
      ],
    },
  };

  test("renders overview cards with correct values", () => {
    render(<SimulationResult result={mockResult} resetResult={() => {}} />);

    expect(screen.getByText(`1000.00 kWh`)).toBeInTheDocument();
    expect(screen.getByText(`50.00 kW`)).toBeInTheDocument();
  });

  test("calls resetResult when reset button is clicked", async () => {
    const mockResetResult = jest.fn();
    render(
      <SimulationResult result={mockResult} resetResult={mockResetResult} />
    );

    const resetButton = screen.getByText("Reset Simulation");
    await userEvent.click(resetButton);

    expect(mockResetResult).toHaveBeenCalledTimes(1);
  });

  test("renders all chart components", () => {
    render(<SimulationResult result={mockResult} resetResult={() => {}} />);

    expect(
      screen.getByText("Power Consumption per Chargepoint")
    ).toBeInTheDocument();
    expect(screen.getByText("Daily Usage Pattern")).toBeInTheDocument();
    expect(
      screen.getByText("Charging Efficiency Distribution")
    ).toBeInTheDocument();
    expect(screen.getByText("Performance Metrics")).toBeInTheDocument();
  });
});
