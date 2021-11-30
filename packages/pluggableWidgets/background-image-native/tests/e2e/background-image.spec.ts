import { expectToMatchImageSnapshot, Widget, NativeHomePage, Alert } from "../../../../../tests/e2e";
import { expect, waitFor, device } from "detox";

describe("Background image", () => {
    beforeEach(async () => {
        await NativeHomePage().goToWidgetsHomePage();

        const backgroundImagePage = Widget("btnBackgroundImage").getElement();
        await backgroundImagePage.tap();
    });

    it("renders the static images", async () => {
        const btnStaticImages = Widget("btnStaticImages").getElement();
        await btnStaticImages.tap();

        await expectToMatchImageSnapshot();
    });

    it("renders the static svg images", async () => {
        const btnStaticSvgImages = Widget("btnStaticSvgImages").getElement();
        await btnStaticSvgImages.tap();

        await expectToMatchImageSnapshot();
    });

    it("renders the dynamic image", async () => {
        const btnDynamicImage = Widget("btnDynamicImage").getElement();
        await btnDynamicImage.tap();

        const dynamicImage = Widget("dynamicImageText").getElement();
        await waitFor(dynamicImage).toBeVisible().withTimeout(2000);

        await expectToMatchImageSnapshot();
    });

    it("renders the dynamic svg image", async () => {
        const btnDynamicSvgImage = Widget("btnDynamicSvgImage").getElement();
        await btnDynamicSvgImage.tap();

        const dynamicImage = Widget("dynamicSvgImageText").getElement();
        await waitFor(dynamicImage).toBeVisible().withTimeout(2000);

        await expectToMatchImageSnapshot();
    });

    it("renders the dynamic image with conditional visibility", async () => {
        const btnConditionalBgImage = Widget("btnConditionalBgImage").getElement();
        await btnConditionalBgImage.tap();

        const checkboxImage = Widget("checkboxImage").getElement();
        await checkboxImage.tap();

        await expectToMatchImageSnapshot();
    });

    it("renders the background image with clickable container", async () => {
        const btnConditionalBgImage = Widget("btnClickableBgImage").getElement();
        await btnConditionalBgImage.tap();

        const clickableContainer = Widget("clickableContainer").getElement();
        await clickableContainer.tap();

        await expect(Alert().getMessage("Container clicked!")).toBeVisible();
        await Alert().confirm();

        await expectToMatchImageSnapshot();
    });

    it("renders the nested background image", async () => {
        const btnConditionalBgImage = Widget("btnNestedBgImage").getElement();
        await btnConditionalBgImage.tap();

        await expectToMatchImageSnapshot();
    });

    it("renders the background image in a layout grid", async () => {
        const btnConditionalBgImage = Widget("btnLayoutGridBgImage").getElement();
        await btnConditionalBgImage.tap();

        await expectToMatchImageSnapshot();
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
