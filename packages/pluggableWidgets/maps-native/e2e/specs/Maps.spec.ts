import { element, by } from "detox";
import {
    expectToMatchScreenshot,
    tapMenuItem,
    sleep,
    launchApp,
    sessionLogout
} from "../../../../../detox/src/helpers";

/**
 * Since we do not have a Google API key for testing
 * we can not run this test on an Android device.
 * It also does not seem to render any maps on iOS devices in the pipeline.
 * Locally this works fine. Disabled these tests.
 **/
// eslint-disable-next-line jest/no-disabled-tests
describe.skip("Maps widget", () => {
    beforeEach(async () => {
        await launchApp();
        await tapMenuItem("Maps");
    });

    afterEach(async () => {
        await sessionLogout();
    });

    it("should be able to render map with static markers", async () => {
        const btnStaticMarkers = element(by.id("btnStaticMarkers"));

        await btnStaticMarkers.tap();

        await sleep(10000);

        await expectToMatchScreenshot();
    });

    it("should be able to render map with dynamic markers", async () => {
        const btnDynamicMarkers = element(by.id("btnDynamicMarkers"));

        await btnDynamicMarkers.tap();

        await sleep(10000);

        await expectToMatchScreenshot();
    });
});
