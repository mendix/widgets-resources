import modePage from "./pages/modePage";
import colorFormatPage from "./pages/colorFormatPage";

describe("Color picker", () => {
    it("changes color when a new color is picked", () => {
        colorFormatPage.open();
        colorFormatPage.skethInput.waitForVisible();
        colorFormatPage.rgbTab.click();
        colorFormatPage.circleColorPicker.waitForVisible();
        const initialColorValue = browser.getValue(".mx-name-colorPicker17 input");
        colorFormatPage.circleColorPickerButton.click();
        colorFormatPage.circleColorPickerButtonValue.waitForValue();
        const newColorValue = browser.getValue(".mx-name-colorPicker17 input");

        expect(initialColorValue).toEqual("rgb(42,94,210)");
        expect(newColorValue).toEqual("rgb(233,30,99)");
        expect(initialColorValue).not.toEqual(newColorValue);
    });

    describe("renders a picker of mode", () => {
        beforeAll(() => {
            modePage.open();
        });

        it("button", () => {
            modePage.button.waitForVisible();
            modePage.buttonColor.waitForVisible();

            const buttonBackgroundColor = browser.getCssProperty(".mx-name-colorPicker3 .widget-color-picker-inner", "background").value;
            expect(buttonBackgroundColor).toContain("rgb(76,175,80)");
        });

        it("input box", () => {
            modePage.inPutBoxTab.click();
            modePage.inPutBox.waitForVisible();

            const inPutBoxValue = browser.getValue(".mx-name-colorPicker17 input");
            expect(inPutBoxValue).toContain("#4caf50");
        });

        it("inline", () => {
            modePage.inlineTab.click();
            modePage.inLineColorPicker.waitForExist();

            const inPutBoxValue: boolean = browser.isExisting(".mx-name-colorPicker27 .sketch-picker");
            expect(inPutBoxValue).toBe(true);
        });
    });

    describe("renders a picker of type", () => {
        it("sketch", () => {
            const doesExist: boolean = browser.isExisting(".mx-name-colorPicker27 .sketch-picker");
            expect(doesExist).toBe(true);
        });

        it("block", () => {
            const doesExist: boolean = browser.isExisting(".mx-name-colorPicker28 .block-picker ");

            expect(doesExist).toBe(true);
        });

        it("chrome", () => {
            const doesExist: boolean = browser.isExisting(".mx-name-colorPicker29 .chrome-picker");

            expect(doesExist).toBe(true);
        });

        it("github", () => {
            const doesExist: boolean = browser.isExisting(".mx-name-colorPicker30 .github-picker");

            expect(doesExist).toBe(true);
        });

        it("material", () => {
            const doesExist: boolean = browser.isExisting(".mx-name-colorPicker31 .material-picker");

            expect(doesExist).toBe(true);
        });

        it("swatches", () => {
            const doesExist: boolean = browser.isExisting(".mx-name-colorPicker32 .swatches-picker");

            expect(doesExist).toBe(true);
        });

        it("twitter", () => {
            const doesExist: boolean = browser.isExisting(".mx-name-colorPicker33 .twitter-picker");

            expect(doesExist).toBe(true);
        });

        it("circle", () => {
            const doesExist: boolean = browser.isExisting(".mx-name-colorPicker34 .circle-picker");

            expect(doesExist).toBe(true);
        });

        it("hue", () => {
            const doesExist: boolean = browser.isExisting(".mx-name-colorPicker35 .hue-picker");

            expect(doesExist).toBe(true);
        });

        it("slider", () => {
            const doesExist: boolean = browser.isExisting(".mx-name-colorPicker37 .slider-picker");

            expect(doesExist).toBe(true);
        });

        it("compact", () => {
            const doesExist: boolean = browser.element(".mx-name-colorPicker26 .compact-picker").isExisting();

            expect(doesExist).toBe(true);
        });
    });

    describe("renders with color format as", () => {
        beforeAll(() => {
            colorFormatPage.open();
        });

        it("hex", () => {
            colorFormatPage.skethInput.waitForVisible();
            const buttonBackgroundColor = browser.getValue(".mx-name-colorPicker3 input");

            expect(buttonBackgroundColor).toContain("#4caf50");
        });

        it("rgb", () => {
            colorFormatPage.rgbTab.click();
            colorFormatPage.sketchRgb.waitForVisible();

            const inPutBoxValue = browser.getValue(".mx-name-colorPicker17 input");
            expect(inPutBoxValue).toContain("rgb(42,94,210)");
        });

        it("rgba", () => {
            colorFormatPage.rgbaTab.click();
            colorFormatPage.sketchRgba.waitForVisible();

            const inPutBoxValue = browser.getValue(".mx-name-colorPicker27 input");
            expect(inPutBoxValue).toContain("rgba(39,255,238,0.49)");
        });
    });
});
