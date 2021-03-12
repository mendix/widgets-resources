import page from "../../../../../../configs/e2e/src/pages/page";

class ProgressCircle {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    get element(): WebdriverIO.Element {
        return page.getWidget(this.name);
    }

    get valueElement(): WebdriverIO.Element {
        return this.element.$(".progressbar-text");
    }
}

export default ProgressCircle;
