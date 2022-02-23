import { expectToMatchScreenshot, resetDevice, setText, tapMenuItem } from "../../../../../detox/src/helpers";
import { Alert } from "../../../../../detox/src/Alert";
import { expect, element, by } from "detox";

describe("Slider", () => {
    beforeEach(async () => {
        await tapMenuItem("Range slider");
    });

    afterEach(async () => {
        await resetDevice();
    });

    it("renders correctly after setting value", async () => {
        const input = element(by.id("textBoxRangeSliderLower"));
        await setText(input, "5");
        await element(by.id("scrollContainerRangeSlider")).scrollTo("bottom");

        await expectToMatchScreenshot();
    });

    it("should trigger an action after adjusting slider", async () => {
        await element(by.id("scrollContainerRangeSlider")).scrollTo("bottom");
        await element(by.id("rangeSliderOnChange$leftMarker")).swipe("left", "fast", 1);

        const alert = Alert();
        await expect(alert.messageElement).toHaveText("Lower: 2\nUpper: 75");
    });
});
