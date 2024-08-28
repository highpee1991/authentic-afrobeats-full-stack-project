export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export function formatDateTime(dateTimeStr) {
  const date = new Date(dateTimeStr);

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true, // Use 12-hour time format with AM/PM
  };

  return date.toLocaleString("en-US", options);
}
