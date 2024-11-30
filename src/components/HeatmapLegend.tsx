import React from 'react';

const HeatmapLegend: React.FC = () => {
  return (
    <div className="mt-4 flex justify-between text-sm text-gray-400">
      <div className="flex items-center gap-2">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-gray-800" />
          <div className="w-3 h-3 rounded-sm bg-green-900" />
          <div className="w-3 h-3 rounded-sm bg-green-700" />
          <div className="w-3 h-3 rounded-sm bg-green-500" />
          <div className="w-3 h-3 rounded-sm bg-green-300" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default HeatmapLegend;