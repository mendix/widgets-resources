import { device, waitFor, element, by } from "detox";
import { Widget, expectToMatchImageSnapshot } from "../../../../../tests/e2e";

describe("Repeater", () => {
    beforeAll(async () => {
        await waitFor(element(by.id("btnRepeater")))
            .toBeVisible()
            .whileElement(by.id("scrollContainer1"))
            .scroll(200, "down");

        await Widget("btnRepeater").getElement().tap();
    });

    it("renders the default repeater", async () => {
        await expectToMatchImageSnapshot();
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
