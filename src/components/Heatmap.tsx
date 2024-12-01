import React, { useState } from "react";
import { PlatformSubmission } from "../types/submission";
import {
  getYearDates,
  getDayCount,
  getTotalSubmissions,
  getWeeksInYear,
} from "../utils/dateUtils";
import HeatmapCell from "./HeatmapCell";
import HeatmapHeader from "./HeatmapHeader";
import WeekdayLabels from "./WeekdayLabels";
import MonthLabels from "./MonthLabels";

interface HeatmapProps {
  submissions: PlatformSubmission[];
}

const Heatmap: React.FC<HeatmapProps> = ({ submissions }) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const dates = getYearDates(selectedYear);
  const weeks = getWeeksInYear(dates);
  const yearSubmissions = submissions.filter(
    (s) => new Date(s.date).getFullYear() === selectedYear
  );

  const totalSubmissions = getTotalSubmissions(yearSubmissions);

  console.log("Heatmap submissions:", submissions);
  console.log("Year submissions:", yearSubmissions);

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-x-auto">
      <HeatmapHeader
        year={selectedYear}
        totalSubmissions={totalSubmissions}
        onYearChange={setSelectedYear}
        currentYear={currentYear}
      />
      <div className="flex p-4 space-x-2">
        <WeekdayLabels />
        <div className="flex-1">
          <MonthLabels weeks={weeks} />
          <div className="grid grid-flow-col auto-cols-max gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-rows-7 gap-1">
                {week.map((date) => (
                  <HeatmapCell
                    key={date.toISOString()}
                    date={date}
                    count={getDayCount(submissions, date)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Heatmap;
