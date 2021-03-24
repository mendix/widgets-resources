import { actionValue, EditableValueBuilder } from "@mendix/piw-utils-internal";
import { createElement } from "react";
import { View } from "react-native";
import Slider from "react-native-slider";
import { fireEvent, render, RenderAPI } from "react-native-testing-library";
import { ReactTestInstance } from "react-test-renderer";
import { ColorPicker, Props } from "../ColorPicker";

describe("Color Picker", () => {
    let defaultProps: Props;

    beforeEach(() => {
        defaultProps = {
            name: "color-picker-test",
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
        expect(component.UNSAFE_queryByType(View)).toBeNull();
    });

    it("renders with alpha slider", () => {
        const component = render(<ColorPicker {...defaultProps} format="rgb" showAlpha />);
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
        const component = render(
            <ColorPicker
                {...defaultProps}
                onChange={onChangeAction}
                showAlpha={false}
                showLightness={false}
                showSaturation={false}
            />
        );

        const hueHandler = getHueHandle(component);

        fireEvent(hueHandler, "responderGrant", { touchHistory: { touchBank: [] } });
        fireEvent(hueHandler, "responderMove", responderMove(0));

        expect(onChangeAction.execute).not.toHaveBeenCalled();

        fireEvent(hueHandler, "responderRelease", {});

        expect(onChangeAction.execute).toHaveBeenCalledTimes(1);

        expect(defaultProps.color.setValue).toHaveBeenCalledWith("#000000");
    });

    it("changes the value when swiping saturation slider", () => {
        const onChangeAction = actionValue();
        const component = render(<ColorPicker {...defaultProps} onChange={onChangeAction} />);

        const saturationHandler = getSaturationHandle(component);

        fireEvent(saturationHandler, "responderGrant", { touchHistory: { touchBank: [] } });
        fireEvent(saturationHandler, "responderMove", responderMove(0));

        expect(onChangeAction.execute).not.toHaveBeenCalled();

        fireEvent(saturationHandler, "responderRelease", {});

        expect(onChangeAction.execute).toHaveBeenCalledTimes(1);
        expect(defaultProps.color.setValue).toHaveBeenCalledWith("#000000");
    });

    it("changes the value when swiping lightness slider with no lightness", () => {
        const onChangeAction = actionValue();
        const component = render(<ColorPicker {...defaultProps} onChange={onChangeAction} />);

        const lightnessHandler = getLightnessHandle(component);

        fireEvent(lightnessHandler, "responderGrant", { touchHistory: { touchBank: [] } });
        fireEvent(lightnessHandler, "responderMove", responderMove(0));

        expect(onChangeAction.execute).not.toHaveBeenCalled();

        fireEvent(lightnessHandler, "responderRelease", {});

        expect(onChangeAction.execute).toHaveBeenCalledTimes(1);
        expect(defaultProps.color.setValue).toHaveBeenCalledWith("#000000");
    });

    it("changes the value when swiping lightness slider with full lightness", () => {
        const onChangeAction = actionValue();
        const component = render(<ColorPicker {...defaultProps} onChange={onChangeAction} />);

        const lightnessHandler = getLightnessHandle(component);

        fireEvent(lightnessHandler, "responderGrant", { touchHistory: { touchBank: [] } });
        fireEvent(lightnessHandler, "responderMove", responderMove(1));

        expect(onChangeAction.execute).not.toHaveBeenCalled();

        fireEvent(lightnessHandler, "responderRelease", {});

        expect(onChangeAction.execute).toHaveBeenCalledTimes(1);
        expect(defaultProps.color.setValue).toHaveBeenCalledWith("#ffffff");
    });

    it("changes the value when swiping alpha slider", () => {
        const onChangeAction = actionValue();
        const component = render(<ColorPicker {...defaultProps} onChange={onChangeAction} showAlpha format="rgb" />);

        const alphaHandler = getAlphaHandle(component);

        fireEvent(alphaHandler, "responderGrant", { touchHistory: { touchBank: [] } });
        fireEvent(alphaHandler, "responderMove", responderMove(-1));

        expect(onChangeAction.execute).not.toHaveBeenCalled();

        fireEvent(alphaHandler, "responderRelease", {});

        expect(onChangeAction.execute).toHaveBeenCalledTimes(1);
        expect(defaultProps.color.setValue).toHaveBeenCalledWith("rgba(255, 0, 0, 0)");
    });

    function getHueHandle(component: RenderAPI): ReactTestInstance {
        return getSliders(component)[0]
            .findAllByType(View)
            .filter(instance => instance.props.onMoveShouldSetResponder)[0];
    }

    function getSaturationHandle(component: RenderAPI): ReactTestInstance {
        return getSliders(component)[1]
            .findAllByType(View)
            .filter(instance => instance.props.onMoveShouldSetResponder)[0];
    }

    function getLightnessHandle(component: RenderAPI): ReactTestInstance {
        return getSliders(component)[2]
            .findAllByType(View)
            .filter(instance => instance.props.onMoveShouldSetResponder)[0];
    }

    function getAlphaHandle(component: RenderAPI): ReactTestInstance {
        return getSliders(component)[3]
            .findAllByType(View)
            .filter(instance => instance.props.onMoveShouldSetResponder)[0];
    }

    function getSliders(component: RenderAPI): ReactTestInstance[] {
        return component.UNSAFE_getAllByType(Slider);
    }
});

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
