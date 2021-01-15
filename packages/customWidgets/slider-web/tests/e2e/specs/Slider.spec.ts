import page from "../../../../../../configs/e2e/src/pages/page";
import SliderWidget, { SliderStyleColor } from "../objects/Slider.widget";

describe("Slider widget", () => {
    describe("Slider", () => {
        it("renders with context", () => {
            page.open();
            const sliderWidget = new SliderWidget("sliderContext");

            const minimumValue = page.getWidget("textBoxMinimumValue").$("input").getValue();
            expect(sliderWidget.getMinimumMarker().label.getText()).toBe(minimumValue);

            const maximumValue = page.getWidget("textBoxMaximumValue").$("input").getValue();
            expect(sliderWidget.getMaximumMarker().label.getText()).toBe(maximumValue);

            expect(page.getWidget("textBoxValue").$("input").getValue()).toBe("10");
            expect(sliderWidget.getHandle().getAttribute("style")).toContain("left: 50%;");
        });

        it("renders without context", () => {
            page.open("p/no-context");

            const sliderWidget = new SliderWidget("sliderNoContext");

            expect(sliderWidget.getRoot().getAttribute("class")).toContain("rc-slider-disabled");
            expect(sliderWidget.getMinimumMarker().label.getText()).toBe("0");
            expect(sliderWidget.getMaximumMarker().label.getText()).toBe("100");
            expect(sliderWidget.getHandle().getAttribute("style")).toContain("left: 50%;");
            expect(sliderWidget.getHandle().getCSSProperty("cursor").value).toBe("not-allowed");
            sliderWidget.waitForTrackDisplayed(true);
        });

        it("listens to a grid", () => {
            page.open("p/listen-to-grid");

            const sliderWidget = new SliderWidget("slider");
            const dataGrid = page.getWidget("grid");
            const dataGridRows = dataGrid.$$("td");
            expect(sliderWidget.getHandle().getCSSProperty("cursor").value).toBe("not-allowed");
            dataGridRows[0].click();
            expect(sliderWidget.getHandle().getAttribute("style")).toContain("left: 50%;");
            dataGridRows[1].click();
            expect(sliderWidget.getHandle().getAttribute("style")).toContain("left: 80%;");
        });

        it("triggers a microflow after slide", () => {
            page.open("p/after-slide");

            const sliderWidget = new SliderWidget("sliderMicroflow");

            sliderWidget.dragHandleToMinimum();
            const modalDialogText = $(".modal-dialog .mx-dialog-body > p");
            browser.waitUntil(
                () => {
                    return modalDialogText.getText() === "Slider Value is 0";
                },
                { timeout: 1000, timeoutMsg: "expected text to be different after 1s" }
            );
            expect(modalDialogText.getText()).toContain("0");
        });

        it("triggers a nanoflow after slide", () => {
            page.open("p/after-slide");

            const sliderWidget = new SliderWidget("sliderNanoflow");

            sliderWidget.dragHandleToMinimum();

            const modalDialogText = $(".modal-dialog .mx-name-text1");
            browser.waitUntil(
                () => {
                    return modalDialogText.getText() === "Slider Value is 0";
                },
                { timeout: 1000, timeoutMsg: "expected text to be different after 1s" }
            );
            expect(modalDialogText.getText()).toContain("0");
        });

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
            const markerSize = markers.length;
            expect(markerSize).toBe(10);
            expect(markers[0].dot.getCSSProperty("left").value).toBe("0px");
            expect(markers[0].label.getText()).toBe("0");
            expect(markers[markerSize - 1].dot.getAttribute("style")).toContain("left: 100%;");
            expect(markers[markerSize - 1].label.getText()).toBe("20");
            expect(markers[3].dot.getAttribute("style")).toContain("left: 33.5%;");
            expect(markers[3].label.getText()).toBe("6.7");
        });

        // === Enable when bug is fixed (WT-2439) ===

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

            expect(textValueWidget.getText()).toContain("60000");

            sliderWidget.dragHandleToMaximum();
            expect(textValueWidget.getText()).toContain("300000");
        });

        describe("Step size sliding", () => {
            let sliderWidget: SliderWidget;
            let handle: WebdriverIO.Element;
            let textValueWidget: WebdriverIO.Element;

            beforeAll(() => {
                page.open("p/long-values");

                sliderWidget = new SliderWidget("slider");
                textValueWidget = page.getWidget("textValue");
                handle = sliderWidget.getHandle();
            });

            it("slides with step size", () => {
                handle.click({ x: 58 });
                expect(textValueWidget.getText()).toContain("60000");
                expect(handle.getAttribute("style")).toContain("left: 0%;");
                handle.click({ x: 59 });
                expect(textValueWidget.getText()).toContain("120000");
                expect(handle.getAttribute("style")).toContain("left: 25%;");
            });

            it("snaps to intermediate markers", () => {
                const markers = sliderWidget.getMarkers();

                sliderWidget.dragHandleTo(markers[1]);
                expect(textValueWidget.getText()).toContain("140000");
                expect(handle.getAttribute("style")).toContain("left: 33.3333%;");
            });

            it("slides without using intermediate marker as base", () => {
                handle.click({ x: 39 });
                expect(textValueWidget.getText()).toContain("140000");
                expect(handle.getAttribute("style")).toContain("left: 33.3333%;");
                handle.click({ x: 40 });
                expect(textValueWidget.getText()).toContain("180000");
                expect(handle.getAttribute("style")).toContain("left: 50%;");
            });
        });

        describe("Style", () => {
            beforeAll(() => {
                page.open("p/different-slider-styles");
            });

            it("renders with default style", () => {
                const sliderWidget = new SliderWidget("sliderDefault");
                expect(sliderWidget.getTrack().getCSSProperty("background-color").parsed.hex).toBe(
                    SliderStyleColor.Default
                );
            });
            it("renders with primary style", () => {
                const sliderWidget = new SliderWidget("sliderPrimary");
                expect(sliderWidget.getTrack().getCSSProperty("background-color").parsed.hex).toBe(
                    SliderStyleColor.Primary
                );
            });
            it("renders with info style", () => {
                const sliderWidget = new SliderWidget("sliderInfo");
                expect(sliderWidget.getTrack().getCSSProperty("background-color").parsed.hex).toBe(
                    SliderStyleColor.Info
                );
            });
            it("renders with inverse style", () => {
                const sliderWidget = new SliderWidget("sliderInverse");
                expect(sliderWidget.getTrack().getCSSProperty("background-color").parsed.hex).toBe(
                    SliderStyleColor.Inverse
                );
            });
            it("renders with success style", () => {
                const sliderWidget = new SliderWidget("sliderSuccess");
                expect(sliderWidget.getTrack().getCSSProperty("background-color").parsed.hex).toBe(
                    SliderStyleColor.Success
                );
            });
            it("renders with warning style", () => {
                const sliderWidget = new SliderWidget("sliderWarning");
                expect(sliderWidget.getTrack().getCSSProperty("background-color").parsed.hex).toBe(
                    SliderStyleColor.Warning
                );
            });
            it("renders with danger style", () => {
                const sliderWidget = new SliderWidget("sliderDanger");
                expect(sliderWidget.getTrack().getCSSProperty("background-color").parsed.hex).toBe(
                    SliderStyleColor.Danger
                );
            });
        });
    });

    describe("Tooltip", () => {
        it("doesn't render when there's no title", () => {
            page.open("p/no-tooltip-title");

            const sliderWidget = new SliderWidget("slider");

            sliderWidget.waitForTooltipExist(true);

            sliderWidget.getHandle().moveTo();
            sliderWidget.waitForTooltipExist(true);
        });

        it("renders a static title", () => {
            page.open("p/tooltip-with-static-title");

            const sliderWidget = new SliderWidget("slider");

            sliderWidget.waitForTooltipExist(true);

            sliderWidget.getHandle().moveTo();
            sliderWidget.waitForTooltipExist();
            expect(sliderWidget.getTooltipValue()).toBe("Slider");

            page.getWidget("textTitle").moveTo();
            sliderWidget.waitForTooltipDisplayed(true);

            sliderWidget.dragHandleToMaximum();
            page.getWidget("textTitle").moveTo();
            sliderWidget.getHandle().moveTo();
            expect(sliderWidget.getTooltipValue()).toBe("Slider");
        });

        it("renders the slider's value", () => {
            page.open("p/tooltip-with-slider-value");

            const sliderWidget = new SliderWidget("slider");

            sliderWidget.waitForTooltipExist(true);

            sliderWidget.getHandle().moveTo();
            sliderWidget.waitForTooltipExist();
            expect(sliderWidget.getTooltipValue()).toBe("10");

            page.getWidget("textTitle").moveTo();
            sliderWidget.waitForTooltipDisplayed(true);

            sliderWidget.dragHandleToMaximum();
            page.getWidget("textTitle").moveTo();
            sliderWidget.getHandle().moveTo();
            expect(sliderWidget.getTooltipValue()).toBe("20");
        });

        it("renders when no slider value is set", () => {
            page.open("p/tooltip-with-unset-slider-value");

            const sliderWidget = new SliderWidget("slider");

            sliderWidget.waitForTooltipExist(true);

            sliderWidget.getHandle().moveTo();
            sliderWidget.waitForTooltipExist();
            expect(sliderWidget.getTooltipValue()).toBe("--");

            page.getWidget("textTitle").moveTo();
            sliderWidget.waitForTooltipDisplayed(true);

            sliderWidget.dragHandleToMaximum();
            page.getWidget("textTitle").moveTo();
            sliderWidget.getHandle().moveTo();
            expect(sliderWidget.getTooltipValue()).toBe("20");
        });
    });

    describe("Alert message", () => {
        it("warns when the minimum value is greater than the maximum value", () => {
            page.open("p/min-greater-than-max");

            const sliderWidget = new SliderWidget("slider");

            expect(sliderWidget.getAlertMessage().getText()).toBe(
                "Minimum value 30 should be less than or equal to the maximum value 20"
            );
        });

        it("warns when the value is higher than the maximum value", () => {
            page.open("p/value-greater-than-max");

            const sliderWidget = new SliderWidget("slider");

            expect(sliderWidget.getAlertMessage().getText()).toBe(
                "Value 20 should be equal or less than the maximum 10"
            );
        });

        it("warns when the value is lower than the minimum value", () => {
            page.open("p/value-less-than-min");

            const sliderWidget = new SliderWidget("slider");

            expect(sliderWidget.getAlertMessage().getText()).toBe(
                "Value 2 should be equal or greater than the minimum 10"
            );
        });

        it("warns about an invalid step size value", () => {
            page.open("p/invalid-step-value");

            const sliderWidget = new SliderWidget("slider");

            expect(sliderWidget.getAlertMessage().getText()).toBe(
                "Step value is invalid: max - min (20 - 2) should be evenly divisible by the step value 5"
            );
        });

        it("warns about an invalid step size value of 0", () => {
            page.open("p/step-value-less-than-zero");

            const sliderWidget = new SliderWidget("slider");

            expect(sliderWidget.getAlertMessage().getText()).toBe("Step value -2 should be greater than 0");
        });
    });
});
