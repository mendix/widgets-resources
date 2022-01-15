import { device } from "detox";
import { expectToMatchScreenshot, tapMenuItem } from "../../../../../detox/src/helpers";

describe("Repeater", () => {
    beforeAll(async () => {
        await tapMenuItem("Repeater");
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });

    it("renders the default repeater", async () => {
        await expectToMatchScreenshot();
    });
});
