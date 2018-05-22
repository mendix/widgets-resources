import modePage from "./pages/modePage";
import colorFormatPage from "./pages/colorFormatPage";

describe("Color Picker", () => {

    beforeAll(() => {
        modePage.open();
    });

    it("should render a button with a background: rgb(76, 175, 80)", () => {
        modePage.button.waitForVisible();
        modePage.buttonColor.waitForVisible();

        const buttonBackgroundColor = browser.getCssProperty(".mx-name-colorPicker3 div", "background").value;
        expect(buttonBackgroundColor).toContain("rgb(76,175,80)nonerepeatscroll0%0%/autopadding-boxborder-box");
    });

    it("should render an input box with a value: #4caf50", () => {
        modePage.inPutBoxTab.click();
        modePage.inPutBox.waitForVisible();

        const inPutBoxValue = browser.getValue(".mx-name-colorPicker17 input");
        expect(inPutBoxValue).toContain("#4caf50");
    });

    it("should be rendered inline", () => {
        modePage.inlineTab.click();
        modePage.inLineColorPicker.waitForVisible();

        const inPutBoxValue = browser.getValue(".mx-name-colorPicker29 input");
        expect(inPutBoxValue.length).toBe(7);
    });

    it("should be render type: Sketch", () => {

        const doesExist: boolean = browser.isExisting(".mx-name-colorPicker27 div");
        expect(doesExist).toBe(true);
    });

    it("should be render type: Block", () => {

        const doesExist: boolean = browser.isExisting(".mx-name-colorPicker28 div");
        expect(doesExist).toBe(true);
    });

    it("should be render type: Chrome", () => {

        const doesExist: boolean = browser.isExisting(".mx-name-colorPicker29 div");
        expect(doesExist).toBe(true);
    });

    it("should be render type: Github", () => {

        const doesExist: boolean = browser.isExisting(".mx-name-colorPicker30 div");
        expect(doesExist).toBe(true);
    });

    it("should be render type: Material", () => {

        const doesExist: boolean = browser.isExisting(".mx-name-colorPicker31 div");
        expect(doesExist).toBe(true);
    });

    it("should be render type: Swatches", () => {

        const doesExist: boolean = browser.isExisting(".mx-name-colorPicker32 div");
        expect(doesExist).toBe(true);
    });

    it("should be render type: Twitter", () => {

        const doesExist: boolean = browser.isExisting(".mx-name-colorPicker33 div");
        expect(doesExist).toBe(true);
    });

    it("should be render type: Circle", () => {

        const doesExist: boolean = browser.isExisting(".mx-name-colorPicker34 div");
        expect(doesExist).toBe(true);
    });

    it("should be render type: Hue", () => {

        const doesExist: boolean = browser.isExisting(".mx-name-colorPicker35 div");
        expect(doesExist).toBe(true);
    });

    it("should be render type: Alpha", () => {

        const doesExist: boolean = browser.isExisting(".mx-name-colorPicker36 div");
        expect(doesExist).toBe(true);
    });

    it("should be render type: Slider", () => {

        const doesExist: boolean = browser.isVisible(".mx-name-colorPicker37 div");
        expect(doesExist).toBe(true);
    });

    it("should be render type: Compact", () => {

        const doesExist: boolean = browser.element(".mx-name-colorPicker26 div").isExisting();
        expect(doesExist).toBe(true);
    });

    it("should change color when a new color is picked", () => {
        colorFormatPage.open();
        colorFormatPage.circleColorPicker.waitForVisible();
        colorFormatPage.circleColorPicker.click();
        colorFormatPage.circleColorPickerButton.waitForVisible();

        const circleButtonBackgroundColor = browser.getCssProperty(".mx-name-colorPicker11 div", "background").value;
        expect(circleButtonBackgroundColor).toContain("rgb(233, 30, 99)");
    });

    it("should render a with color format: HEX", () => {
        colorFormatPage.open();
        colorFormatPage.skethInput.waitForVisible();

        const buttonBackgroundColor = browser.getValue(".mx-name-colorPicker3 input");
        // expect(buttonBackgroundColor).toContain("#e91e63");
        expect(buttonBackgroundColor).toContain("#4caf50");
    });

    it("should render a with color format: rgb", () => {
        colorFormatPage.rgbTab.click();
        colorFormatPage.sketchRgb.waitForVisible();

        const inPutBoxValue = browser.getValue(".mx-name-colorPicker17 input");
        expect(inPutBoxValue).toContain("rgb(42,94,210)");
    });

    it("should render a with color format: rgba", () => {
        colorFormatPage.rgbaTab.click();
        colorFormatPage.sketchRgba.waitForVisible();

        const inPutBoxValue = browser.getValue(".mx-name-colorPicker27 input");
        expect(inPutBoxValue).toContain("rgba(39,255,238,0.49)");
    });
});
