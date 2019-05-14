import { actionValue, EditableValueBuilder } from "@native-mobile-resources/util-widgets/test";
import { createElement } from "react";
import { View } from "react-native";
import { fireEvent, render, RenderAPI } from "react-native-testing-library";
import { ReactTestInstance } from "react-test-renderer";
import { ColorPicker, Props } from "../ColorPicker";

describe("Color Picker", () => {
    let defaultProps: Props;

    beforeEach(() => {
        defaultProps = {
            style: [],
            format: "hex",
            color: new EditableValueBuilder<string>().withValue("#ff0000").build(),
            showPreview: true,
            showSaturation: true,
            showLightness: true,
            showAlpha: false
        };
    });

    it("renders", () => {
        const component = render(<ColorPicker {...defaultProps} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders no error while the value is resolving", () => {
        const component = render(
            <ColorPicker {...defaultProps} color={new EditableValueBuilder<string>().isLoading().build()} />
        );
        expect(component.queryByType(View)).toBeNull();
    });

    it("renders with alpha slider", () => {
        const component = render(<ColorPicker {...defaultProps} format="rgb" showAlpha={true} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders with custom style", () => {
        const component = render(
            <ColorPicker
                {...defaultProps}
                style={[
                    {
                        container: {},
                        preview: {
                            aspectRatio: 1,
                            borderRadius: 50
                        }
                    }
                ]}
            />
        );
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("changes the value when swiping hue slider", () => {
        const onChangeAction = actionValue();
        const component = render(<ColorPicker {...defaultProps} onChange={onChangeAction} />);

        fireEvent(getHueHandle(component), "responderGrant", { touchHistory: { touchBank: [] } });
        fireEvent(getHueHandle(component), "responderMove", responderMove(50));

        expect(onChangeAction.execute).not.toHaveBeenCalled();

        fireEvent(getHueHandle(component), "responderRelease", {});

        expect(defaultProps.color.setValue).toHaveBeenCalledWith("#ff0004");
        expect(onChangeAction.execute).toHaveBeenCalledTimes(1);
    });

    function getHueHandle(component: RenderAPI): ReactTestInstance {
        return component.getAllByType(View).filter(instance => instance.props.onMoveShouldSetResponder)[0];
    }
    // function getSaturationHandle(component: RenderAPI): ReactTestInstance {
    //     return component.getAllByType(View).filter(instance => instance.props.onMoveShouldSetResponder)[2];
    // }
    // function getLightnessHandle(component: RenderAPI): ReactTestInstance {
    //     return component.getAllByType(View).filter(instance => instance.props.onMoveShouldSetResponder)[3];
    // }
    // function getAlphaHandle(component: RenderAPI): ReactTestInstance {
    //     return component.getAllByType(View).filter(instance => instance.props.onMoveShouldSetResponder)[4];
    // }
});

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
