module.exports = {
    "test-runner": "jest",
    "runner-config": `${__dirname}/jest.detox.config.js`,
    configurations: {
        "ios.simulator": {
            binaryPath: process.env.TEST_NATIVE_APP_IOS,
            type: "ios.simulator",
            device: {
                type: "iPhone 11 Pro Max"
            }
        },
        android: {
            binaryPath: process.env.TEST_NATIVE_APP_ANDROID,
            testBinaryPath: process.env.TEST_NATIVE_APP_ANDROID_TEST_BINARY,
            type: "android.emulator",
            device: {
                avdName: "Emulator_29"
            }
        }
    }
};
