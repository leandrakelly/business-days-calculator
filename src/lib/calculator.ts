import { addDays, format, isSaturday, isSunday } from 'date-fns';

export interface Holiday {
  date: string;
  name: string;
  type: string;
}

export interface CalculationResult {
  endDate: Date;
  skippedDays: { date: Date; reason: string }[];
  workingDays: number;
}

export interface CalculatorOptions {
  includeSaturdays: boolean;
  includeSundays: boolean;
}

export function addBusinessDays(
  startDate: Date,
  daysToAdd: number,
  holidays: Holiday[],
  options: CalculatorOptions = {
    includeSaturdays: false,
    includeSundays: false,
  },
): CalculationResult {
  let count = 0;
  let currentDate = startDate;
  const skippedDays = [];

  while (count < daysToAdd) {
    currentDate = addDays(currentDate, 1);

    const isSat = isSaturday(currentDate);
    const isSun = isSunday(currentDate);
    const isWeekendSkipped =
      (isSat && !options.includeSaturdays) ||
      (isSun && !options.includeSundays);

    const holiday = holidays.find(
      (h) => h.date === format(currentDate, 'yyyy-MM-dd'),
    );

    if (isWeekendSkipped) {
      skippedDays.push({
        date: currentDate,
        reason: isSat ? 'Sábado' : 'Domingo',
      });
    } else if (holiday) {
      skippedDays.push({
        date: currentDate,
        reason: `Feriado (${holiday.type}): ${holiday.name}`,
      });
    } else {
      count++;
    }
  }

  return {
    endDate: currentDate,
    skippedDays,
    workingDays: count,
  };
}
