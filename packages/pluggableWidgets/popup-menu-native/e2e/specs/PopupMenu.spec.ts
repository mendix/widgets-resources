import { expect, element, by } from "detox";
import { expectToMatchScreenshot, launchApp, sessionLogout, tapMenuItem } from "../../../../../detox/src/helpers";
import { Alert } from "../../../../../detox/src/Alert";

describe("Popup menu", () => {
    beforeEach(async () => {
        await launchApp();
        await tapMenuItem("Popup menu");
    });

    afterEach(async () => {
        await sessionLogout();
    });

    it("has a basic menu with an action", async () => {
        await element(by.text("Basic")).tap();
        await expectToMatchScreenshot(element(by.id("popupMenuBasic_menu")));

        await element(by.text("Alert")).tap();
        const alert = Alert();
        await expect(alert.messageElement).toHaveText("beep boop");
    });

    it("has a custom menu with an action", async () => {
        await element(by.text("Custom")).tap();
        await expectToMatchScreenshot(element(by.id("popupMenuCustom_menu")));

        await element(by.text("Alert")).tap();
        const alert = Alert();
        await expect(alert.messageElement).toHaveText("beep boop");
    });
});
