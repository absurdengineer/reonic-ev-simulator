import { useState } from "react";

const InfoTooltip = ({ text }: { text: string }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <>
      <span
        className="ml-2 cursor-pointer border border-neutral-400 dark:border-neutral-500 text-neutral-500 dark:text-neutral-400 rounded-full w-4 h-4 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        i
      </span>
      {showTooltip && (
        <div className="absolute dark:bg-white bg-neutral-800 dark:text-neutral-800 text-neutral-200 text-xs rounded py-1 px-2 ml-0 mb-12 z-10">
          {text}
        </div>
      )}
    </>
  );
};

export default InfoTooltip;
