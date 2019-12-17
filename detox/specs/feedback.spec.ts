import { device, expect } from "detox";
import { Feedback, Pages } from "./elements";

describe("Feedback", () => {
    beforeEach(async () => {
        await Pages().openFeedback();
    });

    afterEach(async () => {
        await device.reloadReactNative();
    });

    it("should open on click floating button", async () => {
        const feedback = Feedback("feedback1");
        const button = await feedback.getFloatingButton();
        await expect(button).toExist();
        await button.tap();

        const input = await feedback.getInput();
        await expect(input).toExist();
    }, 12000);

    it("should change data in feedback and send", async () => {
        const feedback = Feedback("feedback1");
        const button = await feedback.getFloatingButton();
        await expect(button).toExist();
        await button.tap();

        const input = await feedback.getInput();
        await input.clearText();
        await input.typeText("Testing feedback on Detox");

        await expect(input).toHaveText("Testing feedback on Detox");

        const checkbox = await feedback.getSwitch();
        await expect(checkbox).toExist();
        await checkbox.tap();

        const sendButton = await feedback.getSendButton();
        await expect(sendButton).toExist();
        await sendButton.tap();

        const successMessage = await feedback.getSuccessMessage();
        await expect(successMessage).toExist();

        const successOk = await feedback.getSuccessOkButton();
        await expect(successOk).toExist();
        await successOk.tap();
    });
});
