import { element, by } from "detox";
import { expectToMatchScreenshot, resetDevice, tapMenuItem } from "../../../../../detox/src/helpers";

describe("Signature", () => {
    beforeEach(async () => {
        await tapMenuItem("Signature");
    });

    afterEach(async () => {
        await resetDevice();
    });

    it("should be able to save a signature", async () => {
        await element(by.id("signature")).swipe("up", "slow", 0.4, 0.5, 0.5);
        await element(by.id("signature")).swipe("right", "slow", 0.4, 0.5, 0.5);
        await element(by.id("signature")).swipe("down", "slow", 0.4, 0.5, 0.5);
        await element(by.id("signature")).swipe("left", "slow", 0.4, 0.5, 0.5);
        await expectToMatchScreenshot();

        await element(by.id("signature$SaveButton$Touchable")).tap();
        const attributes = (await element(by.id("textArea")).getAttributes()) as Detox.ElementAttributes;
        expect(attributes.text!.startsWith("data:image/png;base64,")).toBeTruthy();
    });
});
