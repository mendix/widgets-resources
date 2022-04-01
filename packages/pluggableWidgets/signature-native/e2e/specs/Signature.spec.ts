import { element, by } from "detox";
import { expectToMatchScreenshot, resetDevice, tapMenuItem } from "../../../../../detox/src/helpers";

describe("Signature widget", () => {
    beforeEach(async () => {
        await tapMenuItem("Signature");
    });

    afterEach(async () => {
        await resetDevice();
    });

    it("should be able to save a complex signature", async () => {
        await element(by.id("signature")).swipe("up", "slow", 0.4, 0.5, 0.5);
        await element(by.id("signature")).swipe("right", "slow", 0.4, 0.5, 0.5);
        await element(by.id("signature")).swipe("down", "slow", 0.4, 0.5, 0.5);
        await element(by.id("signature")).swipe("left", "slow", 0.4, 0.5, 0.5);
        await expectToMatchScreenshot();

        await element(by.id("signature$SaveButton$Touchable")).tap();
        const attributes = (await element(by.id("textArea")).getAttributes()) as Detox.ElementAttributes;
        expect(attributes.text!.startsWith("data:image/png;base64,")).toBeTruthy();
    });

    it("should be able to clear a signature", async () => {
        await element(by.id("signature")).swipe("down", "slow", 0.9, 0.5, 0.1);
        await expectToMatchScreenshot();

        await element(by.id("signature$ClearButton$Touchable")).tap();
        await expectToMatchScreenshot();
    });
});
