/**
 * Deterministic fortnightly edition window. Two fixed editions per month:
 *   • First half  — 1st → 15th  (period key …-H1)
 *   • Second half — 16th → end of month (…-H2)
 * All boundaries are UTC: 00:00 on the start day → 23:59:59 on the end day.
 */
export interface PeriodWindow {
  periodKey: string; // e.g. "2026-11-H2"
  periodStart: string; // YYYY-MM-DD (1st or 16th)
  periodEnd: string; // YYYY-MM-DD (15th or last day of month)
  startUnix: number;
  endUnix: number;
  label: string; // e.g. "Nov 16–30, 2026"
  half: 1 | 2;
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function lastDayOfMonth(year: number, monthIdx: number): number {
  return new Date(Date.UTC(year, monthIdx + 1, 0)).getUTCDate();
}

export function periodWindow(ref: Date = new Date()): PeriodWindow {
  const year = ref.getUTCFullYear();
  const monthIdx = ref.getUTCMonth();
  const day = ref.getUTCDate();
  const half: 1 | 2 = day <= 15 ? 1 : 2;

  const startDay = half === 1 ? 1 : 16;
  const endDay = half === 1 ? 15 : lastDayOfMonth(year, monthIdx);

  const periodStart = `${year}-${pad(monthIdx + 1)}-${pad(startDay)}`;
  const periodEnd = `${year}-${pad(monthIdx + 1)}-${pad(endDay)}`;

  const start = new Date(Date.UTC(year, monthIdx, startDay, 0, 0, 0, 0));
  const end = new Date(Date.UTC(year, monthIdx, endDay, 23, 59, 59, 999));

  return {
    periodKey: `${year}-${pad(monthIdx + 1)}-H${half}`,
    periodStart,
    periodEnd,
    startUnix: Math.floor(start.getTime() / 1000),
    endUnix: Math.floor(end.getTime() / 1000),
    label: `${MONTHS[monthIdx]} ${startDay}–${endDay}, ${year}`,
    half,
  };
}

/** Build a window from an explicit period-start date (1st or 16th). */
export function periodWindowFromStart(startDate: string): PeriodWindow {
  return periodWindow(new Date(`${startDate}T12:00:00Z`));
}
