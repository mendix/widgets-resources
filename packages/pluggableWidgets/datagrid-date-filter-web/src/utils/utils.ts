/**
 * Change the time of a date and return an UTC date
 * @param date
 * @param hours
 * @param minutes
 * @param seconds
 */
export function chanteTimeToMidnight(date: Date): Date {
    const newDate = new Date(date.getTime());
    newDate.setHours(0);
    newDate.setMinutes(0);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    return newDate;
}
