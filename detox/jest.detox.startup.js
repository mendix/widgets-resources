const { cleanup, init, device } = require("detox");
const adapter = require("detox/runners/jest/adapter");
const specReporter = require("detox/runners/jest/specReporter");
const config = require("./detox.config");
const { toMatchImageSnapshot } = require("jest-image-snapshot");
const { join, resolve } = require("path");
const { execSync } = require("child_process");

jest.setTimeout(300000);
jasmine.getEnv().addReporter(adapter);
jasmine.getEnv().addReporter(specReporter);

expect.extend({
    toMatchImageSnapshot(screenshot, options = {}) {
        const { currentTestName } = this;
        const platform = device.getPlatform();
        let type;
        let sdk;
        if (platform === "ios") {
            type = config.IOS_DEVICE_TYPE;
            sdk = config.IOS_SDK_VERSION;
        } else {
            type = config.ANDROID_DEVICE_TYPE;
            sdk = config.ANDROID_SDK_VERSION;
        }
        const customSnapshotsDir = join(resolve("./"), "e2e", "images", "expected", platform, sdk, type);
        const customDiffDir = join(resolve("./"), "e2e", "images", "diffs", platform, sdk, type);
        const customReceivedDir = join(resolve("./"), "e2e", "images", "actual", platform, sdk, type);

        return toMatchImageSnapshot.call(this, screenshot, {
            customDiffConfig: { threshold: 0.15 },
            customDiffDir,
            customSnapshotsDir,
            customReceivedDir,
            storeReceivedOnFailure: true,
            failureThreshold: 10,
            failureThresholdType: "pixel",
            customSnapshotIdentifier: ({ counter }) => `${currentTestName} ${counter}`,
            ...options
        });
    }
});

beforeAll(async () => {
    await init();

    if (device.getPlatform() === "android") {
        const id = device.id;
        execSync(`adb -s ${id} shell setprop debug.hwui.renderer skiag`);
        execSync(`adb -s ${id} reverse tcp:8080 tcp:8080`);
    }
}, 1800000);

beforeEach(async () => {
    await adapter.beforeEach();
});

afterAll(async () => {
    await adapter.afterAll();
    await cleanup();
});
