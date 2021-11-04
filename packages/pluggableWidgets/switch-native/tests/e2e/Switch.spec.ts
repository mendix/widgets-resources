import { expect, device, waitFor, element, by } from "detox";
import { Widget, expectToMatchImageSnapshot, Alert } from "../../../../../tests/e2e";

describe("Switch", () => {
    beforeAll(async () => {
        await waitFor(element(by.id("SwitchWidgetHome")))
            .toBeVisible()
            .whileElement(by.id("scrollContainer1"))
            .scroll(200, "down");

        await Widget("SwitchWidgetHome").getElement().tap();
    });

    it("renders correctly when false", async () => {
        await expectToMatchImageSnapshot({
            ios: { removeScrollbar: true },
            android: { removeScrollbar: true }
        });
    });

    it("renders correctly when true", async () => {
        await Widget("switch1").getElement().tap();
        await expectToMatchImageSnapshot({
            ios: { removeScrollbar: true },
            android: { removeScrollbar: true }
        });
    });

    it("triggers configured event", async () => {
        await Widget("switch2").getElement().tap();
        await expect(Alert().getMessage("Action has been triggered!")).toBeVisible();
    });

    // todo: NC-546 follow appdev convention, by using detox/jest setup and reload the device after each test.
    afterAll(async () => {
        await device.reloadReactNative();
    });
});
