import { expect, element, by } from "detox";
import { Alert } from "../../../../../detox/src/Alert";
import { expectToMatchScreenshot, launchApp, sessionLogout, tapMenuItem } from "../../../../../detox/src/helpers";

describe("Radio Buttons", () => {
    beforeEach(async () => {
        await launchApp();
        await tapMenuItem("Radio buttons");
    });

    afterEach(async () => {
        await sessionLogout();
    });

    it("should call on change when selected option changes", async () => {
        await expectToMatchScreenshot();
        await element(by.text("Option 2")).tap();
        const alert = Alert();
        await expect(alert.messageElement).toHaveText("Option_2");
        await alert.confirm();
        await expectToMatchScreenshot(element(by.id("radioButtonsVertical")));
    });
});
