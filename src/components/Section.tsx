import React from "react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <div className="mt-4">
    <p className="font-bold text-sm text-neutral-800 dark:text-neutral-200">
      {title}
    </p>
    <hr className="mb-4 border-neutral-400 dark:border-neutral-700" />
    {children}
  </div>
);

export default Section;
