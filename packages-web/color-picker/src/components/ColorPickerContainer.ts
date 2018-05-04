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
}

interface ColorPickerContainerState {
    alertMessage?: string;
    color: string;
}

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
        return createElement(ColorPicker, {
            color: this.state.color,
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
        const { mxObject, colorAttribute } = this.props;
        if (color && mxObject) {
            mxObject.set(colorAttribute, color.hex);
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
}
