const { by, cleanup, init, device, element, waitFor } = require("detox");
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
    await init(config, { initGlobals: false, launchApp: false });

    await device.launchApp({
        newInstance: true,
        launchArgs: {
            detoxPrintBusyIdleResources: "YES",
            // Notifications
            detoxURLBlacklistRegex: ".*firestore.*"
        },
        // JS actions
        permissions: { faceid: "YES", location: "inuse", camera: "YES", photos: "YES", notifications: "YES" }
    });
    await setDemoMode();

    if (device.getPlatform() === "ios") {
        await prepDeveloperApp("localhost", 8080);
    }
    await waitFor(element(by.id("$screen")).atIndex(0))
        .toBeVisible()
        .withTimeout(180000);
}, 360000);

beforeEach(async () => {
    await adapter.beforeEach();
});

afterAll(async () => {
    await adapter.afterAll();
    await cleanup();
});

/**
 * Bypasses the welcome screen and loads into the project on MiN apps.
 * Works for iOS. Detox does not support hybrid Android apps for now.
 */
async function prepDeveloperApp(url, port) {
    await element(by.id("btn_welcome_skip")).tap();
    await element(by.id("text_input_runtime_url")).typeText(`${url}:${port}`);
    // TODO: Investigate why the request is pending.
    await device.setURLBlacklist([`http://${url}:${port}/components.json`]);
    await element(by.id("text_input_runtime_url")).tapReturnKey();
    await device.setURLBlacklist([]);
}

async function setDemoMode() {
    if (device.getPlatform() === "ios") {
        const type = device.name.substring(device.name.indexOf("(") + 1, device.name.lastIndexOf(")"));
        execSync(
            `xcrun simctl status_bar "${type}" override --time "12:00" --batteryState charged --batteryLevel 100 --wifiBars 3 --cellularMode active --cellularBars 4`
        );
    } else {
        const id = device.id;
        // enter demo mode
        execSync(`adb -s ${id} shell settings put global sysui_demo_allowed 1`);
        // display time 12:00
        execSync(`adb -s ${id} shell am broadcast -a com.android.systemui.demo -e command clock -e hhmm 1200`);
        // Display full mobile data with 4g type and no wifi
        execSync(
            `adb -s ${id} shell am broadcast -a com.android.systemui.demo -e command network -e mobile show -e level 4 -e datatype 4g -e wifi false`
        );
        // Hide notifications
        execSync(
            `adb -s ${id} shell am broadcast -a com.android.systemui.demo -e command notifications -e visible false`
        );
        // Show full battery but not in charging state
        execSync(
            `adb -s ${id} shell am broadcast -a com.android.systemui.demo -e command battery -e plugged false -e level 100`
        );
    }
}
