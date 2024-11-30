import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeatmapHeaderProps {
  year: number;
  totalSubmissions: number;
  onYearChange: (year: number) => void;
  currentYear: number;
}

const HeatmapHeader: React.FC<HeatmapHeaderProps> = ({
  year,
  totalSubmissions,
  onYearChange,
  currentYear,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="text-sm text-gray-400">
        {totalSubmissions} problems solved in {year}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onYearChange(year - 1)}
          className="p-1 hover:bg-gray-800 rounded transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm font-medium">{year}</span>
        <button
          onClick={() => onYearChange(year + 1)}
          className="p-1 hover:bg-gray-800 rounded transition-colors"
          disabled={year === currentYear}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default HeatmapHeader;