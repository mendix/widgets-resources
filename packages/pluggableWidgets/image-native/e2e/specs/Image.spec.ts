import { expectToMatchScreenshot, tapMenuItem } from "../../../../../detox/src/helpers";
import { element, by, waitFor, expect, device } from "detox";
import { Alert } from "../../../../../detox/src/Alert";

describe("Image", () => {
    beforeEach(async () => {
        await tapMenuItem("Image");
    });

    afterEach(async () => {
        await device.reloadReactNative();
    });

    it("renders the static image", async () => {
        const btnImageStatic = element(by.id("btnImageStatic"));
        await btnImageStatic.tap();

        await expectToMatchScreenshot();
    });

    it("renders the dynamic image", async () => {
        const btnImageDynamic = element(by.id("btnImageDynamic"));
        await btnImageDynamic.tap();

        const dynamicImage = element(by.id("dynamicImageText"));
        await waitFor(dynamicImage).toBeVisible().withTimeout(2000);

        await expectToMatchScreenshot();
    });

    it("renders the image with icon", async () => {
        const btnImageIcon = element(by.id("btnImageIcon"));
        await btnImageIcon.tap();

        await expectToMatchScreenshot();
    });

    it("renders the image with URL", async () => {
        const btnImageUrl = element(by.id("btnImageUrl"));
        await btnImageUrl.tap();

        await expectToMatchScreenshot();

        const clickableImage = element(by.id("clickableImage$ImageSmallPressable"));
        await clickableImage.tap();

        const alert = Alert();
        await expect(alert.messageElement).toHaveText("Image clicked!");
        await alert.confirm();
    });
});
