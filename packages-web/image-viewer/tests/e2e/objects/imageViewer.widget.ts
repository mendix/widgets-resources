import page from "../../../../../configs/e2e/src/pages/page";

class ImageViewer {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    get element(): WebdriverIO.Element {
        return page.getWidget(this.name);
    }

    get hiddenElement(): WebdriverIO.Element {
        return page.getElement(`.mx-name-${this.name}.hidden`);
    }
}

export default ImageViewer;
