import "@testing-library/jest-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  ns: ["translation"],
  defaultNS: "translation",
  resources: {
    en: {
      translation: {
        app_name: "Reonic",
        ev_simulator_title: "EV Charger Simulator",
        charging_speed: "Charging Speed",
        num_chargers: "# of Chargers",
        avg_car_consumption: "Avg. Car Consumption",
        multiplier: "Arrival probability multiplier",
        charging_speed_error:
          "We only support chargers of speeds of 5kW or more",
        run_simulation: "Run Simulation",
        change_simulation_parameters: "Change Simulation Parameters",
        kwh: "kWh",
        kw: "kW",
        power_consumption_per_chargepoint: "Power Consumption per Chargepoint",
        daily_usage_pattern: "Daily Usage Pattern",
        charging_efficiency_distribution: "Charging Efficiency Distribution",
        performance_metrics: "Performance Metrics",
        add_new_charger: "Add New Charger",
        total_energy_consumption: "Total Energy Consumption",
        peak_load_analysis: "Peak Load Analysis",
        total_energy_consumption_value: "{{value}} kWh",
        peak_load_analysis_value: "{{value}} kW",
      },
    },
  },
});
