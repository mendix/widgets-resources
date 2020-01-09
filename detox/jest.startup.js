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
        newInstance: true,
        launchArgs: {
            detoxPrintBusyIdleResources: "YES",
            detoxURLBlacklistRegex: ".*firestore.*"
        },
        permissions: { faceid: "YES", location: "inuse", camera: "YES", photos: "YES" }
    });
    await waitFor(element(by.id("NativeHome.Widgets")))
        .toBeVisible()
        .withTimeout(300000);
}, 300000);

beforeEach(async () => {
    await adapter.beforeEach();
});

afterAll(async () => {
    await adapter.afterAll();
    await cleanup();
});
