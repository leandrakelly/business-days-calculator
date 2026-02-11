import { format, parseISO } from 'date-fns';
import { describe, expect, it } from 'vitest';

import { addBusinessDays, Holiday } from './calculator';

const d = (dateStr: string) => parseISO(dateStr);
const fmt = (date: Date) => format(date, 'yyyy-MM-dd');

const MOCK_HOLIDAYS: Holiday[] = [
  { date: '2025-12-25', name: 'Christmas', type: 'National' },
  { date: '2026-01-01', name: 'New Year', type: 'National' },
  { date: '2026-02-17', name: 'Carnival', type: 'National' },
  { date: '2026-04-21', name: 'Tiradentes', type: 'National' },
  { date: '2026-04-23', name: 'St. George', type: 'State (RJ)' },
  { date: '2026-09-07', name: 'Independence Day', type: 'National' },
];

describe('Business Days Calculator', () => {
  it('should skip weekends correctly (Standard)', () => {
    const result = addBusinessDays(d('2026-02-06'), 1, MOCK_HOLIDAYS);

    expect(fmt(result.endDate)).toBe('2026-02-09');
    expect(result.workingDays).toBe(1);
    expect(result.skippedDays).toHaveLength(2);
  });

  it('should skip national holidays and weekends combined', () => {
    const result = addBusinessDays(d('2026-02-13'), 3, MOCK_HOLIDAYS);

    expect(fmt(result.endDate)).toBe('2026-02-19');
    expect(result.skippedDays).toHaveLength(3);
  });

  it('should count Saturday as a business day when configured', () => {
    const result = addBusinessDays(d('2026-02-06'), 1, MOCK_HOLIDAYS, {
      includeSaturdays: true,
      includeSundays: false,
    });

    expect(fmt(result.endDate)).toBe('2026-02-07');
    expect(result.skippedDays).toHaveLength(0);
  });

  it('should skip specific state holidays', () => {
    const result = addBusinessDays(d('2026-04-22'), 2, MOCK_HOLIDAYS);

    expect(fmt(result.endDate)).toBe('2026-04-27');
    const holidayReason = result.skippedDays.find(
      (d) => fmt(d.date) === '2026-04-23',
    )?.reason;
    expect(holidayReason).toContain('St. George');
  });
  it('should calculate correctly across years', () => {
    const result = addBusinessDays(d('2025-12-30'), 3, MOCK_HOLIDAYS);

    expect(fmt(result.endDate)).toBe('2026-01-05');
  });

  it('should respect manually added holidays', () => {
    const customHolidays: Holiday[] = [
      ...MOCK_HOLIDAYS,
      { date: '2026-02-18', name: 'My Birthday', type: 'Manual' },
    ];
    const result = addBusinessDays(d('2026-02-16'), 1, customHolidays);

    expect(fmt(result.endDate)).toBe('2026-02-19');
  });

  it('should work with an empty holiday list', () => {
    const result = addBusinessDays(d('2026-02-06'), 1, []);
    expect(fmt(result.endDate)).toBe('2026-02-09');
  });
});
