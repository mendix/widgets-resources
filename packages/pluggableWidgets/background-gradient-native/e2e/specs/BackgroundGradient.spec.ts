import { expect, element, by } from "detox";
import { Alert } from "../../../../../detox/src/Alert";
import { expectToMatchScreenshot, resetDevice, tapMenuItem } from "../../../../../detox/src/helpers";

describe("Background Gradient", () => {
    beforeEach(async () => {
        await tapMenuItem("Background gradient");
    });

    it("should call on click when pressed", async () => {
        await expectToMatchScreenshot();
        await element(by.id("background-gradient-test")).tap();
        const alert = Alert();
        await expect(alert.messageElement).toHaveText("pressed");
        await alert.confirm();
    });

    afterEach(async () => {
        await resetDevice();
    });
});
