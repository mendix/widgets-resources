import { actionValue, dynamicValue, EditableValueBuilder } from "@widgets-resources/piw-utils";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Big } from "big.js";
import { createElement } from "react";
import { Text, View } from "react-native";
import { fireEvent, render, RenderAPI } from "react-native-testing-library";
import { ReactTestInstance } from "react-test-renderer";

import { Props, RangeSlider } from "../RangeSlider";

describe("RangeSlider", () => {
    let defaultProps: Props;

    beforeEach(() => {
        defaultProps = {
            name: "range-slider-test",
            style: [],
            lowerValueAttribute: new EditableValueBuilder<BigJs.Big>().withValue(new Big(70)).build(),
            upperValueAttribute: new EditableValueBuilder<BigJs.Big>().withValue(new Big(210)).build(),
            editable: "default",
            minimumValue: dynamicValue<BigJs.Big>(new Big(0)),
            maximumValue: dynamicValue<BigJs.Big>(new Big(280)),
            stepSize: dynamicValue<BigJs.Big>(new Big(1))
        };
    });

    it("renders", () => {
        const component = render(<RangeSlider {...defaultProps} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders no error while a value is resolving", () => {
        const component = render(
            <RangeSlider
                {...defaultProps}
                lowerValueAttribute={new EditableValueBuilder<BigJs.Big>().isLoading().build()}
            />
        );
        expect(component.UNSAFE_queryByType(Text)).toBeNull();
    });

    it("renders an error when the minimum is greater than the maximum", () => {
        const component = render(<RangeSlider {...defaultProps} minimumValue={dynamicValue(new Big(300))} />);
        expect(component.UNSAFE_getByType(Text).props.children).toBe(
            "The minimum value must be less than the maximum value."
        );
    });

    it("renders an error when the step size is negative", () => {
        const component = render(<RangeSlider {...defaultProps} stepSize={dynamicValue(new Big(-10))} />);
        expect(component.UNSAFE_getByType(Text).props.children).toBe("The step size must be greater than zero.");
    });

    it("renders an error when the lower value is less than the minimum", () => {
        const component = render(
            <RangeSlider
                {...defaultProps}
                lowerValueAttribute={new EditableValueBuilder<BigJs.Big>().withValue(new Big(-50)).build()}
            />
        );
        expect(component.UNSAFE_getByType(Text).props.children).toBe(
            "The lower value must be equal or greater than the minimum value."
        );
    });

    it("renders an error when the lower value is greater than the maximum", () => {
        const component = render(
            <RangeSlider
                {...defaultProps}
                lowerValueAttribute={new EditableValueBuilder<BigJs.Big>().withValue(new Big(300)).build()}
            />
        );
        expect(component.UNSAFE_getByType(Text).props.children).toBe(
            "The lower value must be less than the maximum value."
        );
    });

    it("renders an error when the upper value is less than the minimum", () => {
        const component = render(
            <RangeSlider
                {...defaultProps}
                upperValueAttribute={new EditableValueBuilder<BigJs.Big>().withValue(new Big(-50)).build()}
            />
        );
        expect(component.UNSAFE_getByType(Text).props.children).toBe(
            "The upper value bust be greater than the minimum value."
        );
    });

    it("renders an error when the upper value is greater than the maximum", () => {
        const component = render(
            <RangeSlider
                {...defaultProps}
                upperValueAttribute={new EditableValueBuilder<BigJs.Big>().withValue(new Big(300)).build()}
            />
        );
        expect(component.UNSAFE_getByType(Text).props.children).toBe(
            "The upper value must be equal or less than the maximum value."
        );
    });

    it("renders with the width of the parent view", () => {
        const component = render(
            <RangeSlider
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
        const component = render(
            <RangeSlider {...defaultProps} lowerValueAttribute={value} upperValueAttribute={value} />
        );

        expect(component.getAllByText("Invalid")).toHaveLength(2);
    });

    it("handles an invalid step size", () => {
        const component = render(<RangeSlider {...defaultProps} stepSize={dynamicValue(new Big(-10))} />);
        expect(component.UNSAFE_getByType(MultiSlider).props.step).toBe(1);
    });

    it("changes the lower value when swiping", () => {
        const onChangeAction = actionValue();
        const component = render(<RangeSlider {...defaultProps} onChange={onChangeAction} />);

        fireEvent(getHandle(component), "responderGrant", { touchHistory: { touchBank: [] } });
        fireEvent(getHandle(component), "responderMove", responderMove(50));

        expect(onChangeAction.execute).not.toHaveBeenCalled();

        fireEvent(getHandle(component), "responderRelease", {});

        expect(defaultProps.lowerValueAttribute.setValue).toHaveBeenCalledWith(new Big(120));
        expect(defaultProps.upperValueAttribute.setValue).toHaveBeenCalledWith(new Big(210));
        expect(onChangeAction.execute).toHaveBeenCalledTimes(1);
    });

    it("changes the upper value when swiping", () => {
        const onChangeAction = actionValue();
        const component = render(<RangeSlider {...defaultProps} onChange={onChangeAction} />);

        fireEvent(getHandle(component, 1), "responderGrant", { touchHistory: { touchBank: [] } });
        fireEvent(getHandle(component, 1), "responderMove", responderMove(-50));

        expect(onChangeAction.execute).not.toHaveBeenCalled();

        fireEvent(getHandle(component, 1), "responderRelease", {});

        expect(defaultProps.lowerValueAttribute.setValue).toHaveBeenCalledWith(new Big(70));
        expect(defaultProps.upperValueAttribute.setValue).toHaveBeenCalledWith(new Big(160));
        expect(onChangeAction.execute).toHaveBeenCalledTimes(1);
    });

    it("does not change the value when non editable", () => {
        const onChangeAction = actionValue();
        const component = render(<RangeSlider {...defaultProps} editable={"never"} onChange={onChangeAction} />);

        fireEvent(getHandle(component), "responderGrant", { touchHistory: { touchBank: [] } });
        fireEvent(getHandle(component), "responderMove", responderMove(50));
        fireEvent(getHandle(component), "responderRelease", {});

        expect(onChangeAction.execute).not.toHaveBeenCalled();
        expect(defaultProps.lowerValueAttribute.setValue).not.toHaveBeenCalled();
        expect(defaultProps.upperValueAttribute.setValue).not.toHaveBeenCalled();
    });
});

function getHandle(component: RenderAPI, index = 0): ReactTestInstance {
    return component.UNSAFE_getAllByType(View).filter(instance => instance.props.onMoveShouldSetResponder)[index];
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
