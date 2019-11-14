/**
 * @param {Big} duration - Android only setting. The time (in milliseconds) the device should vibrate. Set to empty to use the default value 500.
 * @returns {boolean}
 */
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
function Vibrate(duration) {
    // BEGIN USER CODE
    // Requires cordova-plugin-vibration
    if (!navigator.vibrate) {
        throw new Error("Vibrate action requires cordova-plugin-vibration to be installed in the app");
    }
    navigator.vibrate(parseInt(String(duration), 10));
    return true;
    // END USER CODE
}
