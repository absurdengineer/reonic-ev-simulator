import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import MainContent from "./components/MainContent";
import Navbar from "./components/Navbar";
import Simulator from "./components/Simulator";

const App: React.FC = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.title = "EV Charging Simulator";
  }, [i18n.language]);

  return (
    <div className="text-neutral-700 dark:text-white">
      <Navbar />
      <MainContent>
        <Simulator />
      </MainContent>
    </div>
  );
};

export default App;
