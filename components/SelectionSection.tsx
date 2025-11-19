import React from 'react';

export interface SelectionOption {
  value: string;
  label: React.ReactNode;
}

interface SelectionSectionProps {
  title: string;
  options: SelectionOption[];
  selectedValue: string | null;
  onChange: (value: string) => void;
  groupName: string;
}

export const SelectionSection: React.FC<SelectionSectionProps> = ({
  title,
  options,
  selectedValue,
  onChange,
  groupName
}) => {
  return (
    <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-high-contrast-accent border-b-2 border-gray-100 pb-2">
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <label
            key={option.value}
            className={`
              relative cursor-pointer p-4 rounded-lg border-2 text-lg font-medium transition-all
              flex items-center justify-center text-center h-full
              hover:bg-blue-50
              focus-within:ring-4 focus-within:ring-high-contrast-focus
              ${selectedValue === option.value 
                ? 'bg-blue-100 border-high-contrast-accent text-high-contrast-accent shadow-md' 
                : 'bg-gray-50 border-gray-300 text-gray-700'}
            `}
          >
            <input
              type="radio"
              name={groupName}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only" // Visually hide but keep accessible
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};