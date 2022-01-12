import { expectToMatchScreenshot, tapMenuItem } from "../../../../../detox/src/helpers";
import { alert } from "../../../../../detox/src/Alert";

describe("Switch", () => {
    beforeAll(async () => {
        await tapMenuItem("Switch");
    });

    it("renders correctly when false", async () => {
        await expectToMatchScreenshot();
    });

    it("renders correctly when true", async () => {
        await element(by.id("switch1")).tap();
        await expectToMatchScreenshot();
    });

    it("triggers configured event", async () => {
        await element(by.id("switch2")).tap();
        expect(await alert.getMessage()).toEqual("Action has been triggered!");
    });

    // todo: NC-546 follow appdev convention, by using detox/jest setup and reload the device after each test.
    afterAll(async () => {
        await device.reloadReactNative();
    });
});
