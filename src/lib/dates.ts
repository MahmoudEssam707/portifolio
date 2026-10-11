const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/** "Nov 2025" → months since year 0, or null if unparseable. */
export function parseMonth(value: string): number | null {
  const match = value.trim().match(/^([A-Za-z]{3})[a-z]*\.?\s+(\d{4})$/);
  if (!match) {
    return null;
  }
  const month = MONTHS.indexOf(match[1].toLowerCase());
  return month === -1 ? null : Number(match[2]) * 12 + month;
}

/** Inclusive length of a finished role: "Jul 2025"–"Aug 2025" → "2 mos". */
export function formatSpan(start: string, end: string): string | null {
  const from = parseMonth(start);
  const to = parseMonth(end);
  if (from === null || to === null || to < from) {
    return null;
  }
  const months = to - from + 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [
    years ? `${years} yr${years > 1 ? "s" : ""}` : "",
    rest ? `${rest} mo${rest > 1 ? "s" : ""}` : "",
  ];
  return parts.filter(Boolean).join(" ");
}
