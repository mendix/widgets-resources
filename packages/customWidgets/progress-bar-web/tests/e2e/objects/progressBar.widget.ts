import page from "../../../../../../configs/e2e/src/pages/page";

class ProgressBar {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    get element(): WebdriverIO.Element {
        return page.getElement(`.widget-progress-bar.mx-name-${this.name}`);
    }

    get clickableArea(): WebdriverIO.Element {
        return this.element.$(".widget-progress-bar-clickable");
    }

    get progressBar(): WebdriverIO.Element {
        return this.element.$(".progress-bar");
    }

    get value(): string {
        return this.element.$(".progress-bar").getText();
    }

    static get alerts(): WebdriverIO.Element[] {
        return page.waitForElements(".alert.alert-danger.widget-progressbar");
    }
}

export default ProgressBar;
