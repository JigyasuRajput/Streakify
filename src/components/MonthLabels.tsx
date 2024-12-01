import React from "react";
import { format } from "date-fns";

interface MonthLabelsProps {
  weeks: Date[][]; // Each week is an array of 7 dates
}

const MonthLabels: React.FC<MonthLabelsProps> = ({ weeks }) => {
  const months: { label: string; index: number }[] = [];

  // Track the starting month to avoid an extra December label at the start
  const firstMonth = format(weeks[0][0], "MMM");

  weeks.forEach((week, index) => {
    const monthLabel = format(week[0], "MMM");

    // Only add labels for the first week of each new month, excluding extra December
    if (
      (index === 0 && monthLabel === firstMonth) || // Ensure starting month
      monthLabel !== format(weeks[index - 1][0], "MMM")
    ) {
      months.push({ label: monthLabel, index });
    }
  });

  return (
    <div className="flex text-xs text-gray-400 mb-2">
      {months.map(({ label, index }) => (
        <div
          key={`${label}-${index}`}
          className="flex-1 text-center"
          style={{ gridColumnStart: index + 1 }}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export default MonthLabels;
