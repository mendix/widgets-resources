import modePage from "../pages/modePage";
import colorFormatPage from "../pages/colorFormatPage";

describe("Color picker", () => {
    it("changes color when a new color is picked", () => {
        const id = ".mx-name-colorPicker17 input";
        colorFormatPage.open();
        colorFormatPage.skethInput.waitForDisplayed();
        colorFormatPage.rgbTab.click();
        colorFormatPage.circleColorPicker.waitForDisplayed();
        const initialColorValue = $(id).getValue();
        colorFormatPage.circleColorPickerButton.click();
        colorFormatPage.circleColorPickerButtonValue.waitForEnabled();
        const newColorValue = $(id).getValue();

        expect(initialColorValue).toEqual("rgb(42,94,210)");
        expect(newColorValue).toEqual("rgb(233,30,99)");
        expect(initialColorValue).not.toEqual(newColorValue);
    });

    describe("renders a picker of mode", () => {
        beforeAll(() => {
            modePage.open();
        });

        it("button", () => {
            modePage.button.waitForDisplayed();
            modePage.buttonColor.waitForDisplayed();

            const buttonBackgroundColor = $(".mx-name-colorPicker3 .widget-color-picker-inner").getCSSProperty(
                "background-color"
            ).parsed.hex;
            expect(buttonBackgroundColor).toContain("#4caf50");
        });

        it("input box", () => {
            modePage.inPutBoxTab.click();
            modePage.inPutBox.waitForDisplayed();

            const inPutBoxValue = $(".mx-name-colorPicker17 input").getValue();
            expect(inPutBoxValue).toContain("#4caf50");
        });

        it("inline", () => {
            modePage.inlineTab.click();
            modePage.inLineColorPicker.waitForExist();

            const inPutBoxValue: boolean = $(".mx-name-colorPicker27 .sketch-picker").isExisting();
            expect(inPutBoxValue).toBe(true);
        });
    });

    describe("renders a picker of type", () => {
        it("sketch", () => {
            const doesExist: boolean = $(".mx-name-colorPicker27 .sketch-picker").isExisting();
            expect(doesExist).toBe(true);
        });

        it("block", () => {
            const doesExist: boolean = $(".mx-name-colorPicker28 .block-picker ").isExisting();

            expect(doesExist).toBe(true);
        });

        it("chrome", () => {
            const doesExist: boolean = $(".mx-name-colorPicker29 .chrome-picker").isExisting();

            expect(doesExist).toBe(true);
        });

        it("github", () => {
            const doesExist: boolean = $(".mx-name-colorPicker30 .github-picker").isExisting();

            expect(doesExist).toBe(true);
        });

        it("material", () => {
            const doesExist: boolean = $(".mx-name-colorPicker31 .material-picker").isExisting();

            expect(doesExist).toBe(true);
        });

        it("swatches", () => {
            const doesExist: boolean = $(".mx-name-colorPicker32 .swatches-picker").isExisting();

            expect(doesExist).toBe(true);
        });

        it("twitter", () => {
            const doesExist: boolean = $(".mx-name-colorPicker33 .twitter-picker").isExisting();

            expect(doesExist).toBe(true);
        });

        it("circle", () => {
            const doesExist: boolean = $(".mx-name-colorPicker34 .circle-picker").isExisting();

            expect(doesExist).toBe(true);
        });

        it("hue", () => {
            const doesExist: boolean = $(".mx-name-colorPicker35 .hue-picker").isExisting();

            expect(doesExist).toBe(true);
        });

        it("slider", () => {
            const doesExist: boolean = $(".mx-name-colorPicker37 .slider-picker").isExisting();

            expect(doesExist).toBe(true);
        });

        it("compact", () => {
            const doesExist: boolean = $(".mx-name-colorPicker26 .compact-picker").isExisting();

            expect(doesExist).toBe(true);
        });
    });

    describe("renders with color format as", () => {
        beforeAll(() => {
            colorFormatPage.open();
        });

        it("hex", () => {
            colorFormatPage.skethInput.waitForDisplayed();
            const buttonBackgroundColor = $(".mx-name-colorPicker24 input").getValue();

            expect(buttonBackgroundColor).toContain("#4caf50");
        });

        it("rgb", () => {
            colorFormatPage.rgbTab.click();
            colorFormatPage.sketchRgb.waitForDisplayed();

            const inPutBoxValue = $(".mx-name-colorPicker17 input").getValue();
            expect(inPutBoxValue).toContain("rgb(42,94,210)");
        });

        it("rgba", () => {
            colorFormatPage.rgbaTab.click();
            colorFormatPage.sketchRgba.waitForDisplayed();

            const inPutBoxValue = $(".mx-name-colorPicker27 input").getValue();
            expect(inPutBoxValue).toContain("rgba(39,255,238,0.49)");
        });
    });
});
