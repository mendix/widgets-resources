import { device, expect } from "detox";
import { Feedback, Pages } from "./elements";

describe("Feedback", () => {
    const feedback = Feedback("feedback1");

    beforeEach(async () => {
        await Pages().openFeedback();
    });

    afterEach(async () => {
        await device.reloadReactNative();
    });

    it("should open on click floating button", async () => {
        const button = await feedback.getFloatingButton();
        await expect(button).toBeVisible();
        await button.tap();

        const input = await feedback.getInput();
        await expect(input).toBeVisible();
    }, 12000);

    it("should change data in feedback and send", async () => {
        const button = await feedback.getFloatingButton();
        await expect(button).toBeVisible();
        await button.tap();

        const input = await feedback.getInput();
        await expect(input).toBeVisible();
        await input.tap();
        await input.clearText();
        await input.typeText("Detox");

        await expect(input).toHaveText("Detox");

        const checkbox = await feedback.getSwitch();
        await expect(checkbox).toBeVisible();
        await expect(checkbox).toHaveValue("1");
        await checkbox.tap();
        await expect(checkbox).toHaveValue("0");

        const sendButton = await feedback.getSendButton();
        await expect(sendButton).toBeVisible();
        await sendButton.tap();

        const successMessage = await feedback.getSuccessMessage();
        await expect(successMessage).toBeVisible();

        const successOk = await feedback.getSuccessOkButton();
        await expect(successOk).toBeVisible();
        await successOk.tap();
    });

    it("should send screenshot", async () => {
        const button = await feedback.getFloatingButton();
        await expect(button).toBeVisible();
        await button.tap();

        const input = await feedback.getInput();
        await expect(input).toBeVisible();
        await input.tap();
        await input.clearText();
        await input.typeText("Detox");

        await expect(input).toHaveText("Detox");

        const sendButton = await feedback.getSendButton();
        await expect(sendButton).toBeVisible();
        await sendButton.tap();

        const successMessage = await feedback.getSuccessMessage();
        await expect(successMessage).toBeVisible();

        const successOk = await feedback.getSuccessOkButton();
        await expect(successOk).toBeVisible();
        await successOk.tap();
    });
});
