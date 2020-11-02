import page from "../../../../../../configs/e2e/src/pages/page";

export default class FieldsetWidget {
    name: string;
    element: WebdriverIO.Element;

    constructor(name: string) {
        this.name = name;
        this.element = page.getWidget(this.name);
    }

    hasLegend(): boolean {
        return this.element.$("legend").isExisting();
    }

    getLegendText(): string {
        return this.element.$("legend").getText();
    }

    getContent(): WebdriverIO.Element[] {
        return $$(`fieldset[name=${this.name}] > *`).filter(element => {
            return element.getTagName() !== "legend";
        });
    }
}
