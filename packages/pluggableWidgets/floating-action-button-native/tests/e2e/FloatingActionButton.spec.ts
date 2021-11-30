import { device, expect } from "detox";
import { Widget, Alert, expectToMatchImageSnapshot, NativeHomePage } from "../../../../../tests/e2e";

describe("Badge", () => {
    beforeEach(async () => {
        await NativeHomePage().goToWidgetsHomePage();
        const button = Widget("btnFloatingActionButton").getElement();
        await button.tap();
    });

    it("renders correct initial appearance", async () => {
        await expectToMatchImageSnapshot();
    });

    it("renders correct appearance after toggling secondary buttons", async () => {
        await Widget("floatingActionButtonTopLeft").getElement().tap();
        await Widget("floatingActionButtonBottomLeft").getElement().tap();
        await Widget("floatingActionButtonBottomRight").getElement().tap();
        await expectToMatchImageSnapshot();
    });

    it("executes configured action on primary button", async () => {
        const button = Widget("floatingActionButtonTopRight").getElement();
        await button.tap();

        await expect(Alert().getMessage("Hi!")).toBeVisible();
        await Alert().confirm();
    });

    it("executes configured action on secondary button", async () => {
        const primaryButton = Widget("floatingActionButtonTopLeft").getElement();
        await primaryButton.tap();
        const secondaryButton = Widget("floatingActionButtonTopLeft$button0").getElement();
        await secondaryButton.tap();

        await expect(Alert().getMessage("Hi!")).toBeVisible();
        await Alert().confirm();
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
