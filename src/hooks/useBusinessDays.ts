import { useState, useCallback } from "react";
import { addBusinessDays, Holiday, CalculationResult } from "@/lib/calculator";
import { format, parseISO } from "date-fns";

interface UseBusinessDaysProps {
  initialHolidays: Holiday[];
}

export function useBusinessDays({ initialHolidays }: UseBusinessDaysProps) {
  const [formData, setFormData] = useState({
    startDate: format(new Date(), "yyyy-MM-dd"),
    daysToAdd: 5,
  });
  const [customHolidays, setCustomHolidays] = useState<Holiday[]>([]);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const addCustomHoliday = useCallback((date: string, name: string) => {
    if (!date || !name) return;
    setCustomHolidays((prev) => [
      ...prev,
      { date, name, type: "Municipal/Manual" },
    ]);
  }, []);

  const removeCustomHoliday = useCallback((dateToRemove: string) => {
    setCustomHolidays((prev) => prev.filter((h) => h.date !== dateToRemove));
  }, []);

  const calculate = useCallback(() => {
    if (!formData.startDate) return;

    const start = parseISO(formData.startDate);
    const allHolidays = [...initialHolidays, ...customHolidays];

    const calculation = addBusinessDays(start, formData.daysToAdd, allHolidays);
    setResult(calculation);
  }, [formData, initialHolidays, customHolidays]);

  const handleInputChange = (
    field: keyof typeof formData,
    value: string | number,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    customHolidays,
    result,
    actions: {
      handleInputChange,
      addCustomHoliday,
      removeCustomHoliday,
      calculate,
    },
  };
}
