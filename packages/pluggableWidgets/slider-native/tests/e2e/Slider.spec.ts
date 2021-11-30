import { expect, device } from "detox";
import { Widget, expectToMatchImageSnapshot, NativeHomePage, Alert } from "../../../../../tests/e2e";

describe("Slider", () => {
    beforeEach(async () => {
        await NativeHomePage().goToWidgetsHomePage();
        const button = Widget("btnSliderActionButton").getElement();
        await button.tap();
    });

    fit("renders correct initial appearance", async () => {
        await expectToMatchImageSnapshot();
    });

    it("triggers action after sliding value", async () => {
        await Widget("sliderOnChange").getElement().adjustSliderToPosition(23);
        await expect(Alert().getMessage("Value changed: 23")).toBeVisible();
        await Alert().confirm();
    });

    it("renders correctly after setting value", async () => {
        await Widget("textBoxSliderMin").getElement().replaceText("100");
        await expectToMatchImageSnapshot();
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
