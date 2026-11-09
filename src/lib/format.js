// Turns a date from the server into text like "March 5, 2026".
// Pass "short" to get "Mar 5, 2026" (used in tables).
export function formatDate(value, month = "long") {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month,
    day: "numeric",
  });
}