import React from "react";
import { format } from "date-fns";

interface MonthLabelsProps {
  weeks: Date[][];
}

const MonthLabels: React.FC<MonthLabelsProps> = ({ weeks }) => {
  const months: { label: string; index: number }[] = [];

  weeks.forEach((week, index) => {
    const monthLabel = format(week[0], "MMM");
    if (index === 0 || monthLabel !== format(weeks[index - 1][0], "MMM")) {
      months.push({ label: monthLabel, index });
    }
  });

  return (
    <div className="flex text-xs text-gray-400 h-8 relative">
      {months.map(({ label, index }, i) => {
        const width =
          i === months.length - 1
            ? "calc(100% - 16px)"
            : `${(months[i + 1].index - index) * 16}px`;

        return (
          <div
            key={`${label}-${index}`}
            className="absolute"
            style={{ left: `${index * 16}px`, width }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

export default MonthLabels;
