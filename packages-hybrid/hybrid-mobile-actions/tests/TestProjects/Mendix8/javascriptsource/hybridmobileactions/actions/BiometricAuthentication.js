"use strict";
// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the code between BEGIN USER CODE and END USER CODE
// Other code you write will be lost the next time you deploy the project.
import { Big } from "big.js";

// BEGIN EXTRA CODE
// END EXTRA CODE

/**
 * Returns true when authenticated.
 * @param {string} reason - The reason for requesting authentication. If empty, the system default message is used.
 * @returns {Promise.<boolean>}
 */
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
function BiometricAuthentication(reason) {
    // BEGIN USER CODE
    // Docs Android: https://github.com/mjwheatley/cordova-plugin-android-fingerprint-auth
    // Docs iOS: https://github.com/EddyVerbruggen/cordova-plugin-touch-id
    return new Promise((resolve, reject) => {
        if (!window.device) {
            throw new Error("BiometricAuthentication action requires cordova-plugin-device to be installed in the app");
        }
        if (window.device.platform === "iOS") {
            if (window.plugins && window.plugins.touchid) {
                window.plugins.touchid.verifyFingerprint(
                    reason,
                    () => {
                        resolve(true);
                    },
                    () => {
                        resolve(false);
                    }
                );
            } else {
                reject(
                    new Error(
                        "BiometricAuthentication action requires cordova-plugin-touch-id to be installed in the iOS app"
                    )
                );
            }
        } else if (window.device.platform === "Android") {
            if (window.FingerprintAuth) {
                const encryptConfig = {
                    clientId: "mxApp",
                    username: "",
                    password: "",
                    maxAttempts: 3,
                    encryptNoAuth: false,
                    dialogTitle: reason
                };
                window.FingerprintAuth.encrypt(
                    encryptConfig,
                    () => {
                        resolve(true);
                    },
                    () => {
                        resolve(false);
                    }
                );
            } else {
                reject(
                    new Error(
                        "BiometricAuthentication action requires cordova-plugin-android-fingerprint-auth to be installed in the Android app"
                    )
                );
            }
        }
    });
    // END USER CODE
}
