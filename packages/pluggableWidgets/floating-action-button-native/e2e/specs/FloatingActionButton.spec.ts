import { Alert } from "../../../../../detox/src/Alert";
import { expectToMatchScreenshot, resetDevice, tapMenuItem } from "../../../../../detox/src/helpers";
import { expect, element, by } from "detox";

describe("Badge", () => {
    beforeEach(async () => {
        await tapMenuItem("Floating action button");
    });

    afterEach(async () => {
        await resetDevice();
    });

    it("renders correct initial appearance", async () => {
        await expectToMatchScreenshot();
    });

    it("renders correct appearance after toggling secondary buttons", async () => {
        await element(by.id("floatingActionButtonTopLeft")).tap();
        await element(by.id("floatingActionButtonBottomLeft")).tap();
        await element(by.id("floatingActionButtonBottomRight")).tap();
        await expectToMatchScreenshot();
    });

    it("executes configured action on primary button", async () => {
        await element(by.id("floatingActionButtonTopRight")).tap();

        const alert = Alert();
        await expect(alert.messageElement).toHaveText("Hi!");
    });

    it("executes configured action on secondary button", async () => {
        await element(by.id("floatingActionButtonTopLeft")).tap();
        await element(by.id("floatingActionButtonTopLeft$button0")).tap();

        const alert = Alert();
        await expect(alert.messageElement).toHaveText("Hi!");
    });
});
