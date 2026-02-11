import { format, parseISO } from 'date-fns';
import { useCallback, useMemo, useState } from 'react';

import { addBusinessDays, CalculationResult, Holiday } from '@/lib/calculator';
import { getStateHolidays } from '@/services/holidayService';

interface CalculatorFormData {
  startDate: string;
  daysToAdd: number;
  selectedState: string;
  includeSaturdays: boolean;
  includeSundays: boolean;
}

interface UseBusinessDaysProps {
  initialHolidays: Holiday[];
}

export function useBusinessDays({ initialHolidays }: UseBusinessDaysProps) {
  const [formData, setFormData] = useState<CalculatorFormData>({
    startDate: format(new Date(), 'yyyy-MM-dd'),
    daysToAdd: 5,
    selectedState: '',
    includeSaturdays: false,
    includeSundays: false,
  });

  const [customHolidays, setCustomHolidays] = useState<Holiday[]>([]);

  const stateHolidays = useMemo(() => {
    if (!formData.selectedState) return [];
    return getStateHolidays(formData.selectedState);
  }, [formData.selectedState]);

  const [result, setResult] = useState<CalculationResult | null>(null);

  const addCustomHoliday = useCallback((date: string, name: string) => {
    if (!date || !name) return;
    setCustomHolidays((prev) => [
      ...prev,
      { date, name, type: 'Municipal/Manual' },
    ]);
  }, []);

  const removeCustomHoliday = useCallback((dateToRemove: string) => {
    setCustomHolidays((prev) => prev.filter((h) => h.date !== dateToRemove));
  }, []);

  const calculate = useCallback(() => {
    if (!formData.startDate) return;

    const start = parseISO(formData.startDate);

    const allHolidays = [
      ...initialHolidays,
      ...stateHolidays,
      ...customHolidays,
    ];

    const calculation = addBusinessDays(
      start,
      formData.daysToAdd,
      allHolidays,
      {
        includeSaturdays: formData.includeSaturdays,
        includeSundays: formData.includeSundays,
      },
    );

    setResult(calculation);
  }, [formData, initialHolidays, stateHolidays, customHolidays]);

  const handleInputChange = useCallback(
    (field: keyof CalculatorFormData, value: string | number | boolean) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  return {
    formData,
    customHolidays,
    stateHolidays,
    result,
    actions: {
      handleInputChange,
      addCustomHoliday,
      removeCustomHoliday,
      calculate,
    },
  };
}
