import { expect } from "detox";
import { expectToMatchScreenshot, tapMenuItem } from "../../../../../detox/src/helpers";

describe("Progress Circle", () => {
    const percentage = "75";

    beforeAll(async () => {
        await tapMenuItem("Progress circle");

        const textBox = element(by.id("textBoxProgressCircleValue"));
        await textBox.clearText();
        await textBox.typeText("75\n");
    });

    it("renders the progress circle with text as percentage", async () => {
        const progressCircle = element(by.id("progressCirclePercentageText"));

        await expect(progressCircle).toBeVisible();
        await expect(progressCircle).toHaveText(`${percentage}%`);
    });

    it("renders the progress circle with text as custom", async () => {
        const progressCircle = element(by.id("progressCircleCustomText"));

        await expect(progressCircle).toBeVisible();
        await expect(progressCircle).toHaveText(`${percentage}/100`);
    });

    it("renders progress circle with text as none", async () => {
        const progressCircle = element(by.id("progressCircleNoText"));

        await expect(progressCircle).toBeVisible();
        await expect(progressCircle).toHaveText("");
    });

    it("does not render progress circle with visibility set as false", async () => {
        const progressCircle = element(by.id("progressCircleNoVisibility"));

        await expect(progressCircle).not.toBeVisible();
    });

    it("renders progress circle with custom style as Success", async () => {
        const progressCircleContainer = element(by.id("progressCircleContainer"));

        expectToMatchScreenshot(progressCircleContainer);
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
