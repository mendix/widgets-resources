// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the code between BEGIN USER CODE and END USER CODE
// Other code you write will be lost the next time you deploy the project.

type Platform = "Web" | "Native_mobile" | "Hybrid_mobile";

/**
 * Get the client platform (NanoflowCommons.Platform) where the action is running.
 * @returns {"NanoflowCommons.Platform.Web"|"NanoflowCommons.Platform.Native_mobile"|"NanoflowCommons.Platform.Hybrid_mobile"}
 */
export async function GetPlatform(): Promise<Platform> {
    // BEGIN USER CODE
    if (window && window.cordova) {
        return Promise.resolve("Hybrid_mobile");
    } else if (navigator && navigator.product === "ReactNative") {
        return Promise.resolve("Native_mobile");
    } else {
        return Promise.resolve("Web");
    }
    // END USER CODE
}
