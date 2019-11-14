// BEGIN EXTRA CODE
// END EXTRA CODE
/**
 * @param {Big} duration - Android only setting. The time (in milliseconds) the device should vibrate. Set to empty to use the default value 500.
 * @returns {Promise.<void>}
 */
export async function Vibrate(duration) {
    // BEGIN USER CODE
    // Requires cordova-plugin-vibration
    if (!navigator.vibrate) {
        throw new Error("Vibrate action requires cordova-plugin-vibration to be installed in the app");
    }
    navigator.vibrate(parseInt(String(duration), 10));
    return Promise.resolve();
    // END USER CODE
}
