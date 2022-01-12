import { expect } from "detox";
import { expectToMatchScreenshot, tapBottomBarItem, tapMenuItem } from "../../../../../detox/src/helpers";
import { alert } from "../../../../../detox/src/Alert";

describe("Popup menu", () => {
    beforeEach(async () => {
        await tapBottomBarItem("Actions");
        await tapMenuItem("Popup Menu");
    });

    it("has a basic menu with an action", async () => {
        await element(by.text("Basic")).tap();
        await expectToMatchScreenshot();

        await element(by.text("Alert")).tap();
        await expect(alert.messageElement).toHaveText("beep boop");
        await alert.confirm();
    });

    it("has a custom menu with an action", async () => {
        await element(by.text("Custom")).tap();
        await expectToMatchScreenshot();

        await element(by.text("Alert")).tap();
        await expect(alert.messageElement).toHaveText("beep boop");
        await alert.confirm();
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
