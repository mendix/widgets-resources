import { expect, by, element } from "detox";
import { expectToMatchScreenshot, resetDevice, setText, tapMenuItem } from "../../../../../detox/src/helpers";
import { Alert } from "../../../../../detox/src/Alert";

describe("Slider", () => {
    beforeEach(async () => {
        await tapMenuItem("Slider");
    });

    afterEach(async () => {
        await resetDevice();
    });

    it("renders correct initial appearance", async () => {
        await element(by.id("scrollContainerSlider")).scrollTo("bottom");
        await expectToMatchScreenshot();
    });

    it("renders correctly after setting value", async () => {
        const input = element(by.id("textBoxSliderMin"));
        await setText(input, "100");

        await element(by.id("scrollContainerSlider")).scrollTo("bottom");
        await expectToMatchScreenshot();
    });

    it("should trigger an action after adjusting slider", async () => {
        await element(by.id("sliderOnChange$marker")).swipe("right", "fast", 1);
        const alert = Alert();
        await expect(alert.messageElement).toHaveText("Value changed: 100");
    });
});
