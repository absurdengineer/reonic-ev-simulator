import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SimulatorForm from "../SimulatorForm";

describe("SimulatorForm Component", () => {
  const mockHandleSubmit = jest.fn((e) => e.preventDefault());
  const mockHandleChange = jest.fn();
  const mockAddNewCharger = jest.fn();
  const mockRemoveCharger = jest.fn();

  const defaultProps = {
    carDetails: {
      avgCarConsumption: "18",
      multiplier: "120",
    },
    carErrors: {
      avgCarConsumption: "",
      multiplier: "",
    },
    chargers: [
      {
        chargingSpeed: "11",
        numChargers: "20",
      },
    ],
    chargerErrors: [
      {
        chargingSpeed: "",
        numChargers: "",
      },
    ],
    handleChange: mockHandleChange,
    handleSubmit: mockHandleSubmit,
    addNewCharger: mockAddNewCharger,
    removeCharger: mockRemoveCharger,
    isFormInvalid: false,
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
      chargerErrors: [
        {
          chargingSpeed: "charging_speed_error",
          numChargers: "",
        },
      ],
    };

    render(<SimulatorForm {...propsWithErrors} />);
    expect(
      screen.getByText(/We only support chargers of speeds of 5kW or more/i)
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
    const chargingSpeedInput = screen.getByLabelText(/charging speed/i);

    await userEvent.type(chargingSpeedInput, "15");
    expect(mockHandleChange).toHaveBeenCalledWith(expect.any(Object), 0);
  });

  test("calls addNewCharger when add button is clicked", async () => {
    render(<SimulatorForm {...defaultProps} />);
    const addButton = screen.getByText(/Add New Charger/i);

    await userEvent.click(addButton);
    expect(mockAddNewCharger).toHaveBeenCalled();
  });
});
