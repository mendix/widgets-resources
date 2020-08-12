import page from "../../../../../../configs/e2e/src/pages/page";

class RangeSlider {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    get element(): WebdriverIO.Element {
        return page.waitForElement(`.widget-range-slider.mx-name-${this.name}`);
    }

    get minValueText(): string {
        return this.element.$$(".rc-slider-mark-text")[0].getText();
    }

    get maxValueText(): string {
        return this.element.$$(".rc-slider-mark-text")[1].getText();
    }

    get firstTrack(): WebdriverIO.Element {
        return this.element.$(".rc-slider-track.rc-slider-track-1");
    }

    get lowerBound(): number {
        return this.element.$(".rc-slider-handle-1").getCSSProperty("left").parsed.value;
    }

    get upperBound(): number {
        return this.element.$(".rc-slider-handle-2").getCSSProperty("left").parsed.value;
    }
}

export default RangeSlider;
