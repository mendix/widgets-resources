import { expectToMatchScreenshot, resetDevice, tapMenuItem } from "../../../../../detox/src/helpers";
import { element, by, waitFor, expect } from "detox";
import { Alert } from "../../../../../detox/src/Alert";

describe("Image", () => {
    beforeEach(async () => {
        await tapMenuItem("Image");
    });

    afterEach(async () => {
        await resetDevice();
    });

    it("renders the static image", async () => {
        const btnImageStatic = element(by.text("Image static"));
        await btnImageStatic.tap();

        await expectToMatchScreenshot();
    });

    it("renders the dynamic image", async () => {
        const btnImageDynamic = element(by.text("Image dynamic"));
        await btnImageDynamic.tap();

        const dynamicImage = element(by.id("dynamicImageText"));
        await waitFor(dynamicImage).toBeVisible().withTimeout(2000);

        await expectToMatchScreenshot();
    });

    it("renders the image with icon", async () => {
        const btnImageIcon = element(by.text("Image icon"));
        await btnImageIcon.tap();

        await expectToMatchScreenshot();
    });

    it("renders the image with URL", async () => {
        const btnImageUrl = element(by.text("Image url"));
        await btnImageUrl.tap();

        await expectToMatchScreenshot();

        const clickableImage = element(by.id("clickableImage$ImageSmallPressable"));
        await clickableImage.tap();

        const alert = Alert();
        await expect(alert.messageElement).toHaveText("Image clicked!");
    });
});
