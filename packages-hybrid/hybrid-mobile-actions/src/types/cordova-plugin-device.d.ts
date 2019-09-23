interface Window {
    device?: CordovaDevice;
}

interface CordovaDevice {
    /** The name of the device's model or product */
    model: string;
    /** The device's operating system name */
    platform: string;
    /** The device's Universally Unique Identifier */
    uuid: string;
    /** The operating system version */
    version: string;
    /** The device's manufacturer */
    manufacturer: string;
    /** Whether the device is running on a simulator. */
    isVirtual: boolean;
}
