import { expect, element, by } from "detox";
import { Alert } from "../../../../../detox/src/Alert";
import { expectToMatchScreenshot, resetDevice, tapMenuItem } from "../../../../../detox/src/helpers";

describe("Radio Buttons", () => {
    beforeEach(async () => {
        await tapMenuItem("Radio buttons");
    });

    it("should call on change when selected option changes", async () => {
        await expectToMatchScreenshot();
        await element(by.text("Option 1")).tap();
        const alert = Alert();
        await expect(alert.messageElement).toHaveText("Option_1");
        await alert.confirm();
        await expectToMatchScreenshot(element(by.id("radioButtonsVertical")));
    });

    afterEach(async () => {
        await resetDevice();
    });
});
