import { Alert } from "../../../../../wdio/src/Alert";
import { resetDevice, setText, tapMenuItem } from "../../../../../wdio/src/helpers";
import { getElementByTestId } from "../../../../../wdio/src/utils";

describe("Badge", () => {
    before(async () => {
        await tapMenuItem("Badge");

        const textBox = await getElementByTestId("textBoxBadge");
        await setText(textBox, "WDIO");
    });

    after(async () => {
        await resetDevice();
    });

    it("renders the normal badge", async () => {
        const badge = await getElementByTestId("badgeNormal");
        const badgeText = await getElementByTestId("badgeNormal$caption");

        expect(badge).toBeDisplayed();
        await badge.click();

        expect(badgeText).toBeDisplayed();
        expect(badgeText).toHaveText("WDIO");
    });

    it("does not render the badge with visibility set as false", async () => {
        const badge = await getElementByTestId("badgeNoVisibility");

        expect(badge).not.toBeDisplayed();
    });

    it("renders the badge with actions", async () => {
        const badge = await getElementByTestId("badgeAction");
        const badgeText = await getElementByTestId("badgeAction$caption");
        expect(badge).toBeDisplayed();
        expect(badgeText).toBeDisplayed();
        expect(badgeText).toHaveText("WDIO");

        await badge.click();
        const alert = Alert();
        expect(alert.messageElement).toHaveText("Action test: WDIO");
    });
});
