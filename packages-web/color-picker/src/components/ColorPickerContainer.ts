import { Component, createElement } from "react";
import { ColorPicker, Mode, PickerType } from "./ColorPicker";
import { Color, ColorResult } from "react-color";

interface WrapperProps {
    class: string;
    mxObject?: mendix.lib.MxObject;
    mxform: mxui.lib.form._FormBase;
    style: string;
    readOnly: boolean;
}

interface Nanoflow {
    nanoflow: object[];
    paramsSpec: { Progress: string };
}

interface ColorPickerContainerProps extends WrapperProps {
    colorAttribute: string;
    editable: "default" | "never";
    format: string;
    mode: Mode;
    type: PickerType;
    onChangeEvent: onChange;
    onChangeMicroflow: string;
    onChangePage: string;
    onChangeNanoflow: Nanoflow;
}

interface ColorPickerContainerState {
    color: string;
    alertMessage?: string;
}

type Format = "hex" | "rgb" | "rgba";
type onChange = "doNothing" | "showPage" | "callMicroflow" | "callNanoflow";

export default class ColorPickerContainer extends Component<ColorPickerContainerProps, ColorPickerContainerState> {
    private subscriptionHandles: number[];
    private defaultColor = "#00ffff";

    constructor(props: ColorPickerContainerProps) {
        super(props);

        this.subscriptionHandles = [];
        this.state = this.validateColor(props.mxObject);
    }

    render() {
        const { mxObject, readOnly, colorAttribute } = this.props;
        const disabled = this.props.editable === "default"
            ? (!mxObject || readOnly || !!(colorAttribute && mxObject.isReadonlyAttr(colorAttribute)))
            : true;

        const alertMessage = this.state.alertMessage || ColorPickerContainer.validateProps(this.props);

        return createElement(ColorPicker, {
            alertMessage,
            color: this.state.color,
            disabled,
            type: this.props.type,
            mode: this.props.mode,
            onChange: this.updateColorValue,
            onChangeComplete: this.handleOnChange
        });
    }

    componentWillReceiveProps(newProps: ColorPickerContainerProps) {
        this.resetSubscriptions(newProps.mxObject);
        this.setState(this.validateColor(newProps.mxObject));
    }

    componentWillUnmount() {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
    }

    public static validateProps(props: ColorPickerContainerProps): string {
        let errorMessage = "";
        if (props.onChangeEvent === "callMicroflow" && !props.onChangeMicroflow) {
            errorMessage = "on change event is set to 'Call a microflow' but no microflow is selected";
        } else if (props.onChangeEvent === "showPage" && !props.onChangePage) {
            errorMessage = "on change event is set to 'Show a page' but no page is selected";
        } else if (props.onChangeEvent === "callNanoflow" && (JSON.stringify(props.onChangeNanoflow) === JSON.stringify({}))) {
            errorMessage = "on change event is set to 'Call a nanoflow' but no nanoflow is selected";
        }

        return errorMessage && `Error in color picker configuration: ${errorMessage}`;
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

    private validateColor = (mxObject?: mendix.lib.MxObject): ColorPickerContainerState => {
        const color = this.getValue(mxObject);
        if (color && color.indexOf("#") === -1) {
            return {
                alertMessage: "Color value should be of format 'rgb', 'rgba' or 'hex'",
                color: this.defaultColor
            };
        }

        return { color: color || this.defaultColor };
    }

    private handleOnChange = () => {
        const { mxform, mxObject, onChangeEvent, onChangeMicroflow, onChangeNanoflow, onChangePage } = this.props;
        if (mxObject) {
            const context = new mendix.lib.MxContext();
            context.setContext(mxObject.getEntity(), mxObject.getGuid());
            if (onChangeEvent === "callMicroflow" && onChangeMicroflow) {
                window.mx.ui.action(onChangeMicroflow, {
                    error: error => window.mx.ui.error(`Error while executing microflow ${onChangeMicroflow}: ${error.message}`), // tslint:disable-line max-line-length
                    params: {
                        applyto: "selection",
                        guids: [ mxObject.getGuid() ]
                    },
                    origin: mxform
                });
            } else if (onChangeEvent === "showPage" && onChangePage) {
                window.mx.ui.openForm(onChangePage, {
                    context,
                    error: error => window.mx.ui.error(`Error while opening page ${onChangePage}: ${error.message}`),
                    location: "content"
                });
            } else if (onChangeEvent === "callNanoflow" && onChangeNanoflow.nanoflow) {
                window.mx.data.callNanoflow({
                    context,
                    error: error => window.mx.ui.error(`Error while executing the onchange nanoflow: ${error.message}`),
                    nanoflow: onChangeNanoflow,
                    origin: mxform
                });
            }
        }
    }
}
