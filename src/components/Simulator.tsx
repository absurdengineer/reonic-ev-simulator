import SimulatorContent from "./SimulatorContent";
import SimulatorTitle from "./SimulatorTitle";

const Simulator = () => {
  return (
    <div className="shadow-md shadow-neutral-300 dark:shadow-neutral-900 bg-white dark:bg-neutral-800 p-8 rounded-md transition-colors duration-300 my-10">
      <SimulatorTitle />
      <SimulatorContent />
    </div>
  );
};

export default Simulator;
