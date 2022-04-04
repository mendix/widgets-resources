import { expect, element, by } from "detox";
import { Alert } from "../../../../../detox/src/Alert";
import { expectToMatchScreenshot, resetDevice, tapMenuItem } from "../../../../../detox/src/helpers";

describe("Background Gradient", () => {
    beforeEach(async () => {
        await tapMenuItem("Background gradient");
    });

    it("should render one color", async () => {
        const backgroundGradientWidget = "bgGradientOneColor";
        await expectToMatchScreenshot(element(by.id(backgroundGradientWidget)));
    });

    it("should render more than one color", async () => {
        const backgroundGradientWidget = "bgGradientTwoColors";
        await expectToMatchScreenshot(element(by.id(backgroundGradientWidget)));
        await element(by.id(backgroundGradientWidget)).tap();
        const alert = Alert();
        await expect(alert.messageElement).toHaveText("Clicked!");
        await alert.confirm();
    });

    afterEach(async () => {
        await resetDevice();
    });
});
