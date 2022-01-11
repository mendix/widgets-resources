import { expect, device, waitFor, element, by } from "detox";
import { Widget, expectToMatchImageSnapshot, Alert } from "../../../../../tests/e2e";

describe("Radio Buttons", () => {
    beforeAll(async () => {
        await waitFor(element(by.id("RadioButtonsBtn")))
            .toBeVisible()
            .whileElement(by.id("scrollContainer1"))
            .scroll(200, "down");

        await Widget("RadioButtonsBtn").getElement().tap();
    });

    it("renders correct initial appearance", async () => {
        await expectToMatchImageSnapshot();
    });

    it("call on change when selected option changed", async () => {
        await Widget("radio-button-Option_1").getElement().tap();
        await expect(Alert().getMessage("Option_1")).toBeVisible();
        await Alert().confirm();
    });

    it("renders correctly when option changed", async () => {
        await expectToMatchImageSnapshot();
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
