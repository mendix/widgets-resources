import { device, expect, waitFor } from "detox";
import { Widget } from "../../../../../tests/e2e/helpers-native/Helpers";
import { Alert } from "../../../../../tests/e2e/helpers-native/Alert";

describe("Badge", () => {
    beforeAll(async () => {
        const badgeWidgetHome = Widget("btnBadge").getElement();
        await badgeWidgetHome.tap();

        const textBox = Widget("textBoxBadge").getElement();
        await waitFor(textBox).toBeVisible().withTimeout(10000);
        await textBox.tap();
        await textBox.clearText();
        await textBox.typeText("Detox");
    });

    it("should render normal badge", async () => {
        const badgeNormal = Widget("badgeNormal");
        const badge = badgeNormal.getElement();
        const badgeText = badgeNormal.getCaption();

        await expect(badge).toBeVisible();
        await badge.tap();

        await expect(badgeText).toBeVisible();
        await expect(badgeText).toHaveText("Detox");
    });

    it("should not render badge with visibility set as false", async () => {
        const badge = Widget("badgeNoVisibility").getElement();

        await expect(badge).not.toBeVisible();
    });

    it("should render a badge with actions", async () => {
        const badgeAction = Widget("badgeAction");
        const badge = badgeAction.getElement();
        const badgeText = badgeAction.getCaption();

        await expect(badge).toBeVisible();
        await badge.tap();

        await expect(Alert().getMessage("Action test: Detox")).toBeVisible();
        await Alert().confirm();

        await expect(badgeText).toBeVisible();
        await expect(badgeText).toHaveText("Detox");
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
