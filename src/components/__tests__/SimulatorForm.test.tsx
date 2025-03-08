import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SimulatorForm from "../SimulatorForm";

describe("SimulatorForm Component", () => {
  const mockHandleSubmit = jest.fn((e) => e.preventDefault());
  const mockHandleChange = jest.fn();
  const defaultProps = {
    formData: {
      chargingSpeed: "11",
      numChargers: "20",
      avgCarConsumption: "18",
      multiplier: "120",
    },
    errors: {
      chargingSpeed: "",
      numChargers: "",
      avgCarConsumption: "",
      multiplier: "",
    },
    handleChange: mockHandleChange,
    handleSubmit: mockHandleSubmit,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all form inputs", () => {
    render(<SimulatorForm {...defaultProps} />);

    expect(screen.getByLabelText(/^Charging Speed/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^# of Chargers/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Avg\. Car Consumption/)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/^Arrival probability multiplier/)
    ).toBeInTheDocument();
  });

  test("displays validation errors", () => {
    const propsWithErrors = {
      ...defaultProps,
      errors: {
        ...defaultProps.errors,
        chargingSpeed: "charging_speed_error",
      },
    };

    render(<SimulatorForm {...propsWithErrors} />);
    expect(
      screen.getByText("We only support chargers of speeds of 5kW or more")
    ).toBeInTheDocument();
  });

  test("calls handleSubmit when form is submitted", async () => {
    render(<SimulatorForm {...defaultProps} />);
    const submitButton = screen.getByText("Run Simulation");

    await userEvent.click(submitButton);
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  test("calls handleChange when input values change", async () => {
    render(<SimulatorForm {...defaultProps} />);
    const chargingSpeedInput = screen.getByLabelText(/Charging Speed/i);

    await userEvent.type(chargingSpeedInput, "15");
    expect(mockHandleChange).toHaveBeenCalled();
  });
});
