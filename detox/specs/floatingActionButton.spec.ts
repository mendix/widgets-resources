import { Alert, FloatingActionButton, Pages } from "./elements";
import { device, expect } from "detox";

describe("Floating Action Button", () => {
    beforeEach(async () => {
        await Pages().openFloatingActionButton();
    });

    afterEach(async () => {
        await device.reloadReactNative();
    });

    it("should render an action button in the top left corner", async () => {
        const floatingActionButton = FloatingActionButton("floatingActionButton4");
        const button = await floatingActionButton.getMainButton();
        await expect(button).toBeVisible();
        await button.tap();

        const firstChild = await floatingActionButton.getFloatingButton(0);
        await expect(firstChild).toBeVisible();
        await firstChild.tap();

        await expect(Alert().getMessage("Hi!")).toBeVisible();
        await Alert().confirm();
    });

    it("should render an action button in the top right corner", async () => {
        const floatingActionButton = FloatingActionButton("floatingActionButton2");
        const button = await floatingActionButton.getMainButton();
        await expect(button).toBeVisible();
        await button.tap();

        const firstChild = await floatingActionButton.getFloatingButton(0);
        await expect(firstChild).toNotExist();

        await expect(Alert().getMessage("Hi!")).toBeVisible();
        await Alert().confirm();
    });

    it("should render an action button in the bottom left corner", async () => {
        const floatingActionButton = FloatingActionButton("floatingActionButton5");
        const button = await floatingActionButton.getMainButton();
        await expect(button).toBeVisible();
        await button.tap();

        const firstChild = await floatingActionButton.getFloatingButton(0);
        await expect(firstChild).toBeVisible();
        await button.tap();
        await expect(firstChild).toBeNotVisible();
    });

    it("should render an action button in the bottom center", async () => {
        const floatingActionButton = FloatingActionButton("floatingActionButton3");
        const button = await floatingActionButton.getMainButton();
        await expect(button).toBeVisible();
        await button.tap();

        const firstChild = await floatingActionButton.getFloatingButton(0);
        await expect(firstChild).toBeVisible();
        await firstChild.tap();
        await expect(firstChild).toBeNotVisible();
    });

    it("should render an action button in the bottom right corner", async () => {
        const floatingActionButton = FloatingActionButton("floatingActionButton1");
        const button = await floatingActionButton.getMainButton();
        await expect(button).toBeVisible();
        await button.tap();

        const firstChild = await floatingActionButton.getFloatingButton(0);
        await expect(firstChild).toBeVisible();
        const secondChild = await floatingActionButton.getFloatingButton(1);
        await expect(secondChild).toBeVisible();
        await secondChild.tap();
        await expect(firstChild).toBeNotVisible();
        await expect(secondChild).toBeNotVisible();
    });
});
