import page from "../../../../../../configs/e2e/src/pages/page";

class RichText {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    get element() {
        return page.waitForElement(`.widget-rich-text.mx-name-${this.name}`);
    }
}

export default RichText;
