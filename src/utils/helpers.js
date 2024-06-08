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
    const formattedDate = dateTime.toLocaleDateString("en", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    });
    // Format the time
    const formattedTime = dateTime.toLocaleTimeString("en", {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        // second: "2-digit",
    });
    return { formattedDate, formattedTime };
}

//input "12345.67" // Output: "ج.م12,345.67"
export function formatCurrency(value) {
    const formatter = new Intl.NumberFormat("en-EG", {
        style: "currency",
        currency: "EGP",
        // minimumFractionDigits: 0,
    });
    return formatter.format(value);
}

//Remove Empty Values From Object
export function removeEmptyValues(obj) {
    return Object.fromEntries(
        Object.entries(obj).filter(([, value]) => value != null && value !== "")
    );
}

/**
 * The function `convertGpaToLetterGrade` takes a GPA as input and returns the corresponding letter
 * grade based on a predefined scale.
 * @param gpa - The function `convertGpaToLetterGrade` takes a GPA (Grade Point Average) as input and
 * converts it to a corresponding letter grade based on the GPA scale. The GPA is the parameter that
 * you need to provide when calling this function. The function will then return the letter grade
 * corresponding to the
 * @returns The function `convertGpaToLetterGrade` takes a GPA value as input and returns the
 * corresponding letter grade based on the GPA scale.
 */
export function convertGpaToLetterGrade(gpa) {
    if (gpa >= 4.0) return "A+";
    if (gpa >= 3.7) return "A";
    if (gpa >= 3.3) return "A-";
    if (gpa >= 3.0) return "B+";
    if (gpa >= 2.7) return "B";
    if (gpa >= 2.3) return "B-";
    if (gpa >= 2.0) return "C+";
    if (gpa >= 1.7) return "C";
    if (gpa >= 1.3) return "C-";
    if (gpa >= 1.0) return "D+";
    if (gpa >= 0.7) return "D";
    if (gpa >= 0.0) return "D-";
    return "F";
}
