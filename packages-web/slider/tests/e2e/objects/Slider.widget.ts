import page from "../../../../../configs/e2e/src/pages/page";

export default class SliderWidget {
    name: string;
    element: WebdriverIO.Element;

    constructor(name) {
        this.name = name;
        this.element = page.getWidget(this.name);
    }

    getRoot(): WebdriverIO.Element {
        return page.waitForElement(".rc-slider", this.element);
    }

    getMarkers(): Array<{ dot: WebdriverIO.Element; label: WebdriverIO.Element }> {
        const dots = page.waitForElements(".rc-slider-step > span", this.element);
        const labels = page.waitForElements(".rc-slider-mark > span", this.element);

        const result: Array<{ dot: WebdriverIO.Element; label: WebdriverIO.Element }> = [];

        if (dots.length !== labels.length) {
            throw Error("The amount of slider dots and labels aren't equal");
        }

        for (let i = 0; i < dots.length; i++) {
            result.push({ dot: dots[i], label: labels[i] });
        }

        return result;
    }

    getMinimumMarker(): { dot: WebdriverIO.Element; label: WebdriverIO.Element } {
        return this.getMarkers()[0];
    }

    getMaximumMarker(): { dot: WebdriverIO.Element; label: WebdriverIO.Element } {
        const markers = this.getMarkers();
        return markers[markers.length - 1];
    }

    getHandle(): WebdriverIO.Element {
        return page.waitForElement(".rc-slider-handle", this.element);
    }

    // getSliderTrack(): WebdriverIO.Element {
    //     return page.waitForElement(".rc-slider-track", this.element);
    // }

    isDisabled(): boolean {
        return this.getRoot()
            .getAttribute("class")
            .includes("rc-slider-disabled");
    }

    isTrackDisplayed(): boolean {
        return this.element.$(".rc-slider-track").isDisplayed();
    }

    dragHandleToMinimum(): void {
        this.getHandle().dragAndDrop(page.waitForElement(".rc-slider-step > span:first-child", this.element));
    }

    dragHandleToMaximum(): void {
        this.getHandle().dragAndDrop(page.waitForElement(".rc-slider-step > span:last-child", this.element));
    }
}
