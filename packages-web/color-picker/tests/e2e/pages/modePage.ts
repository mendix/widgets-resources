class ModePage {

    public get button() {
        return browser.element(".mx-name-colorPicker3 button");
    }

    public get buttonColor() {
        return browser.element(".mx-name-colorPicker3 div");
    }

    public get inPutBoxTab() {
        return browser.element(".mx-name-tabPage2");
    }

    public get inPutBox() {
        return browser.element(".mx-name-colorPicker17 input");
    }

    public get inlineTab() {
        return browser.element(".mx-name-tabPage3");
    }

    public get inLineColorPicker() {
        return browser.element(".mx-name-colorPicker29 div");
    }

    public open(): void {
        browser.url("/p/modePage");
    }
}
const modePage = new ModePage();
export default modePage;
