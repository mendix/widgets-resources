import { Alert } from "../../../../../detox/src/Alert";
import { expect, element, by } from "detox";
import { resetDevice, setText, tapMenuItem } from "../../../../../detox/src/helpers";

describe("Badge", () => {
    beforeAll(async () => {
        await tapMenuItem("Badge");

        const textBox = element(by.id("textBoxBadge"));
        await setText(textBox, "Detox");
    });

    afterAll(async () => {
        await resetDevice();
    });

    it("renders the normal badge", async () => {
        const badge = element(by.id("badgeNormal"));
        const badgeText = element(by.id("badgeNormal$caption"));

        await expect(badge).toBeVisible();
        await badge.tap();

        await expect(badgeText).toBeVisible();
        await expect(badgeText).toHaveText("Detox");
    });

    it("does not render the badge with visibility set as false", async () => {
        const badge = element(by.id("badgeNoVisibility"));

        await expect(badge).not.toBeVisible();
    });

    it("renders the badge with actions", async () => {
        const badge = element(by.id("badgeAction"));
        const badgeText = element(by.id("badgeAction$caption"));
        await expect(badge).toBeVisible();
        await expect(badgeText).toBeVisible();
        await expect(badgeText).toHaveText("Detox");

        await badge.tap();
        const alert = Alert();
        await expect(alert.messageElement).toHaveText("Action test: Detox");
    });
});
