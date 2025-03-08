import { t } from "i18next";
import React from "react";
import InfoTooltip from "./InfoTooltip";

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  info?: string;
  error?: string; // Add error prop
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  info,
  error,
}) => {
  return (
    <div className="flex-1 flex flex-col relative">
      <label
        htmlFor={id}
        className="mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center"
      >
        {label}
        {info && <InfoTooltip text={info} />}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        className={`p-2 border rounded-md focus:outline-none focus:ring-2 transition-colors duration-200 
          ${
            error
              ? "border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/10 text-red-900 dark:text-red-100 focus:ring-red-300 dark:focus:ring-red-600"
              : "border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-300 dark:focus:ring-primary-600"
          }`}
        value={value}
        onChange={onChange}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {t(error)}
        </p>
      )}
    </div>
  );
};

export default InputField;
