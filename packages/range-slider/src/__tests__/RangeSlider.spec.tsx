import { actionValue, dynamicValue, EditableValueBuilder } from "@native-components/util-widgets/test";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Big } from "big.js";
import { createElement } from "react";
import { View } from "react-native";
import { fireEvent, render, RenderAPI } from "react-native-testing-library";
import { ReactTestInstance } from "react-test-renderer";

import { Props, RangeSlider } from "../RangeSlider";

describe("RangeSlider", () => {
    let defaultProps: Props;

    beforeEach(() => {
        defaultProps = {
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
                        trackDisabled: {}
                    }
                ]}
            />
        );
        fireEvent(component.getByType(View), "layout", { nativeEvent: { layout: { width: 100 } } });
        expect(component.getByType(MultiSlider).props.sliderLength).toBe(100);
    });

    it("handles an invalid step size", () => {
        const component = render(<RangeSlider {...defaultProps} stepSize={dynamicValue(new Big(-10))} />);
        expect(component.getByType(MultiSlider).props.step).toBe(1);
    });

    it("changes the lower value when swiping", () => {
        const onSlideAction = actionValue();
        const onChangeAction = actionValue();
        const component = render(<RangeSlider {...defaultProps} onSlide={onSlideAction} onChange={onChangeAction} />);

        fireEvent(getHandle(component), "responderGrant", { touchHistory: { touchBank: [] } });
        fireEvent(getHandle(component), "responderMove", responderMove(50));

        expect(onSlideAction.execute).toHaveBeenCalledTimes(1);
        expect(onChangeAction.execute).not.toHaveBeenCalled();

        fireEvent(getHandle(component), "responderRelease", {});

        expect(defaultProps.lowerValueAttribute.setTextValue).toHaveBeenCalledWith("120");
        expect(defaultProps.upperValueAttribute.setTextValue).toHaveBeenCalledWith("210");
        expect(onChangeAction.execute).toHaveBeenCalledTimes(1);
    });

    it("changes the upper value when swiping", () => {
        const onSlideAction = actionValue();
        const onChangeAction = actionValue();
        const component = render(<RangeSlider {...defaultProps} onSlide={onSlideAction} onChange={onChangeAction} />);

        fireEvent(getHandle(component, 1), "responderGrant", { touchHistory: { touchBank: [] } });
        fireEvent(getHandle(component, 1), "responderMove", responderMove(-50));

        expect(onSlideAction.execute).toHaveBeenCalledTimes(1);
        expect(onChangeAction.execute).not.toHaveBeenCalled();

        fireEvent(getHandle(component, 1), "responderRelease", {});

        expect(defaultProps.lowerValueAttribute.setTextValue).toHaveBeenCalledWith("70");
        expect(defaultProps.upperValueAttribute.setTextValue).toHaveBeenCalledWith("160");
        expect(onChangeAction.execute).toHaveBeenCalledTimes(1);
    });

    it("does not change the value when non editable", () => {
        const onSlideAction = actionValue();
        const onChangeAction = actionValue();
        const component = render(
            <RangeSlider {...defaultProps} editable={"never"} onSlide={onSlideAction} onChange={onChangeAction} />
        );

        fireEvent(getHandle(component), "responderGrant", { touchHistory: { touchBank: [] } });
        fireEvent(getHandle(component), "responderMove", responderMove(50));
        fireEvent(getHandle(component), "responderRelease", {});

        expect(onSlideAction.execute).not.toHaveBeenCalled();
        expect(onChangeAction.execute).not.toHaveBeenCalled();
        expect(defaultProps.lowerValueAttribute.setTextValue).not.toHaveBeenCalled();
        expect(defaultProps.upperValueAttribute.setTextValue).not.toHaveBeenCalled();
        expect(onChangeAction.execute).not.toHaveBeenCalled();
    });
});

function getHandle(component: RenderAPI, index = 0): ReactTestInstance {
    return component.getAllByType(View).filter(instance => instance.props.onMoveShouldSetResponder)[index];
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
