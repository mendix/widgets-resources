import page from "../../../../../../configs/e2e/src/pages/page";

class Carousel {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    get element(): WebdriverIO.Element {
        return page.getWidget(this.name);
    }

    get leftArrow(): WebdriverIO.Element {
        return this.element.$(".widget-carousel-control.left");
    }

    get rightArrow(): WebdriverIO.Element {
        return this.element.$(".widget-carousel-control.right");
    }

    static get error(): WebdriverIO.Element {
        return page.getElement(".alert.alert-danger.widget-carousel-alert");
    }
}

export default Carousel;
