import { expectToMatchScreenshot, resetDevice, tapMenuItem } from "../../../../../detox/src/helpers";
import { expect, element, by } from "detox";
import { Alert } from "../../../../../detox/src/Alert";

describe("Intro screen", () => {
    let introScreen: Detox.IndexableNativeElement;

    beforeEach(async () => {
        await tapMenuItem("Intro screen");
        introScreen = element(by.id("introScreen"));
    });

    afterEach(async () => {
        await resetDevice();
    });

    it("should be able to change screens and fire event", async () => {
        await introScreen.swipe("left");
        await expectToMatchScreenshot();

        await introScreen.swipe("right");
        await expectToMatchScreenshot();

        await element(by.text("PREVIOUS")).tap();
        await expectToMatchScreenshot();

        await element(by.text("NEXT")).tap();
        await expectToMatchScreenshot();
    });

    it("should be able to skip and fire event", async () => {
        await introScreen.swipe("right");
        await element(by.text("SKIP")).tap();
        await expect(Alert().messageElement).toHaveText("Skipped");
    });

    it("should be able to finish and fire event", async () => {
        await introScreen.swipe("left");
        await element(by.text("FINISH")).tap();
        await expect(Alert().messageElement).toHaveText("Done");
    });

    it("should propagate nested widget events", async () => {
        await element(by.text("Show alert")).tap();
        await expect(Alert().messageElement).toHaveText("Button pressed");
    });
});
