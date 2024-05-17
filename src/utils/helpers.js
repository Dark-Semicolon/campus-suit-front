export function secondsToTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export function parseSearchParams(searchParams, key, parseFunction, defaultValue) {
  const paramValue = searchParams.get(key);
  return paramValue ? parseFunction(paramValue) : defaultValue;
}

export function convertURLParams(url) {
  const decodedURL = decodeURIComponent(url);
  const replacedURL = decodedURL.replace(/%5B/g, "[").replace(/%5D/g, "]");
  return replacedURL;
}

// input "2024-04-11T04:46:23.000000Z" // Output: "Apr 11, 2024 4:46:23 AM"
export function formatDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  // Format the date
  const formattedDate = dateTime.toLocaleDateString("ar", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  // Format the time
  const formattedTime = dateTime.toLocaleTimeString("ar", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
  });
  return { formattedDate, formattedTime };
}

//input "12345.67" // Output: "ج.م12,345.67"
export function formatCurrency(value) {
  const formatter = new Intl.NumberFormat("ar-EG", {
    style: "currency",
    currency: "EGP",
    // minimumFractionDigits: 0,
  });
  return formatter.format(value);
}
