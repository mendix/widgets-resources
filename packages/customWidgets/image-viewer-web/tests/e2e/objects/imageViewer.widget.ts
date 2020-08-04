import page from "../../../../../../configs/e2e/src/pages/page";

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

    get imageSrc(): any {
        return this.element.$("img").getProperty("src");
    }

    get imageSrcHidden(): any {
        return this.hiddenElement.$("img").getProperty("src");
    }

    static get errorAlert(): WebdriverIO.Element {
        return $(".alert.alert-danger");
    }

    static get lightbox(): WebdriverIO.Element {
        return $(".ReactModal__Overlay.ReactModal__Overlay--after-open");
    }
}

export default ImageViewer;
