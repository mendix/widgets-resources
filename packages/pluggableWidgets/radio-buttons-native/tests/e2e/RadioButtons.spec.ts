import { Widget, expectToMatchImageSnapshot, NativeHomePage, Alert } from "../../../../../tests/e2e";
import { device, by, element } from "detox";

describe("Radio Buttons", () => {
    beforeEach(async () => {
        await NativeHomePage().goToWidgetsHomePage();
        await Widget("scrollContainer1").getElement().scrollTo("bottom");
        const button = Widget("RadioButtonsBtn").getElement();
        await button.tap();
    });

    it("renders correct initial appearance", async () => {
        await expectToMatchImageSnapshot();
    });

    it("call on change when selected option changed", async () => {
        const audiOption = element(by.id("radio-button-Audi"));
        await audiOption.tap();
        Alert().getMessage("Audi");
        await Alert().confirm();
        await expectToMatchImageSnapshot();

        const submitBtn = Widget("radioSubmitBtn").getElement();
        submitBtn.tap();
        await expectToMatchImageSnapshot();
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
