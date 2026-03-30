"use client";

import { ComparisonPeriod } from "@/constants/globalAverages";

interface PeriodSelectorProps {
  selectedPeriod: ComparisonPeriod;
  onPeriodChange: (period: ComparisonPeriod) => void;
  className?: string;
}

export default function PeriodSelector({
  selectedPeriod,
  onPeriodChange,
  className = "",
}: PeriodSelectorProps) {
  const periods: { value: ComparisonPeriod; label: string; icon: string }[] = [
    { value: "daily", label: "Daily", icon: "📅" },
    { value: "weekly", label: "Weekly", icon: "📊" },
    { value: "monthly", label: "Monthly", icon: "📈" },
  ];

  return (
    <div className={`flex bg-gray-100 rounded-lg p-1 ${className}`}>
      {periods.map((period) => (
        <button
          key={period.value}
          onClick={() => onPeriodChange(period.value)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 flex-1 justify-center ${
            selectedPeriod === period.value
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          <span className="text-lg">{period.icon}</span>
          <span>{period.label}</span>
        </button>
      ))}
    </div>
  );
}