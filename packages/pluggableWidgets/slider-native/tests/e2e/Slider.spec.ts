import { device } from "detox";
import { Widget, expectToMatchImageSnapshot, NativeHomePage } from "../../../../../tests/e2e";

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

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
