import React from 'react';
import { formatDisplayDate } from '../utils/dateUtils';

interface HeatmapCellProps {
  date: Date;
  count: number;
}

const HeatmapCell: React.FC<HeatmapCellProps> = ({ date, count }) => {
  const getIntensityClass = (count: number) => {
    if (count === 0) return 'bg-gray-800';
    if (count <= 2) return 'bg-green-900';
    if (count <= 4) return 'bg-green-700';
    if (count <= 6) return 'bg-green-500';
    return 'bg-green-300';
  };

  return (
    <div
      className={`w-3 h-3 rounded-sm ${getIntensityClass(count)} transition-colors duration-200 hover:ring-2 hover:ring-white hover:ring-opacity-50`}
      title={`${formatDisplayDate(date)}: ${count} problems solved`}
    />
  );
};

export default HeatmapCell;