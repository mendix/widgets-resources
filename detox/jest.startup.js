const { by, cleanup, init, device, element, waitFor } = require("detox");
const adapter = require("detox/runners/jest/adapter");
const specReporter = require("detox/runners/jest/specReporter");
const config = require("./package.json").detox;

jest.setTimeout(300000);
jasmine.getEnv().addReporter(adapter);
jasmine.getEnv().addReporter(specReporter);

beforeAll(async () => {
    await init(config, { initGlobals: false, launchApp: false });
    await device.launchApp({
        newInstance: false,
        launchArgs: {
            detoxPrintBusyIdleResources: "YES",
            detoxURLBlacklistRegex: ".*firestore.*"
        },
        permissions: { faceid: "YES", location: "inuse", camera: "YES", photos: "YES", notifications: "YES" }
    });
    if (device.getPlatform() === "ios") {
        await device.setBiometricEnrollment(true);
    }
    await waitFor(element(by.id("NativeHome.Widgets")))
        .toBeVisible()
        .withTimeout(120000);
}, 120000);

beforeEach(async () => {
    await adapter.beforeEach();
});

afterAll(async () => {
    await adapter.afterAll();
    await cleanup();
});
