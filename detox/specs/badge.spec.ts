import { by, device, element, expect, waitFor } from "detox";
import { Alert, Badge, Pages } from "./elements";

describe("Badge", () => {
    beforeEach(async () => {
        await Pages().openBadge();

        const textbox = await element(by.id("textBox1"));
        await waitFor(textbox)
            .toBeVisible()
            .withTimeout(20000);
        await textbox.tap();
        await textbox.clearText();
        await textbox.typeText("Detox");
    });

    afterEach(async () => {
        await device.reloadReactNative();
    });

    it("should render normal badge", async () => {
        const badge = Badge("badge1");
        const badgeContainer = await badge.getBadge();
        await expect(badgeContainer).toBeVisible();
        await badgeContainer.tap();

        const badgeCaption = badge.getCaption();
        await expect(badgeCaption).toBeVisible();
        await expect(badgeCaption).toHaveText("Detox");
    });

    it("should render a badge with actions", async () => {
        const text = await element(by.id("text2"));
        const badge = Badge("badge4");
        const badgeContainer = await badge.getBadge();
        await expect(badgeContainer).toBeVisible();
        await text.tap();

        const badgeCaption = badge.getCaption();
        await expect(badgeCaption).toBeVisible();
        await expect(badgeCaption).toHaveText("Detox");

        await badgeContainer.tap();
        await expect(Alert().getMessage("Action test: Detox")).toBeVisible();
        await Alert().confirm();
    });
});
