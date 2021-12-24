import { device, expect, waitFor } from "detox";
import { Widget } from "../../../../../tests/e2e";

describe("Progress Circle", () => {
    beforeAll(async () => {
        const progressCircleWidget = Widget("btnProgressCircle").getElement();
        await progressCircleWidget.tap();

        const textBox = Widget("textBoxProgressCircleValue").getElement();
        await waitFor(textBox).toBeVisible().withTimeout(10000);
        await textBox.tap();
        await textBox.clearText();
        await textBox.typeText("75");
    });

    it("renders the progress circle with text as percentage", async () => {
        const percentageText = "75%";
        const progressCircleId = Widget("progressCirclePercentageText");
        const progressCircle = progressCircleId.getElement();
        const progressCircleText = progressCircleId.getText(percentageText);

        await expect(progressCircle).toBeVisible();
        await progressCircle.tap();

        await expect(progressCircleText).toBeVisible();
        await expect(progressCircleText).toHaveText(percentageText);
    });

    it("renders the progress circle with text as custom", async () => {
        const customText = "75/100";
        const progressCircleId = Widget("progressCircleCustomText");
        const progressCircle = progressCircleId.getElement();
        const progressCircleText = progressCircleId.getText(customText);

        await expect(progressCircle).toBeVisible();
        await progressCircle.tap();

        await expect(progressCircleText).toBeVisible();
        await expect(progressCircleText).toHaveText(customText);
    });

    // TODO: NC-456 Once detox releases the method to assert empty string
    /*    it("renders progress circle with text as none", async () => {
        const progressCircleId = Widget("progressCircleNoText");
        const progressCircle = progressCircleId.getElement();
        const progressCircleText = progressCircleId.getText("");

        await expect(progressCircle).toBeVisible();
        await progressCircle.tap();

        await expect(progressCircleText).toHaveText("");
    });*/

    it("does not render progress circle with visibility set as false", async () => {
        const progressCircleId = Widget("progressCircleNoVisibility");
        const progressCircle = progressCircleId.getElement();

        await expect(progressCircle).not.toBeVisible();
    });

    it("renders progress circle with custom style as Success", async () => {
        const progressCircleId = Widget("progressCircleSuccess");
        const progressCircle = progressCircleId.getElement();

        await expect(progressCircle).toBeVisible();
        await progressCircle.tap();
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
