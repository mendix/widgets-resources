import { expect, element, by } from "detox";
import {
    expectToMatchScreenshot,
    launchApp,
    sessionLogout,
    setText,
    tapMenuItem
} from "../../../../../detox/src/helpers";

describe("Progress Circle", () => {
    const percentage = "75";

    beforeAll(async () => {
        await launchApp();
        await tapMenuItem("Progress circle");

        const textBox = element(by.id("textBoxProgressCircleValue"));
        await setText(textBox, percentage);
    });

    afterAll(async () => {
        await sessionLogout();
    });

    it("renders correctly", async () => {
        await expectToMatchScreenshot();
    });

    it("renders the progress circle with text as percentage", async () => {
        const progressCircleMatcher = by.id("progressCirclePercentageText");

        await expect(element(progressCircleMatcher)).toBeVisible();
        await expect(element(by.text(`${percentage}%`).withAncestor(progressCircleMatcher))).toBeVisible();
    });

    it("renders the progress circle with text as custom", async () => {
        const progressCircleMatcher = by.id("progressCircleCustomText");

        await expect(element(progressCircleMatcher)).toBeVisible();
        await expect(element(by.text(`${percentage}/100`).withAncestor(progressCircleMatcher))).toBeVisible();
    });

    it("does not render progress circle with visibility set as false", async () => {
        const progressCircle = element(by.id("progressCircleNoVisibility"));

        await expect(progressCircle).not.toBeVisible();
    });

    it("renders progress circle with custom style as Success", async () => {
        const progressCircleContainer = element(by.id("progressCircleSuccess"));

        await expect(progressCircleContainer).toBeVisible();
    });
});
