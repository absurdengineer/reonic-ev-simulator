import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { t } from "i18next";
import { Bar, Line, Pie, Radar } from "react-chartjs-2";
import { AiFillEdit } from "react-icons/ai";
import CardWrapper from "./CardWrapper";
import OverviewCard from "./OverviewCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

export interface SimulationResultData {
  overviewData: {
    totalEnergyConsumption: number;
    peakLoad: number;
  };
  powerConsumptionData: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }>;
  };
  usagePatternData: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      borderColor: string;
      tension: number;
      fill: boolean;
    }>;
  };
  chargingEfficiencyData: {
    labels: string[];
    datasets: Array<{
      data: number[];
      backgroundColor: string[];
    }>;
  };
  performanceMetricsData: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      pointBackgroundColor: string;
      pointBorderColor: string;
    }>;
  };
}

interface SimulationResultProps {
  result: SimulationResultData;
  changeSimulationParameters: () => void;
}

const SimulationResult: React.FC<SimulationResultProps> = ({
  result,
  changeSimulationParameters,
}) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 10,
          padding: 10,
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
        },
      },
    },
  };

  return (
    <div className="p-4 space-y-4 sm:space-y-8">
      <h3 className="text-lg sm:text-xl text-primary-500 dark:text-primary-300 font-semibold">
        {t("simulation_results")}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <OverviewCard
          title={"total_energy_consumption"}
          valueKey="total_energy_consumption_value"
          value={result.overviewData.totalEnergyConsumption.toFixed(2)}
        />
        <OverviewCard
          title={t("peak_load_analysis")}
          valueKey="peak_load_analysis_value"
          value={result.overviewData.peakLoad.toFixed(2)}
        />

        <CardWrapper titleKey="power_consumption_per_chargepoint">
          <Bar data={result.powerConsumptionData} options={chartOptions} />
        </CardWrapper>

        <CardWrapper titleKey="daily_usage_pattern">
          <Line data={result.usagePatternData} options={chartOptions} />
        </CardWrapper>

        <CardWrapper titleKey="charging_efficiency_distribution">
          <Pie data={result.chargingEfficiencyData} options={chartOptions} />
        </CardWrapper>

        <CardWrapper titleKey="performance_metrics">
          <Radar data={result.performanceMetricsData} options={chartOptions} />
        </CardWrapper>
      </div>

      <div className="flex flex-row justify-center pt-4">
        <button
          onClick={changeSimulationParameters}
          className="flex gap-2 items-center w-full sm:w-auto bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white px-4 sm:px-6 py-2 rounded-md transition duration-200 text-sm sm:text-base"
        >
          <AiFillEdit /> {t("change_simulation_parameters")}
        </button>
      </div>
    </div>
  );
};

export default SimulationResult;
