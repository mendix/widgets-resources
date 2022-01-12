import { alert } from "../../../../../detox/src/Alert";
import { expectToMatchScreenshot, tapBottomBarItem, tapMenuItem } from "../../../../../detox/src/helpers";
import { expect } from "detox";

describe("Badge", () => {
    beforeEach(async () => {
        await tapBottomBarItem("Widgets");
        await tapMenuItem("Floating action button");
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

        await expect(alert.messageElement).toHaveText("Hi!");
        await alert.confirm();
    });

    it("executes configured action on secondary button", async () => {
        element(by.id("floatingActionButtonTopLeft")).tap();
        element(by.id("floatingActionButtonTopLeft$button0")).tap();

        await expect(alert.messageElement).toHaveText("Hi!");
        await alert.confirm();
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
