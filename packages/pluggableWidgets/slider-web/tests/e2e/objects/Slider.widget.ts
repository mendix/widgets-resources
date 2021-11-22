import page from "../../../../../../configs/e2e/src/pages/page";

export enum SliderStyleColor {
    Default = "#abe2fb",
    Primary = "#264ae5",
    Success = "#3cb33d",
    Info = "#0086d9",
    Warning = "#eca51c",
    Danger = "#e33f4e",
    Inverse = "#24276c"
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

        if (dots.length !== labels.length) {
            throw Error("The amount of slider dots and labels aren't equal");
        }

        return dots.map((dot, index) => ({
            dot: page.waitForElement(`.rc-slider-step > span:nth-child(${index + 1})`),
            label: page.waitForElement(`.rc-slider-mark > span:nth-child(${index + 1})`)
        }));
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
        return this.element.$(".rc-slider-track").waitForDisplayed({ reverse });
    }

    waitForTooltipExist(reverse?: boolean): boolean {
        return $(".rc-slider-tooltip").waitForExist({ reverse });
    }

    waitForTooltipDisplayed(reverse?: boolean): boolean {
        return $(".rc-slider-tooltip").waitForDisplayed({ reverse });
    }

    getTooltipValue(): string {
        return page.waitForElement(".rc-slider-tooltip-inner > div").getText();
    }

    dragHandleToMinimum(): void {
        this.getHandle().dragAndDrop(this.getMinimumMarker().dot);
    }

    dragHandleToMaximum(): void {
        this.getHandle().dragAndDrop(this.getMaximumMarker().dot);
    }

    dragHandleTo(marker: Marker): void {
        this.getHandle().dragAndDrop(marker.dot);
    }
}
