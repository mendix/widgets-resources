import { expectToMatchScreenshot, tapBottomBarItem, tapMenuItem } from "../../../../../detox/src/helpers";
import { alert } from "../../../../../detox/src/Alert";
import { expect } from "detox";

describe("Slider", () => {
    beforeEach(async () => {
        await tapBottomBarItem("Widgets");
        await tapMenuItem("Slider");
    });

    it("renders correct initial appearance", async () => {
        await element(by.id("scrollContainerSlider")).scrollTo("bottom");
        await expectToMatchScreenshot();
    });

    it("renders correctly after setting value", async () => {
        const input = element(by.id("textBoxSliderMin"));
        await input.clearText();
        await input.typeText("100\n");

        await element(by.id("scrollContainerSlider")).scrollTo("bottom");
        await expectToMatchScreenshot();
    });

    it("should trigger an action after adjusting slider", async () => {
        await element(by.id("sliderOnChange$marker")).swipe("right", "fast", 1);
        await expect(alert.messageElement).toHaveText("Value changed: 100");
        await alert.confirm();
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
