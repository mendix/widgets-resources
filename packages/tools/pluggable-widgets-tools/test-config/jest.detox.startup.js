const { by, cleanup, init, device, element } = require("detox");
const adapter = require("detox/runners/jest/adapter");
const specReporter = require("detox/runners/jest/specReporter");
const config = require("./detox.config");

jest.setTimeout(300000);
jasmine.getEnv().addReporter(adapter);
jasmine.getEnv().addReporter(specReporter);

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

    // TODO: port is dynamic because its coming from runtime
    await element(by.type("UITextField")).typeText("localhost:8080");
    await device.setURLBlacklist(["http://localhost:8080/components.json"]);
    await element(by.type("UIButton"))
        .atIndex(0)
        .tap();
    await device.setURLBlacklist([]);
}, 120000);

beforeEach(async () => {
    await adapter.beforeEach();
});

afterAll(async () => {
    await adapter.afterAll();
    await cleanup();
});
