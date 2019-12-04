// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the code between BEGIN USER CODE and END USER CODE
// Other code you write will be lost the next time you deploy the project.

import ReactNative from "react-native";

/**
 * Opens the provided URL in the web browser.
 * @param {string} url - This field is required.
 * @returns {Promise.<boolean>}
 */
export async function OpenURL(url?: string): Promise<boolean> {
    // BEGIN USER CODE

    if (!url) {
        return Promise.reject(new TypeError("Input parameter 'Url' is required"));
    }

    // Native platform
    if (navigator && navigator.product === "ReactNative") {
        const Linking: typeof ReactNative.Linking = require("react-native").Linking;

        return Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                return false;
            }
            return Linking.openURL(url).then(() => true);
        });
    }

    // Hybrid platform
    if (window && window.cordova) {
        window.open(url, "_system");
        return Promise.resolve(true);
    }

    // Web platform
    if (window) {
        window.location.href = url;
        return Promise.resolve(true);
    }

    return Promise.resolve(false);

    // END USER CODE
}
