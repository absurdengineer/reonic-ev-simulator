import { t } from "i18next";

interface OverviewCardProps {
  title: string;
  value: string;
  valueKey: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  title,
  value,
  valueKey,
}) => {
  return (
    <div className="bg-gray-100 shadow-lg dark:bg-gray-900 p-3 sm:p-4 rounded-lg">
      <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">
        {t(title)}
      </h4>
      <div className="text-xl sm:text-2xl font-bold text-primary-500">
        {t(valueKey, { value })}
      </div>
    </div>
  );
};

export default OverviewCard;
