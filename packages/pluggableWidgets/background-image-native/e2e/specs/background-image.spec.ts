import { expectToMatchScreenshot, tapBottomBarItem, tapMenuItem } from "../../../../../detox/src/helpers";
import { alert } from "../../../../../detox/src/Alert";
import { expect } from "detox";

describe("Background image", () => {
    beforeEach(async () => {
        await tapBottomBarItem("Actions");
        await tapMenuItem("Background image");
    });

    it("renders the static images", async () => {
        const btnStaticImages = element(by.id("btnStaticImages"));
        await btnStaticImages.tap();

        await expectToMatchScreenshot();
    });

    it("renders the static svg images", async () => {
        const btnStaticSvgImages = element(by.id("btnStaticSvgImages"));
        await btnStaticSvgImages.tap();

        await expectToMatchScreenshot();
    });

    it("renders the dynamic image", async () => {
        const btnDynamicImage = element(by.id("btnDynamicImage"));
        await btnDynamicImage.tap();

        const dynamicImage = element(by.id("dynamicImageText"));
        await waitFor(dynamicImage).toBeVisible().withTimeout(2000);

        await expectToMatchScreenshot();
    });

    it("renders the dynamic svg image", async () => {
        const btnDynamicSvgImage = element(by.id("btnDynamicSvgImage"));
        await btnDynamicSvgImage.tap();

        const dynamicImage = element(by.id("dynamicSvgImageText"));
        await waitFor(dynamicImage).toBeVisible().withTimeout(2000);

        await expectToMatchScreenshot();
    });

    it("renders the dynamic image with conditional visibility", async () => {
        const btnConditionalBgImage = element(by.id("btnConditionalBgImage"));
        await btnConditionalBgImage.tap();

        const checkboxImage = element(by.id("checkboxImage"));
        await checkboxImage.tap();

        await expectToMatchScreenshot();
    });

    it("renders the background image with clickable container", async () => {
        const btnConditionalBgImage = element(by.id("btnClickableBgImage"));
        await btnConditionalBgImage.tap();

        const clickableContainer = element(by.id("clickableContainer"));
        await clickableContainer.tap();

        await expect(alert.messageElement).toHaveText("Container clicked!");
        await alert.confirm();

        await expectToMatchScreenshot();
    });

    it("renders the nested background image", async () => {
        const btnConditionalBgImage = element(by.id("btnNestedBgImage"));
        await btnConditionalBgImage.tap();

        await expectToMatchScreenshot();
    });

    it("renders the background image in a layout grid", async () => {
        const btnConditionalBgImage = element(by.id("btnLayoutGridBgImage"));
        await btnConditionalBgImage.tap();

        await expectToMatchScreenshot();
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
