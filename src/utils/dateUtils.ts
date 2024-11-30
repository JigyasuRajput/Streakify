import { format, eachDayOfInterval, startOfYear, endOfYear, parseISO, isSameDay, getDay, addDays } from 'date-fns';

export const getYearDates = (year: number) => {
  const start = startOfYear(new Date(year, 0));
  const end = endOfYear(new Date(year, 0));
  return eachDayOfInterval({ start, end });
};

export const formatDate = (date: Date): string => format(date, 'yyyy-MM-dd');
export const formatDisplayDate = (date: Date): string => format(date, 'MMM d, yyyy');

export const getDayCount = (submissions: { date: string; count: number }[], date: Date): number => {
  const submission = submissions.find(s => isSameDay(parseISO(s.date), date));
  return submission?.count || 0;
};

export const getTotalSubmissions = (submissions: { count: number }[]): number => {
  return submissions.reduce((total, submission) => total + submission.count, 0);
};

export const getWeeksInYear = (dates: Date[]): Date[][] => {
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];
  
  // Pad the beginning to align with Sunday
  const firstDay = dates[0];
  const firstDayOfWeek = getDay(firstDay);
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push(addDays(firstDay, -firstDayOfWeek + i));
  }
  
  dates.forEach(date => {
    currentWeek.push(date);
    if (getDay(date) === 6) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  
  // Push the last week if it's not complete
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }
  
  return weeks;
};