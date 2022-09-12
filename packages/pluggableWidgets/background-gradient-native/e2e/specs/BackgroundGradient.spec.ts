import { expect, element, by } from "detox";
import { Alert } from "../../../../../detox/src/Alert";
import { expectToMatchScreenshot, launchApp, sessionLogout, tapMenuItem } from "../../../../../detox/src/helpers";

describe("Background Gradient", () => {
    beforeEach(async () => {
        await launchApp();
        await tapMenuItem("Background gradient");
    });

    afterEach(async () => {
        await sessionLogout();
    });

    it("should render one color", async () => {
        await expectToMatchScreenshot(element(by.id("bgGradientOneColor")));
    });

    it("should render more than one color", async () => {
        const backgroundGradientWidget = "bgGradientTwoColors";
        await expectToMatchScreenshot(element(by.id(backgroundGradientWidget)));
        await element(by.id(backgroundGradientWidget)).tap();
        const alert = Alert();
        await expect(alert.messageElement).toHaveText("Clicked!");
        await alert.confirm();
    });
});
