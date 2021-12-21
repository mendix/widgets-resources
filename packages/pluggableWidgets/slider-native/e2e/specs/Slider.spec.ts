import { device, by, element } from "detox";
import { Alert, Widget, expectToMatchImageSnapshot, NativeHomePage } from "../../../../../tests/e2e";

describe("Slider", () => {
    beforeEach(async () => {
        await NativeHomePage().goToWidgetsHomePage();
        const button = Widget("btnSlider").getElement();
        await button.tap();
    });

    it("renders correct initial appearance", async () => {
        await Widget("scrollContainerSlider").getElement().scrollTo("bottom");
        await expectToMatchImageSnapshot();
    });

    it("renders correctly after setting value", async () => {
        const input = Widget("textBoxSliderMin").getElement();
        await input.clearText();
        await input.typeText("100\n");

        await Widget("scrollContainerSlider").getElement().scrollTo("bottom");
        await expectToMatchImageSnapshot();
    });

    it("should trigger an action after adjusting slider", async () => {
        await element(by.id("sliderOnChange$marker")).swipe("right", "fast", 1);
        Alert().getMessage("Value changed: 100");
        await Alert().confirm();
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
