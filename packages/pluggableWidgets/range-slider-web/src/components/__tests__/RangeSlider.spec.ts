import { ShallowWrapper, shallow } from "enzyme";
import { createElement } from "react";

import * as RcSlider from "rc-slider";
import { Alert } from "../Alert";

import { RangeSlider, RangeSliderProps } from "../RangeSlider";

describe("RangeSlider", () => {
    let sliderProps: RangeSliderProps;
    let rangeSlider: ShallowWrapper<RangeSliderProps, any>;
    const upperBound = 40;
    const maxValue = 100;
    const lowerBound = 20;
    const minValue = 0;
    const stepValue = 1;
    const noOfMarkers = 0;
    const marks: RcSlider.Marks = { 0: "0", 25: "25", 50: "50", 75: "75", 100: "100" };
    const bootstrapStyle = "primary";
    const defaultMaxValue = 0;
    const defaultMinValue = 0;

    beforeEach(() => {
        sliderProps = {
            bootstrapStyle,
            disabled: false,
            lowerBound,
            maxValue,
            minValue,
            noOfMarkers,
            stepValue,
            tooltipText: "{1}",
            upperBound
        };
    });
    const renderSlider = (props: RangeSliderProps): ShallowWrapper<RangeSliderProps, any> =>
        shallow(createElement(RangeSlider, props));

    it("renders the structure", () => {
        rangeSlider = renderSlider(sliderProps);

        expect(rangeSlider.getElement()).toEqual(
            createElement(
                "div",
                { className: "widget-range-slider widget-range-slider-primary" },
                createElement(RcSlider.Range, {
                    defaultValue: [lowerBound, upperBound],
                    disabled: false,
                    handle: expect.any(Function),
                    included: true,
                    max: maxValue,
                    min: minValue,
                    step: stepValue,
                    value: [lowerBound, upperBound],
                    vertical: false
                }),
                createElement(Alert, { bootstrapStyle: "danger", className: "widget-range-slider-alert" })
            )
        );
    });

    it("with invalid lower bound and maximum values renders with the calculated lower bound value", () => {
        sliderProps.maxValue = -10;
        sliderProps.lowerBound = undefined;
        const RcSliderComponent = renderSlider(sliderProps).find(RcSlider.Range);

        expect(RcSliderComponent.props().value).toEqual([stepValue, upperBound]);
    });

    it("with invalid upper bound and maximum values renders with the calculated upper bound value", () => {
        sliderProps.maxValue = -10;
        sliderProps.upperBound = undefined;
        const RcSliderComponent = renderSlider(sliderProps).find(RcSlider.Range);

        expect(RcSliderComponent.props().value).toEqual([lowerBound, maxValue - stepValue]);
    });

    it("with an invalid maximum or minimum value renders with default values", () => {
        sliderProps.maxValue = undefined;
        const RcSliderComponent = renderSlider(sliderProps).find(RcSlider.Range);

        expect(RcSliderComponent.props().value).toEqual([defaultMaxValue, defaultMinValue]);
    });

    describe("with the marker value", () => {
        it("undefined renders no markers", () => {
            sliderProps.noOfMarkers = undefined;
            const RcSliderComponent = renderSlider(sliderProps).find(RcSlider.Range);

            expect(RcSliderComponent.props().marks).toEqual({});
        });

        it("less than 2 renders no markers", () => {
            const RcSliderComponent = renderSlider(sliderProps).find(RcSlider.Range);

            expect(RcSliderComponent.props().marks).toEqual({});
        });

        it("greater than 2 renders markers", () => {
            sliderProps.noOfMarkers = 5;
            const RcSliderComponent = renderSlider(sliderProps).find(RcSlider.Range);

            expect(RcSliderComponent.props().marks).toEqual(marks);
        });
    });

    describe("with a tooltip", () => {
        it("renders a tooltip title with the correct text", () => {
            sliderProps.tooltipText = "RangeSlider";
            rangeSlider = renderSlider(sliderProps);

            const sliderInstance = rangeSlider.instance() as any;
            spyOn(sliderInstance, "createTooltip").and.callThrough();
            rangeSlider.setProps({ tooltipText: sliderProps.tooltipText });

            expect(sliderInstance.createTooltip).toHaveBeenCalledWith(sliderProps.tooltipText);
        });

        it("renders '--' as the tooltip title when no lower bound or upper bound value is specified", () => {
            sliderProps.lowerBound = undefined;
            sliderProps.upperBound = undefined;
            rangeSlider = renderSlider(sliderProps);

            const sliderInstance = rangeSlider.instance() as any;
            spyOn(sliderInstance, "createTooltip").and.callThrough();
            rangeSlider.setProps({ tooltipText: sliderProps.tooltipText });

            expect(sliderInstance.createTooltip).toHaveBeenCalledWith(sliderProps.tooltipText);
        });
    });

    it("without tooltip text renders no tooltip", () => {
        sliderProps.tooltipText = "";
        rangeSlider = renderSlider(sliderProps);

        const sliderInstance = rangeSlider.instance() as any;
        spyOn(sliderInstance, "createTooltip");
        rangeSlider.setProps({ tooltipText: sliderProps.tooltipText });

        expect(sliderInstance.createTooltip).not.toHaveBeenCalled();
    });
});
