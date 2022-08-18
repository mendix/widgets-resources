import { expect, element, by } from "detox";
import { expectToMatchScreenshot, launchApp, tapMenuItem } from "../../../../../detox/src/helpers";
import { Alert } from "../../../../../detox/src/Alert";

describe("Popup menu", () => {
    beforeEach(async () => {
        await launchApp();
        await tapMenuItem("Popup menu");
    });

    it("has a basic menu with an action", async () => {
        await element(by.text("Basic")).tap();
        await expectToMatchScreenshot();

        await element(by.text("Alert")).tap();
        const alert = Alert();
        await expect(alert.messageElement).toHaveText("beep boop");
    });

    it("has a custom menu with an action", async () => {
        await element(by.text("Custom")).tap();
        await expectToMatchScreenshot();

        await element(by.text("Alert")).tap();
        const alert = Alert();
        await expect(alert.messageElement).toHaveText("beep boop");
    });
});
