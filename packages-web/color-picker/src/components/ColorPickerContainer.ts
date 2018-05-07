import { Component, createElement } from "react";
import { ColorPicker, PickerType, RenderMode } from "./ColorPicker";
import { Color, ColorResult } from "react-color";

interface WrapperProps {
    class: string;
    mxObject?: mendix.lib.MxObject;
    style: string;
    readOnly: boolean;
}

interface ColorPickerContainerProps extends WrapperProps {
    colorAttribute: string;
    type: PickerType;
    renderMode: RenderMode;
    onChangeMicroflow: string;
    format: string;
}

interface ColorPickerContainerState {
    color: string;
}

type Format = "hex" | "rgb" | "rgba";

export default class ColorPickerContainer extends Component<ColorPickerContainerProps, ColorPickerContainerState> {
    private subscriptionHandles: number[];

    constructor(props: ColorPickerContainerProps) {
        super(props);

        this.subscriptionHandles = [];
        this.state = {
            color: this.getValue(props.mxObject)
        };
    }

    render() {
        const alertMessage = this.validateColor();

        return createElement(ColorPicker, {
            alertMessage,
            color: this.state.color || "#00ffff",
            type: this.props.type,
            mode: this.props.renderMode,
            onChange: this.updateColorValue
        });
    }

    componentWillReceiveProps(newProps: ColorPickerContainerProps) {
        this.resetSubscriptions(newProps.mxObject);
        this.setState({
            color: this.getValue(newProps.mxObject)
        });
    }

    componentWillUnmount() {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
    }

    private updateColorValue = (color: ColorResult) => {
        const { format, mxObject, colorAttribute } = this.props;
        if (color && mxObject) {
            if (format === "hex") {
                mxObject.set(colorAttribute, color.hex);
            } else if (format === "rgb") {
                mxObject.set(colorAttribute, `rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})`);
            } else {
                mxObject.set(colorAttribute, `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`);
            }
        }
    }

    private getValue = (mxObject?: mendix.lib.MxObject): string => {
        if (mxObject) {
            return mxObject.get(this.props.colorAttribute) as string;
        }

        return "";
    }

    private resetSubscriptions(mxObject?: mendix.lib.MxObject) {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
        this.subscriptionHandles = [];

        if (mxObject) {
            this.subscriptionHandles.push(window.mx.data.subscribe({
                attr: this.props.colorAttribute,
                callback: this.handleSubscriptions,
                guid: mxObject.getGuid()
            }));
            this.subscriptionHandles.push(window.mx.data.subscribe({
                callback: this.handleSubscriptions,
                guid: mxObject.getGuid()
            }));
        }
    }

    private handleSubscriptions = () => {
        this.setState({
            color: this.getValue(this.props.mxObject)
        });
    }

    private validateColor = (): string => {
        const { color } = this.state;
        if (color.indexOf("#") === -1) {
            return "Color value should be of format 'rgb', 'rgba' or 'hex'";
        }

        return "";
    }
}
