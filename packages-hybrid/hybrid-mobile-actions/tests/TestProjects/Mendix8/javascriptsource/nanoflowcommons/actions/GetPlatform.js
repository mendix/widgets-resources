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
 * Get the client platform (NanoflowCommons.Platform) where the action is running.
 * @returns {Promise.<"NanoflowCommons.Platform.Web"|"NanoflowCommons.Platform.Native_mobile"|"NanoflowCommons.Platform.Hybrid_mobile">}
 */
export async function GetPlatform() {
    // BEGIN USER CODE
    if (window && window.cordova) {
        return "Hybrid_mobile";
    } else if (navigator && navigator.product === "ReactNative") {
        return "Native_mobile";
    } else {
        return "Web";
    }
    // END USER CODE
}
