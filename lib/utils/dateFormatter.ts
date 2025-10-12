export function formatMonthYear(dateStr: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleString("default", { month: "long", year: "numeric" });
}

export function formatFullDate(dateStr: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
