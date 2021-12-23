import { device, by, element } from "detox";
import { Alert, Widget, expectToMatchImageSnapshot, NativeHomePage } from "../../../../../tests/e2e";

describe("Slider", () => {
    beforeEach(async () => {
        await NativeHomePage().goToWidgetsHomePage();
        const button = Widget("btnRangeSlider").getElement();
        await button.tap();
    });

    it("renders correct initial appearance", async () => {
        await Widget("scrollContainerRangeSlider").getElement().scrollTo("bottom");
        await expectToMatchImageSnapshot();
    });

    it("renders correctly after setting value", async () => {
        const input = Widget("textBoxRangeSliderLower").getElement();
        await input.clearText();
        await input.typeText("5\n");

        await Widget("scrollContainerRangeSlider").getElement().scrollTo("bottom");
        await expectToMatchImageSnapshot();
    });

    it("should trigger an action after adjusting slider", async () => {
        await Widget("scrollContainerRangeSlider").getElement().scrollTo("bottom");
        await element(by.id("rangeSliderOnChange$leftMarker")).swipe("left", "fast", 1);
        Alert().getMessage("Lower: 2\nUpper: 75");
        await Alert().confirm();
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
