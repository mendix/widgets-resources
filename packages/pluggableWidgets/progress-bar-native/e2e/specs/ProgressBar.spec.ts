import { expect } from "detox";
import { tapMenuItem } from "../../../../../detox/src/helpers";

describe("Progress Bar", () => {
    beforeAll(async () => {
        await tapMenuItem("Progress bar");

        const textBox = element(by.id("textBoxProgressBarValue"));
        await textBox.clearText();
        await textBox.typeText("75\n");
    });

    it("renders the progress bar with dynamic values", async () => {
        const progressBar = element(by.id("progressBarDynamic"));

        expect(progressBar).toBeVisible();
        await progressBar.tap();
    });

    it("renders the progress bar with static values", async () => {
        const progressBar = element(by.id("progressBarStatic"));

        await expect(progressBar).toBeVisible();
        await progressBar.tap();
    });

    it("does not render the progress bar with visibility set as false", async () => {
        const progressBar = element(by.id("progressBarNoVisibility"));

        await expect(progressBar).not.toBeVisible();
    });

    it("renders the progress bar with custom style as Success", async () => {
        const progressBar = element(by.id("progressBarSuccess"));

        await expect(progressBar).toBeVisible();
        await progressBar.tap();
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
