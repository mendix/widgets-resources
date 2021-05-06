import page from "../pages/page";

class Input {
    get latitudeInput(): WebdriverIO.Element {
        return page.getElement(".mx-name-textBox1 input");
    }

    get longitudeInput(): WebdriverIO.Element {
        return page.getElement(".mx-name-textBox2 input");
    }

    get longitudeLabel(): WebdriverIO.Element {
        return page.getElement(".mx-name-textBox2 label");
    }
}

const InputWidget = new Input();
export default InputWidget;
