module.exports = {
    "test-runner": "jest",
    "runner-config": `${__dirname}/jest.detox.config.js`,
    apps: {
        "ios.developerapp": {
            type: "ios.app",
            binaryPath: process.env.TEST_NATIVE_APP_IOS
        },
        "android.developerapp": {
            type: "android.apk",
            binaryPath: process.env.TEST_NATIVE_APP_ANDROID,
            testBinaryPath: process.env.TEST_NATIVE_APP_ANDROID_TEST_BINARY,
        },
    },
    "devices": {
        ios: {
            type: "ios.simulator",
            device: {
                type: "iPhone 12 Pro Max"
            }
        },
        android: {
            type: "android.emulator",
            device: {
                "avdName": "Nexus_6P_API_28"
            }
        },
    },
    configurations: {
        "ios.simulator.developerapp": {
            device: "ios",
            app: "ios.developerapp"
        },
        "android.emulator.developerapp": {
            device: "android",
            app: "android.developerapp"
        },
    }
};
