class ColorFormat {
    public get circleColorPicker() {
        return browser.element(".mx-name-colorPicker11 > div > div > span:nth-child(2) > div > span > div");
    }

    public get circleColorPickerButton() {
        return browser.element(".mx-name-colorPicker11 div");
    }

    public get skethInput() {
        return browser.element(".mx-name-colorPicker3 input");
    }

    public get rgbTab() {
        return browser.element(".mx-name-tabPage2");
    }

    public get sketchRgb() {
        return browser.element(".mx-name-colorPicker17 input");
    }

    public get rgbaTab() {
        return browser.element(".mx-name-tabPage3");
    }

    public get sketchRgba() {
        return browser.element(".mx-name-colorPicker27 input");
    }

    public open(): void {
        browser.url("/p/colorFormat");
    }
}
const colorFormatPage = new ColorFormat();
export default colorFormatPage;
