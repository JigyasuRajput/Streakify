import React, { useState } from 'react';
import { PlatformSubmission } from '../types/submission';
import { getYearDates, getDayCount, getTotalSubmissions, getWeeksInYear } from '../utils/dateUtils';
import HeatmapCell from './HeatmapCell';
import HeatmapHeader from './HeatmapHeader';
import WeekdayLabels from './WeekdayLabels';
import MonthLabels from './MonthLabels';

interface HeatmapProps {
  submissions: PlatformSubmission[];
}

const Heatmap: React.FC<HeatmapProps> = ({ submissions }) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  
  const dates = getYearDates(selectedYear);
  const weeks = getWeeksInYear(dates);
  const yearSubmissions = submissions.filter(s => 
    new Date(s.date).getFullYear() === selectedYear
  );
  
  const totalSubmissions = getTotalSubmissions(yearSubmissions);

  return (
    <div className="p-4 bg-gray-900 rounded-lg shadow-lg">
      <HeatmapHeader
        year={selectedYear}
        totalSubmissions={totalSubmissions}
        onYearChange={setSelectedYear}
        currentYear={currentYear}
      />
      <div className="flex gap-3 overflow-x-auto">
        <WeekdayLabels />
        <div className="flex-1 min-w-0">
          <MonthLabels weeks={weeks} />
          <div className="grid grid-rows-7 grid-flow-col gap-1">
            {dates.map(date => (
              <HeatmapCell
                key={date.toISOString()}
                date={date}
                count={getDayCount(submissions, date)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;