/* eslint-disable */
class ModePage {
    public get button() {
        return $(".mx-name-colorPicker3 button");
    }

    public get buttonColor() {
        return $(".mx-name-colorPicker3 div");
    }

    public get inPutBoxTab() {
        return $(".mx-name-tabPage2");
    }

    public get inPutBox() {
        return $(".mx-name-colorPicker17 input");
    }

    public get inlineTab() {
        return $(".mx-name-tabPage3");
    }

    public get inLineColorPicker() {
        return $(".mx-name-colorPicker29 div");
    }

    public open(): void {
        browser.url("/p/modePage");
    }
}
const modePage = new ModePage();
export default modePage;
