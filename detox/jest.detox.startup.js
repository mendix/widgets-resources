const { by, cleanup, init, device, element, waitFor } = require("detox");
const adapter = require("detox/runners/jest/adapter");
const specReporter = require("detox/runners/jest/specReporter");
const config = require("./detox.config");
const { toMatchImageSnapshot } = require("jest-image-snapshot");
const path = require("path");

jest.setTimeout(300000);
jasmine.getEnv().addReporter(adapter);
jasmine.getEnv().addReporter(specReporter);

expect.extend({
    toMatchImageSnapshot(screenshot, options = {}) {
        const { currentTestName } = this;
        const platform = device.getPlatform();
        const customSnapshotsDir = path.join(path.resolve("./"), "image-snapshots", platform);
        const customDiffDir = path.join(path.resolve("./"), "image-snapshots/results", platform);

        return toMatchImageSnapshot.call(this, screenshot, {
            customDiffConfig: { threshold: 0.15 },
            customDiffDir,
            customSnapshotsDir,
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
        permissions: { faceid: "YES", location: "inuse", camera: "YES", photos: "YES" }
    });

    if (device.getPlatform() === "ios") {
        await prepDeveloperApp("localhost", 8080);
    }
    await waitFor(element(by.id("$screen")).atIndex(0))
        .toBeVisible()
        .withTimeout(20000);
}, 120000);

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
