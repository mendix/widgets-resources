import page from "../../../../../../configs/e2e/src/pages/page";

class InputWidget {
    get inputElement(): WebdriverIO.Element {
        const inputWidget = page.getWidget("dataInput");
        const inputElement = inputWidget.$("input");
        inputElement.waitForDisplayed();
        return inputElement;
    }
}

export default new InputWidget();
