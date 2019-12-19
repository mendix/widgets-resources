const { by, cleanup, init, device, element, waitFor } = require("detox");
const adapter = require("detox/runners/jest/adapter");
const specReporter = require("detox/runners/jest/specReporter");
const config = require("./package.json").detox;

// Set the default timeout
jest.setTimeout(120000);
jasmine.getEnv().addReporter(adapter);

// This takes care of generating status logs on a per-spec basis. By default, jest only reports at file-level.
// This is strictly optional.
jasmine.getEnv().addReporter(specReporter);

beforeAll(async () => {
    await init(config, { initGlobals: false, launchApp: false });
    await device.launchApp({ newInstance: true, launchArgs: { detoxPrintBusyIdleResources: "YES" } });
}, 120000);

beforeEach(async () => {
    await waitFor(element(by.id("NativeHome.Widgets")))
        .toBeVisible()
        .withTimeout(120000);
    await adapter.beforeEach();
});

afterAll(async () => {
    await adapter.afterAll();
    await cleanup();
});
