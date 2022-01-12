import { expectToMatchScreenshot, tapBottomBarItem, tapMenuItem } from "../../../../../detox/src/helpers";
import { alert } from "../../../../../detox/src/Alert";
import { expect } from "detox";

describe("Slider", () => {
    beforeEach(async () => {
        await tapBottomBarItem("Widgets");
        await tapMenuItem("Range slider");
    });

    it("renders correct initial appearance", async () => {
        await element(by.id("scrollContainerRangeSlider")).scrollTo("bottom");
        await expectToMatchScreenshot();
    });

    it("renders correctly after setting value", async () => {
        const input = element(by.id("textBoxRangeSliderLower"));
        await input.clearText();
        await input.typeText("5\n");

        await element(by.id("scrollContainerRangeSlider")).scrollTo("bottom");
        await expectToMatchScreenshot();
    });

    it("should trigger an action after adjusting slider", async () => {
        await element(by.id("scrollContainerRangeSlider")).scrollTo("bottom");
        await element(by.id("rangeSliderOnChange$leftMarker")).swipe("left", "fast", 1);
        await expect(alert.messageElement).toHaveText("Lower: 2\nUpper: 75");
        await alert.confirm();
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
