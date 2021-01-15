/**
 * Change the time of a date and return an UTC date
 * @param date
 * @param hours
 * @param minutes
 * @param seconds
 */
export function changeTimeOfDate(date: Date, hours: number, minutes: number, seconds: number): Date {
    const newDate = new Date(date.getTime());
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    newDate.setSeconds(seconds);
    return new Date(newDate.toUTCString());
}
