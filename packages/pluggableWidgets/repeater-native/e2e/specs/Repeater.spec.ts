import { device, waitFor, element, by } from "detox";
import { Widget, expectToMatchImageSnapshot } from "../../../../../tests/e2e";

describe("Repeater", () => {
    beforeAll(async () => {
        await waitFor(element(by.id("RepeaterWidgetHome")))
            .toBeVisible()
            .whileElement(by.id("scrollContainer1"))
            .scroll(200, "down");

        await Widget("RepeaterWidgetHome").getElement().tap();
    });

    it("renders the default repeater", async () => {
        await expectToMatchImageSnapshot();
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
