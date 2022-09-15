import { element, by } from "detox";
import {
    expectToMatchScreenshot,
    launchApp,
    sessionLogout,
    sleep,
    tapMenuItem
} from "../../../../../detox/src/helpers";

/**
 * Since the drawing does not get captured on Android devices
 * we are only running these tests on iOS.
 **/
describe(":ios:Signature widget", () => {
    beforeEach(async () => {
        await launchApp();
        await tapMenuItem("Signature");
    });

    afterEach(async () => {
        await sessionLogout();
    });

    it("should be able to save a complex signature", async () => {
        const signature = element(by.id("signature"));
        await sleep(10000);
        await signature.swipe("up", "slow", 0.4, 0.5, 0.5);
        await signature.swipe("right", "slow", 0.4, 0.5, 0.5);
        await signature.swipe("down", "slow", 0.4, 0.5, 0.5);
        await signature.swipe("left", "slow", 0.4, 0.5, 0.5);
        await expectToMatchScreenshot(undefined, {
            failureThreshold: 500,
            failureThresholdType: "pixel"
        });

        await element(by.id("signature$SaveButton$Touchable")).tap();
        const attributes = (await element(by.id("textArea")).getAttributes()) as Detox.ElementAttributes;
        expect(attributes.text!.startsWith("data:image/png;base64,")).toBeTruthy();
    });

    it("should be able to clear a signature", async () => {
        const signature = element(by.id("signature"));
        await sleep(10000);
        await signature.swipe("down", "slow", 0.9, 0.5, 0.1);
        await expectToMatchScreenshot(undefined, {
            failureThreshold: 500,
            failureThresholdType: "pixel"
        });

        await element(by.id("signature$ClearButton$Touchable")).tap();
        await expectToMatchScreenshot();
    });
});
