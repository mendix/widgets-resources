import page from "../../../../../../configs/e2e/src/pages/page";

class Signature {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    get element(): WebdriverIO.Element {
        return page.getElement(`.widget-signature-${this.name}`);
    }
}

export default Signature;
