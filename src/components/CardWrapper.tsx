import React from "react";

interface CardWithGraphProps {
  title: string;
  children: React.ReactNode;
}

const CardWrapper: React.FC<CardWithGraphProps> = ({ title, children }) => {
  return (
    <div className="bg-gray-100 shadow-lg dark:bg-gray-900 p-3 sm:p-4 rounded-lg">
      <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">
        {title}
      </h4>
      <div className="h-[300px] sm:h-[350px]">{children}</div>
    </div>
  );
};

export default CardWrapper;
