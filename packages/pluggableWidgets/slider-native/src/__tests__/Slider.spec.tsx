import { actionValue, dynamicValue, EditableValueBuilder } from "@widgets-resources/piw-utils";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Big } from "big.js";
import { createElement } from "react";
import { Text, View } from "react-native";
import { fireEvent, render, RenderAPI } from "react-native-testing-library";
import { ReactTestInstance } from "react-test-renderer";

import { Props, Slider } from "../Slider";

describe("Slider", () => {
    let defaultProps: Props;

    beforeEach(() => {
        defaultProps = {
            name: "slider-test",
            style: [],
            valueAttribute: new EditableValueBuilder<BigJs.Big>().withValue(new Big(140)).build(),
            editable: "default",
            minimumValue: dynamicValue<BigJs.Big>(new Big(0)),
            maximumValue: dynamicValue<BigJs.Big>(new Big(280)),
            stepSize: dynamicValue<BigJs.Big>(new Big(1))
        };
    });

    it("renders", () => {
        const component = render(<Slider {...defaultProps} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders no error while the value is resolving", () => {
        const component = render(
            <Slider {...defaultProps} valueAttribute={new EditableValueBuilder<BigJs.Big>().isLoading().build()} />
        );
        expect(component.UNSAFE_queryByType(Text)).toBeNull();
    });

    it("renders an error when the minimum is greater than the maximum", () => {
        const component = render(<Slider {...defaultProps} minimumValue={dynamicValue(new Big(300))} />);
        expect(component.UNSAFE_getByType(Text).props.children).toBe(
            "The minimum value can not be greater than the maximum value."
        );
    });

    it("renders an error when the step size is negative", () => {
        const component = render(<Slider {...defaultProps} stepSize={dynamicValue(new Big(-10))} />);
        expect(component.UNSAFE_getByType(Text).props.children).toBe(
            "The step size can not be zero or less than zero."
        );
    });

    it("renders an error when the value is less than the minimum", () => {
        const component = render(
            <Slider
                {...defaultProps}
                valueAttribute={new EditableValueBuilder<BigJs.Big>().withValue(new Big(-50)).build()}
            />
        );
        expect(component.UNSAFE_getByType(Text).props.children).toBe(
            "The current value can not be less than the minimum value."
        );
    });

    it("renders an error when the value is greater than the maximum", () => {
        const component = render(
            <Slider
                {...defaultProps}
                valueAttribute={new EditableValueBuilder<BigJs.Big>().withValue(new Big(300)).build()}
            />
        );
        expect(component.UNSAFE_getByType(Text).props.children).toBe(
            "The current value can not be greater than the maximum value."
        );
    });

    it("renders with the width of the parent view", () => {
        const component = render(
            <Slider
                {...defaultProps}
                style={[
                    {
                        container: { width: 100 },
                        highlight: {},
                        highlightDisabled: {},
                        marker: {},
                        markerActive: {},
                        markerDisabled: {},
                        track: {},
                        trackDisabled: {},
                        validationMessage: {}
                    }
                ]}
            />
        );
        fireEvent(component.UNSAFE_getByType(View), "layout", { nativeEvent: { layout: { width: 100 } } });
        expect(component.UNSAFE_getByType(MultiSlider).props.sliderLength).toBe(100);
    });

    it("renders a validation message", () => {
        const value = new EditableValueBuilder<BigJs.Big>().withValidation("Invalid").build();
        const component = render(<Slider {...defaultProps} valueAttribute={value} />);

        expect(component.getByText("Invalid")).toBeDefined();
    });

    it("handles an invalid step size", () => {
        const component = render(<Slider {...defaultProps} stepSize={dynamicValue(new Big(-10))} />);
        expect(component.UNSAFE_getByType(MultiSlider).props.step).toBe(1);
    });

    it("changes the value when swiping", () => {
        const onChangeAction = actionValue();
        const component = render(<Slider {...defaultProps} onChange={onChangeAction} />);

        fireEvent(getHandle(component), "responderGrant", { touchHistory: { touchBank: [] } });
        fireEvent(getHandle(component), "responderMove", responderMove(50));

        expect(onChangeAction.execute).not.toHaveBeenCalled();

        fireEvent(getHandle(component), "responderRelease", {});

        expect(defaultProps.valueAttribute.setValue).toHaveBeenCalledWith(new Big(190));
        expect(onChangeAction.execute).toHaveBeenCalledTimes(1);
    });

    it("does not change the value when non editable", () => {
        const onChangeAction = actionValue();
        const component = render(<Slider {...defaultProps} editable={"never"} onChange={onChangeAction} />);

        fireEvent(getHandle(component), "responderGrant", { touchHistory: { touchBank: [] } });
        fireEvent(getHandle(component), "responderMove", responderMove(50));
        fireEvent(getHandle(component), "responderRelease", {});

        expect(onChangeAction.execute).not.toHaveBeenCalled();
        expect(defaultProps.valueAttribute.setValue).not.toHaveBeenCalled();
    });
});

function getHandle(component: RenderAPI): ReactTestInstance {
    return component.UNSAFE_getAllByType(View).filter(instance => instance.props.onMoveShouldSetResponder)[0];
}

function responderMove(dx: number): any {
    return {
        touchHistory: {
            numberActiveTouches: 1,
            indexOfSingleActiveTouch: 0,
            touchBank: [
                {
                    touchActive: true,
                    currentTimeStamp: Date.now(),
                    currentPageX: dx,
                    currentPageY: 0,
                    previousPageX: 0,
                    previousPageY: 0
                }
            ]
        }
    };
}
