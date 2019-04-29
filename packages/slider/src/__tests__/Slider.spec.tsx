import { actionValue, dynamicValue, EditableValueBuilder } from "@native-mobile-resources/util-widgets/test";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Big } from "big.js";
import { createElement } from "react";
import { View } from "react-native";
import { fireEvent, render, RenderAPI } from "react-native-testing-library";
import { ReactTestInstance } from "react-test-renderer";

import { Props, Slider } from "../Slider";

describe("Slider", () => {
    let defaultProps: Props;

    beforeEach(() => {
        defaultProps = {
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
                        trackDisabled: {}
                    }
                ]}
            />
        );
        fireEvent(component.getByType(View), "layout", { nativeEvent: { layout: { width: 100 } } });
        expect(component.getByType(MultiSlider).props.sliderLength).toBe(100);
    });

    it("handles an invalid step size", () => {
        const component = render(<Slider {...defaultProps} stepSize={dynamicValue(new Big(-10))} />);
        expect(component.getByType(MultiSlider).props.step).toBe(1);
    });

    it("changes the value when swiping", () => {
        const onChangeAction = actionValue();
        const component = render(<Slider {...defaultProps} onChange={onChangeAction} />);

        fireEvent(getHandle(component), "responderGrant", { touchHistory: { touchBank: [] } });
        fireEvent(getHandle(component), "responderMove", responderMove(50));

        expect(onChangeAction.execute).not.toHaveBeenCalled();

        fireEvent(getHandle(component), "responderRelease", {});

        expect(defaultProps.valueAttribute.setTextValue).toHaveBeenCalledWith("190");
        expect(onChangeAction.execute).toHaveBeenCalledTimes(1);
    });

    it("does not change the value when non editable", () => {
        const onChangeAction = actionValue();
        const component = render(<Slider {...defaultProps} editable={"never"} onChange={onChangeAction} />);

        fireEvent(getHandle(component), "responderGrant", { touchHistory: { touchBank: [] } });
        fireEvent(getHandle(component), "responderMove", responderMove(50));
        fireEvent(getHandle(component), "responderRelease", {});

        expect(onChangeAction.execute).not.toHaveBeenCalled();
        expect(defaultProps.valueAttribute.setTextValue).not.toHaveBeenCalled();
    });
});

function getHandle(component: RenderAPI): ReactTestInstance {
    return component.getAllByType(View).filter(instance => instance.props.onMoveShouldSetResponder)[0];
}

// tslint:disable-next-line:typedef
function responderMove(dx: number) {
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
