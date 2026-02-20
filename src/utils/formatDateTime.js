export const formatDateTime = (dateString, options = {}) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  const defaultOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    ...options,
  };

  return date.toLocaleString("en-US", defaultOptions);
};
