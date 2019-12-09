// This file was generated by Mendix Modeler.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the code between BEGIN USER CODE and END USER CODE
// Other code you write will be lost the next time you deploy the project.

import DeviceInfo from "react-native-device-info";

/**
 * @returns {Promise.<MxObject>}
 */
export async function GetDeviceInfo(): Promise<mendix.lib.MxObject> {
    // BEGIN USER CODE

    return Promise.all([createMxObject("NativeMobileActions.DeviceInfo"), DeviceInfo.getBatteryLevel()]).then(
        ([mxObject, batteryLevel]) => {
            mxObject.set("ApplicationName", DeviceInfo.getApplicationName());
            mxObject.set("BatteryLevel", new Big(batteryLevel.toFixed(2)));
            mxObject.set("Brand", DeviceInfo.getBrand());
            mxObject.set("BuildNumber", String(DeviceInfo.getBuildNumber()));
            mxObject.set("BundleId", DeviceInfo.getBundleId());
            mxObject.set("Carrier", DeviceInfo.getCarrier());
            mxObject.set("DeviceCountry", DeviceInfo.getDeviceCountry());
            mxObject.set("DeviceId", DeviceInfo.getDeviceId());
            mxObject.set("DeviceLocale", DeviceInfo.getDeviceLocale());
            mxObject.set("FontScale", new Big(DeviceInfo.getFontScale().toFixed(2)));
            mxObject.set("FreeDiskStorage", new Big(DeviceInfo.getFreeDiskStorage()));
            mxObject.set("Manufacturer", DeviceInfo.getManufacturer());
            mxObject.set("Model", DeviceInfo.getModel());
            mxObject.set("ReadableVersion", DeviceInfo.getReadableVersion());
            mxObject.set("SystemName", DeviceInfo.getSystemName());
            mxObject.set("SystemVersion", DeviceInfo.getSystemVersion());
            mxObject.set("Timezone", DeviceInfo.getTimezone());
            mxObject.set("TotalDiskCapacity", new Big(DeviceInfo.getTotalDiskCapacity()));
            mxObject.set("TotalMemory", new Big(DeviceInfo.getTotalMemory()));
            mxObject.set("UniqueId", DeviceInfo.getUniqueID());
            mxObject.set("UserAgent", DeviceInfo.getUserAgent());
            mxObject.set("Version", DeviceInfo.getVersion());
            mxObject.set("Is24Hour", DeviceInfo.is24Hour());
            mxObject.set("IsEmulator", DeviceInfo.isEmulator());
            mxObject.set("IsTablet", DeviceInfo.isTablet());
            mxObject.set("IsLandscape", DeviceInfo.isLandscape());
            mxObject.set("HasNotch", DeviceInfo.hasNotch());

            return mxObject;
        }
    );

    function createMxObject(entity: string): Promise<mendix.lib.MxObject> {
        return new Promise((resolve, reject) => {
            mx.data.create({
                entity,
                callback: mxObject => resolve(mxObject),
                error: () => reject(new Error(`Could not create '${entity}' object to store device info`))
            });
        });
    }

    // END USER CODE
}
