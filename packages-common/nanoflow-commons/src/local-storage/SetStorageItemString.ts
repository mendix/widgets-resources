// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the code between BEGIN USER CODE and END USER CODE
// Other code you write will be lost the next time you deploy the project.

import ReactNative from "react-native";

/**
 * @param {string} key - This field is required.
 * @param {string} value - This field is required.
 * @returns {boolean}
 */
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
function SetStorageItemString(key?: string, value?: string): Promise<boolean> {
    // BEGIN USER CODE

    if (!key) {
        throw new TypeError("Input parameter 'Key' is required");
    }

    if (!value) {
        throw new TypeError("Input parameter 'Value' is required");
    }

    return setItem(key, value).then(() => true);

    function setItem(key: string, value: string): Promise<void> {
        if (navigator && navigator.product === "ReactNative") {
            const AsyncStorage: typeof ReactNative.AsyncStorage = require("@react-native-community/async-storage")
                .default;
            return AsyncStorage.setItem(key, value);
        }

        if (window) {
            window.localStorage.setItem(key, value);
            return Promise.resolve();
        }

        throw new Error("No storage API available");
    }
    // END USER CODE
}
