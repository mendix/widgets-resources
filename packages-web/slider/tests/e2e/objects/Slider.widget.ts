import page from "../../../../../configs/e2e/src/pages/page";

export enum SliderStyleColor {
    Default = "rgba(171,226,251,1)",
    Primary = "rgba(5,149,219,1)",
    Success = "rgba(118,202,2,1)",
    Info = "rgba(72,176,247,1)",
    Warning = "rgba(249,155,29,1)",
    Danger = "rgba(237,28,36,1)",
    Inverse = "rgba(37,44,54,1)"
}

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
            result.push({
                dot: page.waitForElement(`.rc-slider-step > span:nth-child(${i + 1})`),
                label: page.waitForElement(`.rc-slider-mark > span:nth-child(${i + 1})`)
            });
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

    getTrack(): WebdriverIO.Element {
        return page.waitForElement(".rc-slider-track", this.element);
    }

    isDisabled(): boolean {
        return this.getRoot()
            .getAttribute("class")
            .includes("rc-slider-disabled");
    }

    isTrackDisplayed(): boolean {
        return this.element.$(".rc-slider-track").isDisplayed();
    }

    dragHandleToMinimum(): void {
        this.getHandle().dragAndDrop(this.getMarkers()[0].dot);
    }

    dragHandleToMaximum(): void {
        const markers = this.getMarkers();
        this.getHandle().dragAndDrop(markers[markers.length - 1].dot);
    }

    dragHandleTo(marker: { dot: WebdriverIO.Element; label: WebdriverIO.Element }): void {
        this.getHandle().dragAndDrop(marker.dot);
    }
}
