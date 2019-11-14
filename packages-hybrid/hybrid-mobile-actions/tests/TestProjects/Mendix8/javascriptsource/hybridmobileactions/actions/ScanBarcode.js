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
 * @returns {Promise.<string>}
 */
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
function ScanBarcode() {
    // BEGIN USER CODE
    // Documentation https://github.com/phonegap/phonegap-plugin-barcodescanner
    return new Promise((resolve, reject) => {
        if (!window.cordova || !window.cordova.plugins || !window.cordova.plugins.barcodeScanner) {
            return reject(
                new Error("ScanBarcode action requires phonegap-plugin-barcodescanner to be installed in the app")
            );
        }
        window.cordova.plugins.barcodeScanner.scan(
            result => resolve(!result.cancelled && result.text && result.text.length > 0 ? result.text : undefined),
            error => reject(error)
        );
    });
    // END USER CODE
}
