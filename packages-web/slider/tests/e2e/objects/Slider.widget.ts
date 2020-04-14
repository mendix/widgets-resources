import page from "../../../../../configs/e2e/src/pages/page";

export default class SliderWidget {
    name: string;
    element: WebdriverIO.Element;

    constructor(name) {
        this.name = name;
        this.element = page.getWidget(this.name);
    }

    getSliderRoot(): WebdriverIO.Element {
        return page.waitForElement(".rc-slider", this.element);
    }

    getMinimumSliderMark(): WebdriverIO.Element {
        return page.waitForElement(".rc-slider-mark > span:first-child", this.element);
    }

    getMaximumSliderMark(): WebdriverIO.Element {
        return page.waitForElement(".rc-slider-mark > span:last-child", this.element);
    }

    getSliderHandle(): WebdriverIO.Element {
        return page.waitForElement(".rc-slider-handle", this.element);
    }

    // getSliderTrack(): WebdriverIO.Element {
    //     return page.waitForElement(".rc-slider-track", this.element);
    // }

    isDisabled(): boolean {
        return this.getSliderRoot()
            .getAttribute("class")
            .includes("rc-slider-disabled");
    }

    isSliderTrackDisplayed(): boolean {
        return this.element.$(".rc-slider-track").isDisplayed();
    }

    dragSliderHandleToMinimum(): void {
        this.getSliderHandle().dragAndDrop(this.getMinimumSliderMark());
    }
}
