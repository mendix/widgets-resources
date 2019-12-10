const { by, cleanup, device, element, init, waitFor } = require("detox");
const adapter = require("detox/runners/jest/adapter");
const specReporter = require("detox/runners/jest/specReporter");
const config = require("../package.json").detox;

jest.setTimeout(20000);

jasmine.getEnv().addReporter(adapter);
jasmine.getEnv().addReporter(specReporter);

beforeAll(async () => {
    await init(config, { initGlobals: false, launchApp: false });
    await device.launchApp({ newInstance: true, launchArgs: { detoxPrintBusyIdleResources: "YES" } });
    if (device.getPlatform() === "ios") {
        await element(by.id("skipTutorial")).tap();
        await element(by.id("openApp")).tap();
        await element(by.id("appUrl")).typeText("localhost:8080");
        // TODO: Investigate why the request is pending.
        await device.setURLBlacklist(["http://localhost:8080/components.json"]);
        await element(by.id("appUrl")).tapReturnKey();
        await device.setURLBlacklist([]);
    }
}, 120000);

beforeEach(async () => {
    await waitFor(element(by.id("MyFirstModule.NativeHomePage")))
        .toBeVisible()
        .withTimeout(20000);
    await adapter.beforeEach();
}, 120000);

afterEach(async () => {
    await device.reloadReactNative();
});

afterAll(async () => {
    await adapter.afterAll();
    await cleanup();
});
