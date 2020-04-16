import page from "../../../../../configs/e2e/src/pages/page";
import SliderWidget from "../objects/Slider.widget";

describe("Slider widget", () => {
    it("renders with context", () => {
        page.open();
        const sliderWidget = new SliderWidget("sliderContext");

        const minimumValue = page
            .getWidget("textBoxMinimumValue")
            .$("input")
            .getValue();
        expect(sliderWidget.getMinimumMarker().label.getText()).toBe(minimumValue);

        const maximumValue = page
            .getWidget("textBoxMaximumValue")
            .$("input")
            .getValue();
        expect(sliderWidget.getMaximumMarker().label.getText()).toBe(maximumValue);

        expect(
            page
                .getWidget("textBoxValue")
                .$("input")
                .getValue()
        ).toBe("10");
        expect(sliderWidget.getHandle().getAttribute("style")).toBe("left: 50%;");
    });

    it("renders without context", () => {
        page.open("p/no-context");

        const sliderWidget = new SliderWidget("sliderNoContext");

        expect(sliderWidget.getRoot().getAttribute("class")).toContain("rc-slider-disabled");
        expect(sliderWidget.getMinimumMarker().label.getText()).toBe("0");
        expect(sliderWidget.getMaximumMarker().label.getText()).toBe("100");
        expect(sliderWidget.getHandle().getAttribute("style")).toBe("left: 50%;");
        expect(sliderWidget.isTrackDisplayed()).toBe(false);
    });

    it("listens to a grid", () => {
        page.open("p/listen-to-grid");

        const sliderWidget = new SliderWidget("slider");
        const dataGrid = page.getWidget("grid");
        const dataGridRows = dataGrid.$$("td");

        expect(sliderWidget.isDisabled()).toBe(true);

        dataGridRows[0].click();
        expect(sliderWidget.isDisabled()).toBe(false);
        expect(sliderWidget.getHandle().getAttribute("style")).toBe("left: 50%;");

        dataGridRows[1].click();
        expect(sliderWidget.isDisabled()).toBe(false);
        expect(sliderWidget.getHandle().getAttribute("style")).toBe("left: 80%;");
    });

    it("triggers a microflow after slide", () => {
        page.open("p/after-slide");

        const sliderWidget = new SliderWidget("sliderMicroflow");

        sliderWidget.dragHandleToMinimum();

        const modalDialogText = $(".modal-dialog .mx-dialog-body > p");
        modalDialogText.waitForDisplayed();
        expect(modalDialogText.getText()).toContain("0");
    });

    it("triggers a nanoflow after slide", () => {
        page.open("p/after-slide");

        const sliderWidget = new SliderWidget("sliderNanoflow");

        sliderWidget.dragHandleToMinimum();

        const modalDialogText = $(".modal-dialog .mx-name-text1");
        modalDialogText.waitForDisplayed();
        expect(modalDialogText.getText()).toContain("0");
    });

    describe("Slider", () => {
        it("renders with a range that goes from negative to positive", () => {
            page.open("p/negative-and-positive-range");

            const sliderWidget = new SliderWidget("slider");
            const textValueWidget = page.getWidget("textValue");

            expect(textValueWidget.getText()).toContain("5");

            sliderWidget.dragHandleToMinimum();
            expect(textValueWidget.getText()).toContain("-20");
            sliderWidget.dragHandleToMaximum();
            expect(textValueWidget.getText()).toContain("20");
        });

        it("renders multiple markers", () => {
            page.open("p/multiple-markers");

            const sliderWidget = new SliderWidget("slider");

            const markers = sliderWidget.getMarkers();
            expect(markers.length).toBe(10);
            expect(markers[0].dot.getAttribute("style")).toBe("left: 0%;");
            expect(markers[0].label.getText()).toBe("0");
            expect(markers[markers.length - 1].dot.getAttribute("style")).toBe("left: 100%;");
            expect(markers[markers.length - 1].label.getText()).toBe("20");
            expect(markers[3].dot.getAttribute("style")).toBe("left: 33.5%;");
            expect(markers[3].label.getText()).toBe("6.7");
        });

        // it("updates decimal values", () => {
        //     page.open("p/decimal-values");

        //     const sliderWidget = new SliderWidget("slider");
        //     const textValueWidget = page.getWidget("textValue");

        //     expect(textValueWidget.getText()).toContain("5.5");

        //     sliderWidget.dragHandleToMaximum();
        //     expect(textValueWidget.getText()).toContain("20.5");
        // });

        it("updates long values", () => {
            page.open("p/long-values");

            const sliderWidget = new SliderWidget("slider");
            const textValueWidget = page.getWidget("textValue");

            expect(textValueWidget.getText()).toContain("180000");

            sliderWidget.dragHandleToMinimum();
            expect(textValueWidget.getText()).toContain("60000");
        });

        it("slides with a step size", () => {
            page.open("p/long-values");

            const sliderWidget = new SliderWidget("slider");
            const textValueWidget = page.getWidget("textValue");

            expect(textValueWidget.getText()).toContain("180000");

            sliderWidget.dragHandleToMinimum();
            expect(textValueWidget.getText()).toContain("60000");

            const handle = sliderWidget.getHandle();

            handle.click({ x: 58 });
            expect(textValueWidget.getText()).toContain("60000");
            expect(handle.getAttribute("style")).toBe("left: 0%;");
            handle.click({ x: 59 });
            expect(textValueWidget.getText()).toContain("120000");
            expect(handle.getAttribute("style")).toBe("left: 25%;");

            const markers = sliderWidget.getMarkers();
            sliderWidget.dragHandleTo(markers[1]);
            expect(textValueWidget.getText()).toContain("140000");
            expect(handle.getAttribute("style")).toBe("left: 33.3333%;");
        });

        describe("Style", () => {
            it("renders with default style");
            it("renders with primary style");
            it("renders with info style");
            it("renders with inverse style");
            it("renders with success style");
            it("renders with warning style");
            it("renders with danger style");
        });
    });

    describe("Tooltip", () => {
        it("doesn't render when there's no title");
        it("renders a static title");
        it("renders the slider's value");
        it("renders without context the slider's value");
    });

    describe("Alert message", () => {
        it("warns when the minimum value is higher than the maximum value");
        it("warns when the value is higher than the maximum value");
        it("warns when the value is lower than the minimum value");
        it("warns about an invalid step size value");
    });
});
