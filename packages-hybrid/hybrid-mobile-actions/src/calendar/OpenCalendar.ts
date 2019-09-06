// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the code between BEGIN USER CODE and END USER CODE
// Other code you write will be lost the next time you deploy the project.

/**
 * @param {Date} date - The calendar app opens at the given date. Set to empty to open today.
 * @returns {boolean}
 */
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
function OpenCalendar(date?: Date): Promise<boolean> {
    // BEGIN USER CODE
    // Documentation: https://github.com/EddyVerbruggen/Calendar-PhoneGap-Plugin
    if (!window.plugins || !window.plugins.calendar) {
        throw new Error("SaveCalendarEvent action requires cordova-plugin-calendar to be installed in the app");
    }

    window.plugins.calendar.openCalendar(
        date || new Date(),
        () => {
            // This success callback is not called at all
        },
        error => {
            throw new Error("Failed to open calendar: " + error);
        }
    );

    return Promise.resolve(true);
    // END USER CODE
}
