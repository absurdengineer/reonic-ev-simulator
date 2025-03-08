interface OverviewCardProps {
  title: string;
  result: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ title, result }) => {
  return (
    <div className="bg-gray-100 shadow-lg dark:bg-gray-900 p-3 sm:p-4 rounded-lg">
      <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">
        {title}
      </h4>
      <div className="text-xl sm:text-2xl font-bold text-primary-500">
        {result}
      </div>
    </div>
  );
};

export default OverviewCard;
