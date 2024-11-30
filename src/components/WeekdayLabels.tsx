import React from 'react';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const WeekdayLabels: React.FC = () => {
  return (
    <div className="grid grid-rows-7 gap-1 text-xs text-gray-400 pr-2 pt-8">
      {WEEKDAYS.map(day => (
        <div key={day} className="h-3 flex items-center">
          {day}
        </div>
      ))}
    </div>
  );
};

export default WeekdayLabels;