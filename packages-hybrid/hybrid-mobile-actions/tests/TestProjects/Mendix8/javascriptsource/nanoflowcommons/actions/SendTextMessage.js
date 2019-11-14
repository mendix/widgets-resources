// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
import { Big } from "big.js";

// BEGIN EXTRA CODE
// END EXTRA CODE

/**
 * Launches the text messaging app on your device.
 * @param {string} phoneNumber - This field is required.
 * @returns {Promise.<boolean>}
 */
export async function SendTextMessage(phoneNumber) {
    // BEGIN USER CODE
    if (!phoneNumber) {
        throw new TypeError("Input parameter 'Phone number' is required");
    }
    var url = "sms:".concat(encodeURI(phoneNumber));
    // Native platform
    if (navigator && navigator.product === "ReactNative") {
        var Linking = require("react-native").Linking;
        return Linking.canOpenURL(url).then(function(supported) {
            if (!supported) {
                return false;
            }
            return Linking.openURL(url).then(function() {
                return true;
            });
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
