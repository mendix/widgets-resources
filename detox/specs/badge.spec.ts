import { by, device, element, expect, waitFor } from "detox";
import { Alert, Badge, Pages } from "./elements";

describe("Badge", () => {
    beforeAll(async () => {
        await Pages().openBadge();

        const textbox = await element(by.id("textBoxBadge"));
        await waitFor(textbox)
            .toBeVisible()
            .withTimeout(20000);
        await textbox.tap();
        await textbox.clearText();
        await textbox.typeText("Detox");
    });

    it("should render normal badge", async () => {
        const badge = Badge("badgeNormal");
        await expect(badge.getBadge()).toBeVisible();
        await badge.getBadge().tap();

        await expect(badge.getCaption()).toBeVisible();
        await expect(badge.getCaption()).toHaveText("Detox");
    });

    it("should render a badge with actions", async () => {
        const text = await element(by.id("actionLabel"));
        const badge = Badge("badgeAction");
        await expect(badge.getBadge()).toBeVisible();
        await text.tap();

        await expect(badge.getCaption()).toBeVisible();
        await expect(badge.getCaption()).toHaveText("Detox");

        await badge.getBadge().tap();
        await expect(Alert().getMessage("Action test: Detox")).toBeVisible();
        await Alert().confirm();
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
