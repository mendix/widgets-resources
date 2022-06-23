const ANDROID_SDK_VERSION = "30"; // Set to 30 because: https://github.com/wix/Detox/issues/3071
const ANDROID_DEVICE_TYPE = "pixel";
const IOS_SDK_VERSION = "15.5";
const IOS_DEVICE_TYPE = "iPhone 13";

module.exports = {
    ANDROID_SDK_VERSION,
    ANDROID_DEVICE_TYPE,
    IOS_SDK_VERSION,
    IOS_DEVICE_TYPE,
    "test-runner": "npx jest",
    "runner-config": `${__dirname}/jest.detox.config.js`,
    apps: {
        "ios.developerapp": {
            type: "ios.app",
            binaryPath: `${__dirname}/apps/DeveloperApp.app`
        },
        "android.developerapp": {
            type: "android.apk",
            binaryPath: `${__dirname}/apps/app-detox-debug.apk`,
            testBinaryPath: `${__dirname}/apps/app-detox-debug-androidTest.apk`
        }
    },
    devices: {
        ios: {
            type: "ios.simulator",
            device: {
                type: IOS_DEVICE_TYPE,
                os: `iOS ${IOS_SDK_VERSION}`
            }
        },
        android: {
            type: "android.emulator",
            device: {
                avdName: `NATIVE_${ANDROID_DEVICE_TYPE}_${ANDROID_SDK_VERSION}`
            }
        }
    },
    configurations: {
        "ios.simulator.developerapp": {
            device: "ios",
            app: "ios.developerapp"
        },
        "android.emulator.developerapp": {
            device: "android",
            app: "android.developerapp"
        }
    }
};
