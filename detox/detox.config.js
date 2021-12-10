module.exports = {
    "test-runner": "npx jest",
    "runner-config": `${__dirname}/jest.detox.config.js`,
    apps: {
        "ios.developerapp": {
            type: "ios.app",
            binaryPath: `${__dirname}/apps/DeveloperApp.app`
        },
        "android.developerapp": {
            type: "android.apk",
            binaryPath: `${__dirname}/apps/app-debug.apk`,
            testBinaryPath: `${__dirname}/apps/app-debug-androidTest.apk`
        }
    },
    devices: {
        ios: {
            type: "ios.simulator",
            device: {
                type: "iPhone 12 Pro Max"
            }
        },
        android: {
            type: "android.emulator",
            device: {
                avdName: "EMULATOR_API_30"
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
