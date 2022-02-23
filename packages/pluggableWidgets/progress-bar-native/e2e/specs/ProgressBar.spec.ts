import { expect, by, element } from "detox";
import { resetDevice, setText, tapMenuItem } from "../../../../../detox/src/helpers";

describe("Progress Bar", () => {
    beforeAll(async () => {
        await tapMenuItem("Progress bar");

        const textBox = element(by.id("textBoxProgressBarValue"));
        await setText(textBox, "75");
    });

    afterAll(async () => {
        await resetDevice();
    });

    it("renders the progress bar with dynamic values", async () => {
        const progressBar = element(by.id("progressBarDynamic"));
        await expect(progressBar).toBeVisible();
    });

    it("renders the progress bar with static values", async () => {
        const progressBar = element(by.id("progressBarStatic"));
        await expect(progressBar).toBeVisible();
    });

    it("does not render the progress bar with visibility set as false", async () => {
        const progressBar = element(by.id("progressBarNoVisibility"));
        await expect(progressBar).not.toBeVisible();
    });

    it("renders the progress bar with custom style as Success", async () => {
        const progressBar = element(by.id("progressBarSuccess"));
        await expect(progressBar).toBeVisible();
    });
});
