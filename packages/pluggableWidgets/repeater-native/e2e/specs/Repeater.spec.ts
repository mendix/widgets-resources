import { device } from "detox";
import { expectToMatchScreenshot, tapMenuItem } from "../../../../../detox/src/helpers";

describe("Repeater", () => {
    beforeAll(async () => {
        tapMenuItem("Repeater");
    });

    it("renders the default repeater", async () => {
        await expectToMatchScreenshot();
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
