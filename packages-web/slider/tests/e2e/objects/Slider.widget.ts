import page from "../../../../../configs/e2e/src/pages/page";

export default class SliderWidget {
    name: string;
    element: WebdriverIO.Element;

    constructor(name) {
        this.name = name;
        this.element = page.getWidget(this.name);
    }
}
