export function getFormattedDate(date: Date) {
  if (date.toISOString) {
    return date?.toISOString().slice(0, 10);
  }
}

export function getDateMinusDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}


export function parseDateString(dateStr: string) {
  const [day, month, year] = dateStr.split("/").map(Number);

  if (
    !day || !month || !year ||
    day < 1 || day > 31 ||
    month < 1 || month > 12 ||
    year < 1000
  ) {
    throw new Error("Invalid date string format. Expected 'DD/MM/YYYY'.");
  }

  return new Date(year, month - 1, day); // JS months are 0-indexed
}




