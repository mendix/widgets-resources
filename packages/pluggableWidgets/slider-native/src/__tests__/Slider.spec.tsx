import { actionValue, dynamicValue, EditableValueBuilder } from "@mendix/piw-utils-internal";
import { Big } from "big.js";
import { createElement } from "react";
import { Text, View } from "react-native";
import { fireEvent, render, RenderAPI } from "@testing-library/react-native";
import { ReactTestInstance } from "react-test-renderer";
import { ValueStatus } from "mendix";

import { Props, Slider } from "../Slider";

describe("Slider", () => {
    let defaultProps: Props;

    beforeEach(() => {
        defaultProps = {
            name: "slider-test",
            style: [],
            valueAttribute: new EditableValueBuilder<Big>().withValue(new Big(140)).build(),
            editable: "default",
            minimumValue: dynamicValue<Big>(new Big(0)),
            maximumValue: dynamicValue<Big>(new Big(280)),
            stepSize: dynamicValue<Big>(new Big(1))
        };
    });

    it("renders", () => {
        const component = render(<Slider {...defaultProps} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders no error while the value is resolving", () => {
        const component = render(
            <Slider {...defaultProps} valueAttribute={new EditableValueBuilder<Big>().isLoading().build()} />
        );
        expect(component.queryByTestId(`${defaultProps.name}-validation-message`)).toBeNull();
    });

    it("renders an error when the minimum is greater than the maximum", () => {
        const component = render(<Slider {...defaultProps} minimumValue={dynamicValue(new Big(300))} />);
        expect(component.queryByText("The minimum value can not be greater than the maximum value.")).not.toBeNull();
    });

    it("renders an error when the step size is negative", () => {
        const component = render(<Slider {...defaultProps} stepSize={dynamicValue(new Big(-10))} />);
        expect(component.queryByText("The step size can not be zero or less than zero.")).not.toBeNull();
    });

    it("renders an error when the step size is empty", () => {
        const component = render(
            <Slider {...defaultProps} stepSize={{ status: ValueStatus.Unavailable, value: undefined }} />
        );
        expect(component.queryByText("No step size provided.")).not.toBeNull();
    });

    it("renders an error when the minimum is empty", () => {
        const component = render(
            <Slider {...defaultProps} minimumValue={{ status: ValueStatus.Unavailable, value: undefined }} />
        );
        expect(component.queryByText("No minimum value provided.")).not.toBeNull();
    });

    it("renders an error when the maximum is empty", () => {
        const component = render(
            <Slider {...defaultProps} maximumValue={{ status: ValueStatus.Unavailable, value: undefined }} />
        );
        expect(component.queryByText("No maximum value provided.")).not.toBeNull();
    });

    it("renders an error when the minimum is equal to the maximum", () => {
        const component = render(
            <Slider
                {...defaultProps}
                valueAttribute={new EditableValueBuilder<Big>().withValue(new Big(10)).build()}
                minimumValue={dynamicValue(new Big(10))}
                maximumValue={dynamicValue(new Big(10))}
            />
        );
        console.log(component.UNSAFE_getByType(Text));
        expect(component.queryByText("The minimum value can not be equal to the maximum value.")).not.toBeNull();
    });

    it("renders an error when the value is less than the minimum", () => {
        const component = render(
            <Slider
                {...defaultProps}
                valueAttribute={new EditableValueBuilder<Big>().withValue(new Big(-50)).build()}
            />
        );
        expect(component.queryByText("The current value can not be less than the minimum value.")).not.toBeNull();
    });

    it("renders an error when the value is greater than the maximum", () => {
        const component = render(
            <Slider
                {...defaultProps}
                valueAttribute={new EditableValueBuilder<Big>().withValue(new Big(300)).build()}
            />
        );
        expect(component.queryByText("The current value can not be greater than the maximum value.")).not.toBeNull();
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
        fireEvent(component.getByTestId("slider-test"), "layout", { nativeEvent: { layout: { width: 100 } } });
        expect(component.getByTestId("slider-test").findByProps({ sliderLength: 100 })).not.toBeNull();
    });

    it("renders a validation message", () => {
        const value = new EditableValueBuilder<Big>().withValidation("Invalid").build();
        const component = render(<Slider {...defaultProps} valueAttribute={value} />);

        expect(component.queryByText("Invalid")).not.toBeNull();
    });

    it("handles an invalid step size", () => {
        const component = render(<Slider {...defaultProps} stepSize={dynamicValue(new Big(-10))} />);
        expect(component.getByTestId("slider-test").findByProps({ step: 1 })).not.toBeNull();
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
    return component
        .getByTestId("slider-test")
        .findAllByType(View)
        .filter(instance => instance.props.onMoveShouldSetResponder)[0];
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
