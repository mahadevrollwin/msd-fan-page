export function formatDate(isoDate: string) {
  const date = new Date(isoDate.includes("T") ? isoDate : `${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
