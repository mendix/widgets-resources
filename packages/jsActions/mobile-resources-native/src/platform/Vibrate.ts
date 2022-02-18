import { Big } from "big.js";
import { Vibration } from "react-native";

/**
 * @param {Big} duration - Android only setting. The time (in milliseconds) the device should vibrate. Set to empty to use the default value 500.
 * @returns {Promise.<void>}
 */
export async function Vibrate(duration?: Big): Promise<void> {
    // BEGIN USER CODE
    // Documentation https://facebook.github.io/react-native/docs/vibration#vibrate

    const pattern = duration ? Number(duration) : 500;

    Vibration.vibrate(pattern, false);
    return Promise.resolve();

    // END USER CODE
}
