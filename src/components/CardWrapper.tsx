import { t } from "i18next";
import React from "react";

interface CardWithGraphProps {
  titleKey: string;
  children: React.ReactNode;
}

const CardWrapper: React.FC<CardWithGraphProps> = ({ titleKey, children }) => {
  return (
    <div className="bg-gray-100 shadow-lg dark:bg-gray-900 p-3 sm:p-4 rounded-lg">
      <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">
        {t(titleKey)}
      </h4>
      <div className="h-[300px] sm:h-[350px]">{children}</div>
    </div>
  );
};

export default CardWrapper;
