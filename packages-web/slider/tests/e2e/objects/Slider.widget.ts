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

interface Marker {
    dot: WebdriverIO.Element;
    label: WebdriverIO.Element;
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

    getMarkers(): Marker[] {
        const dots = page.waitForElements(".rc-slider-step > span", this.element);
        const labels = page.waitForElements(".rc-slider-mark > span", this.element);

        const result: Marker[] = [];

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

    getMinimumMarker(): Marker {
        return this.getMarkers()[0];
    }

    getMaximumMarker(): Marker {
        const markers = this.getMarkers();
        return markers[markers.length - 1];
    }

    getHandle(): WebdriverIO.Element {
        return page.waitForElement(".rc-slider-handle", this.element);
    }

    getTrack(): WebdriverIO.Element {
        return page.waitForElement(".rc-slider-track", this.element);
    }

    getAlertMessage(): WebdriverIO.Element {
        return page.waitForElement(".alert", this.element);
    }

    waitForTrackDisplayed(reverse?: boolean): boolean {
        return this.element.$(".rc-slider-track").waitForDisplayed(undefined, reverse);
    }

    waitForTooltipExist(reverse?: boolean): boolean {
        return $(".rc-slider-tooltip").waitForExist(undefined, reverse);
    }

    waitForTooltipDisplayed(reverse?: boolean): boolean {
        return $(".rc-slider-tooltip").waitForDisplayed(undefined, reverse);
    }

    getTooltipValue(): string {
        return page.waitForElement(".rc-slider-tooltip-inner > div").getText();
    }

    dragHandleToMinimum(): void {
        this.getHandle().dragAndDrop(this.getMarkers()[0].dot);
    }

    dragHandleToMaximum(): void {
        const markers = this.getMarkers();
        this.getHandle().dragAndDrop(markers[markers.length - 1].dot);
    }

    dragHandleTo(marker: Marker): void {
        this.getHandle().dragAndDrop(marker.dot);
    }
}
