/**
 * Deterministic weekly date window: Monday 00:00 → Sunday 23:59 UTC (PRD §5).
 */
export interface WeekWindow {
  isoWeek: string; // e.g. "2026-W47"
  weekStart: string; // YYYY-MM-DD (Monday)
  weekEnd: string; // YYYY-MM-DD (Sunday)
  startUnix: number;
  endUnix: number;
}

export function weekWindow(ref: Date = new Date()): WeekWindow {
  const d = new Date(
    Date.UTC(ref.getUTCFullYear(), ref.getUTCMonth(), ref.getUTCDate()),
  );
  // ISO: Monday = 1 … Sunday = 7
  const day = d.getUTCDay() === 0 ? 7 : d.getUTCDay();
  const monday = new Date(d);
  monday.setUTCDate(d.getUTCDate() - (day - 1));
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);

  const start = new Date(monday);
  start.setUTCHours(0, 0, 0, 0);
  const end = new Date(sunday);
  end.setUTCHours(23, 59, 59, 999);

  return {
    isoWeek: isoWeekLabel(monday),
    weekStart: fmt(monday),
    weekEnd: fmt(sunday),
    startUnix: Math.floor(start.getTime() / 1000),
    endUnix: Math.floor(end.getTime() / 1000),
  };
}

function fmt(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function isoWeekLabel(monday: Date): string {
  const target = new Date(monday);
  const dayNr = (monday.getUTCDay() + 6) % 7;
  target.setUTCDate(target.getUTCDate() - dayNr + 3);
  const firstThursday = new Date(Date.UTC(target.getUTCFullYear(), 0, 4));
  const firstDayNr = (firstThursday.getUTCDay() + 6) % 7;
  firstThursday.setUTCDate(firstThursday.getUTCDate() - firstDayNr + 3);
  const week =
    1 +
    Math.round(
      (target.getTime() - firstThursday.getTime()) / (7 * 24 * 3600 * 1000),
    );
  return `${target.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}
