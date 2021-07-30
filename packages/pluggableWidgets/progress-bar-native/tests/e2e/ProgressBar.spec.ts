import { device, expect, waitFor } from "detox";
import { Widget } from "../../../../../tests/e2e/helpers-native";

describe("Progress Bar", () => {
    beforeAll(async () => {
        const progressBarWidget = Widget("btnProgressBar").getElement();
        await progressBarWidget.tap();

        const textBox = Widget("textBoxProgressBarValue").getElement();
        await waitFor(textBox).toBeVisible().withTimeout(10000);
        await textBox.tap();
        await textBox.clearText();
        await textBox.typeText("75");
    });

    it("renders the progress bar with dynamic values", async () => {
        const progressBarId = Widget("progressBarDynamic");
        const progressBar = progressBarId.getElement();

        await expect(progressBar).toBeVisible();
        await progressBar.tap();
    });

    it("renders the progress bar with static values", async () => {
        const progressBarId = Widget("progressBarStatic");
        const progressBar = progressBarId.getElement();

        await expect(progressBar).toBeVisible();
        await progressBar.tap();
    });

    it("does not render the progress bar with visibility set as false", async () => {
        const progressBarId = Widget("progressBarNoVisibility");
        const progressBar = progressBarId.getElement();

        await expect(progressBar).not.toBeVisible();
    });

    it("renders the progress bar with custom style as Success", async () => {
        const progressBarId = Widget("progressBarSuccess");
        const progressBar = progressBarId.getElement();

        await expect(progressBar).toBeVisible();
        await progressBar.tap();
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
