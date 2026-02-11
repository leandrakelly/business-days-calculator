import { addDays, isSaturday, isSunday, format } from "date-fns";

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

export function addBusinessDays(
  startDate: Date,
  daysToAdd: number,
  holidays: Holiday[],
): CalculationResult {
  let count = 0;
  let currentDate = startDate;
  const skippedDays = [];

  while (count < daysToAdd) {
    currentDate = addDays(currentDate, 1);

    const isWeekend = isSaturday(currentDate) || isSunday(currentDate);

    const holiday = holidays.find(
      (h) => h.date === format(currentDate, "yyyy-MM-dd"),
    );

    if (isWeekend) {
      skippedDays.push({
        date: currentDate,
        reason: isSaturday(currentDate) ? "Sábado" : "Domingo",
      });
    } else if (holiday) {
      skippedDays.push({
        date: currentDate,
        reason: `Feriado: ${holiday.name}`,
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
