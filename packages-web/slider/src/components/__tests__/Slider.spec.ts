import { ShallowWrapper, shallow } from "enzyme";
import { createElement } from "react";

import RcSlider, { Marks } from "rc-slider";
import { Alert } from "../Alert";

import { Slider, SliderProps } from "../Slider";

describe("Slider", () => {
    let sliderProps: SliderProps;
    let slider: ShallowWrapper<SliderProps, any>;
    const value = 20;
    const maxValue = 100;
    const minValue = 0;
    const stepValue = 1;
    const noOfMarkers = 0;
    const marks: Marks = { 0: "0", 25: "25", 50: "50", 75: "75", 100: "100" };
    const bootstrapStyle = "primary";

    beforeEach(() => {
        sliderProps = {
            bootstrapStyle,
            disabled: false,
            maxValue,
            minValue,
            noOfMarkers,
            stepValue,
            tooltipText: "{1}",
            value
        };
    });
    const renderSlider = (props: SliderProps): ShallowWrapper<any, any> => shallow(createElement(Slider, props));

    it("renders the structure", () => {
        slider = renderSlider(sliderProps);

        expect(slider.getElement()).toEqual(
            createElement(
                "div",
                { className: "widget-slider widget-slider-primary" },
                createElement(RcSlider, {
                    disabled: false,
                    handle: expect.any(Function),
                    included: true,
                    max: maxValue,
                    min: minValue,
                    step: stepValue,
                    value,
                    vertical: false
                }),
                createElement(Alert)
            )
        );
    });

    it("renders with the given value", () => {
        const RcSliderComponent = renderSlider(sliderProps).find(RcSlider);

        expect(RcSliderComponent.props().value).toBe(value);
    });

    it("renders negative values", () => {
        sliderProps.value = -5;
        sliderProps.maxValue = 0;
        sliderProps.minValue = -10;
        const RcSliderComponent = renderSlider(sliderProps).find(RcSlider);

        expect(RcSliderComponent.props().value).toBe(sliderProps.value);
    });

    it("renders an alert when an alert message is specified", () => {
        sliderProps.alertMessage = "This is an alert";
        slider = renderSlider(sliderProps);
        const alert = slider.find(Alert);

        expect(alert.props().message).toBe(sliderProps.alertMessage);
    });

    it("without a value renders with the calculated value", () => {
        sliderProps.value = null;
        const RcSliderComponent = renderSlider(sliderProps).find(RcSlider);

        expect(RcSliderComponent.props().value).toBe((maxValue - minValue) / 2);
    });

    it("with both invalid minimum and maximum values, renders with the calculated value", () => {
        sliderProps.maxValue = -10;
        sliderProps.value = null;
        const RcSliderComponent = renderSlider(sliderProps).find(RcSlider);

        expect(RcSliderComponent.props().value).toBe(0);
    });

    describe("with a value", () => {
        it("greater than the maximum value, sets the maximum value as the value", () => {
            sliderProps.value = 150;
            const RcSliderComponent = renderSlider(sliderProps).find(RcSlider);

            expect(RcSliderComponent.props().value).toBe(maxValue);
        });

        it("less than the minimum value, sets the minimum value as the value", () => {
            sliderProps.value = -10;
            const RcSliderComponent = renderSlider(sliderProps).find(RcSlider);

            expect(RcSliderComponent.props().value).toBe(minValue);
        });
    });

    it("with no maximum value sets the progress value to zero", () => {
        sliderProps.maxValue = undefined;
        const RcSliderComponent = renderSlider(sliderProps).find(RcSlider);

        expect(RcSliderComponent.props().value).toBe(0);
    });

    it("with no minimum value sets the progress value to zero", () => {
        sliderProps.minValue = undefined;
        const RcSliderComponent = renderSlider(sliderProps).find(RcSlider);

        expect(RcSliderComponent.props().value).toBe(0);
    });

    describe("with the marker value", () => {
        it("undefined, renders no markers", () => {
            sliderProps.noOfMarkers = undefined;
            const RcSliderComponent = renderSlider(sliderProps).find(RcSlider);

            expect(RcSliderComponent.props().marks).toEqual({});
        });

        it("less than 2, renders no markers", () => {
            const RcSliderComponent = renderSlider(sliderProps).find(RcSlider);

            expect(RcSliderComponent.props().marks).toEqual({});
        });

        it("greater than 2 renders markers", () => {
            sliderProps.noOfMarkers = 5;
            const RcSliderComponent = renderSlider(sliderProps).find(RcSlider);

            expect(RcSliderComponent.props().marks).toEqual(marks);
        });
    });

    describe("with a tooltip", () => {
        it("renders a tooltip title with the correct text", () => {
            sliderProps.tooltipText = "Slider";
            slider = renderSlider(sliderProps);

            const sliderInstance = slider.instance() as any;
            spyOn(sliderInstance, "createTooltip").and.callThrough();
            slider.setProps({ tooltipText: sliderProps.tooltipText });

            expect(sliderInstance.createTooltip).toHaveBeenCalledWith({
                text: sliderProps.tooltipText,
                value: sliderProps.value
            });
        });

        it("renders '--' as the tooltip title when no slider value is specified", () => {
            sliderProps.value = null;
            slider = renderSlider(sliderProps);

            const sliderInstance = slider.instance() as any;
            spyOn(sliderInstance, "createTooltip").and.callThrough();
            slider.setProps({ tooltipText: sliderProps.tooltipText });

            expect(sliderInstance.createTooltip).toHaveBeenCalledWith({
                text: sliderProps.tooltipText,
                value: null
            });
        });
    });

    it("without tooltip text renders no tooltip", () => {
        sliderProps.tooltipText = "";
        slider = renderSlider(sliderProps);

        const sliderInstance = slider.instance() as any;
        spyOn(sliderInstance, "createTooltip");
        slider.setProps({ tooltipText: sliderProps.tooltipText });

        expect(sliderInstance.createTooltip).not.toHaveBeenCalled();
    });
});
