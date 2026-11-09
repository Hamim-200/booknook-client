export function formatDate(value, month = "long") {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month,
    day: "numeric",
  });
}