import { expect } from "detox";
import { Feedback, Pages } from "./elements";

describe("Feedback", () => {
    const feedback = Feedback("feedback1");

    beforeAll(async () => {
        await Pages().openFeedback();
    });

    it("should open on click floating button", async () => {
        await expect(feedback.getFloatingButton()).toBeVisible();
        await feedback.getFloatingButton().tap();

        await expect(feedback.getInput()).toBeVisible();
        await feedback.getCancelButton().tap();
    }, 12000);

    it("should send the feedback including a screenshot", async () => {
        await expect(feedback.getFloatingButton()).toBeVisible();
        await feedback.getFloatingButton().tap();

        await expect(feedback.getInput()).toBeVisible();
        await feedback.getInput().tap();
        await feedback.getInput().clearText();
        await feedback.getInput().typeText("Detox");

        await expect(feedback.getInput()).toHaveText("Detox");

        await expect(feedback.getSendButton()).toBeVisible();
        await feedback.getSendButton().tap();

        await expect(feedback.getSuccessMessage()).toBeVisible();

        await expect(feedback.getSuccessOkButton()).toBeVisible();
        await feedback.getSuccessOkButton().tap();
    });
});
