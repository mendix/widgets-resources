import { expectToMatchScreenshot, resetDevice, setText, tapMenuItem } from "../../../../../detox/src/helpers";
import { element, by, waitFor } from "detox";

describe("Feedback widget", () => {
    beforeEach(async () => {
        await tapMenuItem("Feedback");
    });

    afterEach(async () => {
        await resetDevice();
    });

    it("should be able to submit a feedback item", async () => {
        await expectToMatchScreenshot(element(by.id("feedback1$button")));

        await element(by.id("feedback1$button")).tap();
        await expectToMatchScreenshot(element(by.id("feedback1$popup")));

        await setText(element(by.id("feedback1$input")), "e2e test for feedback widget");
        await element(by.id("feedback1$send")).tap();

        await waitFor(element(by.text("Feedback successfully sent")))
            .toBeVisible()
            .withTimeout(5000);
    });
});
