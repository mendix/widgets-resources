import modePage from "./pages/modePage";
import colorFormatPage from "./pages/colorFormatPage";

fdescribe("Color Picker", () => {

    beforeAll(() => {
        modePage.open();
    });

    it("should render a button with a background: rgb(76, 175, 80)", () => {
        modePage.button.waitForVisible();
        modePage.buttonColor.waitForVisible();

        const buttonBackgroundColor = browser.getCssProperty(".mx-name-colorPicker3 .widget-color-picker-inner", "background").value;
        expect(buttonBackgroundColor).toContain("rgb(76,175,80)");
    });

    it("should render an input box with a color value: #4caf50", () => {
        modePage.inPutBoxTab.click();
        modePage.inPutBox.waitForVisible();

        const inPutBoxValue = browser.getValue(".mx-name-colorPicker17 input");
        expect(inPutBoxValue).toContain("#4caf50");
    });

    it("should be rendered inline", () => {
        modePage.inlineTab.click();
        modePage.inLineColorPicker.waitForVisible();

        const inPutBoxValue: boolean = browser.isExisting(".mx-name-colorPicker27 .sketch-picker ");
        expect(inPutBoxValue).toBe(true);
    });

    it("should be render type: Sketch", () => {

        const doesExist: boolean = browser.isExisting(".mx-name-colorPicker27 .sketch-picker ");
        expect(doesExist).toBe(true);
    });

    it("should be render type: Block", () => {

        const doesExist: boolean = browser.isExisting(".mx-name-colorPicker28 .block-picker ");
        expect(doesExist).toBe(true);
    });

    it("should be render type: Chrome", () => {

        const doesExist: boolean = browser.isExisting(".mx-name-colorPicker29 .chrome-picker ");
        expect(doesExist).toBe(true);
    });

    it("should be render type: Github", () => {

        const doesExist: boolean = browser.isExisting(".mx-name-colorPicker30 .github-picker ");
        expect(doesExist).toBe(true);
    });

    it("should be render type: Material", () => {

        const doesExist: boolean = browser.isExisting(".mx-name-colorPicker31 .material-picker ");
        expect(doesExist).toBe(true);
    });

    it("should be render type: Swatches", () => {

        const doesExist: boolean = browser.isExisting(".mx-name-colorPicker32 .swatches-picker ");
        expect(doesExist).toBe(true);
    });

    it("should be render type: Twitter", () => {

        const doesExist: boolean = browser.isExisting(".mx-name-colorPicker33 .twitter-picker ");
        expect(doesExist).toBe(true);
    });

    it("should be render type: Circle", () => {

        const doesExist: boolean = browser.isExisting(".mx-name-colorPicker34 .circle-picker ");
        expect(doesExist).toBe(true);
    });

    it("should be render type: Hue", () => {

        const doesExist: boolean = browser.isExisting(".mx-name-colorPicker35 .hue-picker ");
        expect(doesExist).toBe(true);
    });

    it("should be render type: Alpha", () => {

        const doesExist: boolean = browser.isExisting(".mx-name-colorPicker36 .alpha-picker ");
        expect(doesExist).toBe(true);
    });

    it("should be render type: Slider", () => {

        const doesExist: boolean = browser.isExisting(".mx-name-colorPicker37 .slider-picker ");
        expect(doesExist).toBe(true);
    });

    it("should be render type: Compact", () => {

        const doesExist: boolean = browser.element(".mx-name-colorPicker26 .compact-picker ").isExisting();
        expect(doesExist).toBe(true);
    });

    it("should change color when a new color is picked", () => {
        colorFormatPage.open();
        colorFormatPage.skethInput.waitForVisible();
        colorFormatPage.rgbTab.click();
        colorFormatPage.circleColorPicker.waitForVisible();
        colorFormatPage.circleColorPickerButton.click();
        colorFormatPage.circleColorPickerButtonValue.waitForValue();

        const circleButtonBackgroundColor = browser.getCssProperty(".mx-name-colorPicker22 .widget-color-picker-inner", "background").value;
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
