import { Pages, ProgressCircle } from "./elements";
import { by, device, element, expect } from "detox";

describe("Progress Circle", () => {
    beforeAll(async () => {
        await Pages().openProgressCircle();

        const textBox = await element(by.id("textBox1"));
        await textBox.tap();
        await textBox.clearText();
        await textBox.typeText("75");
    });

    it("should render the default progress circle", async () => {
        const progressCircle = ProgressCircle("progressCircle7");
        await expect(progressCircle.getProgressCircle()).toBeVisible();
        await progressCircle.getProgressCircle().tap();
        await expect(progressCircle.getText()).toHaveText("75%");
    });

    it("should render the custom text progress circle", async () => {
        const progressCircle = ProgressCircle("progressCircle8");
        await expect(progressCircle.getProgressCircle()).toBeVisible();
        await progressCircle.getProgressCircle().tap();
        await expect(progressCircle.getText()).toHaveText("75/100");
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
