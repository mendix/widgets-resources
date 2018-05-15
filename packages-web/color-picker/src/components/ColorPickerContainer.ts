import { Component, createElement } from "react";

import { Color, ColorResult } from "react-color";

import { ColorPicker, Mode, PickerType } from "./ColorPicker";
import { Input } from "./Input";
import { Button } from "./Button";
import { Label } from "./Label";

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

export interface ColorPickerContainerProps extends WrapperProps {
    colorAttribute: string;
    editable: "default" | "never";
    format: string;
    mode: Mode;
    type: PickerType;
    label: string;
    labelWidth: number;
    onChangeEvent: onChange;
    onChangeMicroflow: string;
    onChangePage: string;
    onChangeNanoflow: Nanoflow;
    openPageLocation: "content" | "popup" | "modal";
}

interface ColorPickerContainerState {
    color: string;
    alertMessage?: string;
    displayColorPicker: boolean;
}

type Format = "hex" | "rgb" | "rgba";
type onChange = "doNothing" | "showPage" | "callMicroflow" | "callNanoflow";

export default class ColorPickerContainer extends Component<ColorPickerContainerProps, ColorPickerContainerState> {
    private subscriptionHandles: number[];
    private disabled = false;

    constructor(props: ColorPickerContainerProps) {
        super(props);

        this.subscriptionHandles = [];
        this.state = this.validateColor(props.mxObject);
    }

    render() {
        const { mxObject, readOnly, colorAttribute } = this.props;
        this.disabled = this.props.editable === "default"
            ? (!mxObject || readOnly || !!(colorAttribute && mxObject.isReadonlyAttr(colorAttribute)))
            : true;

        const maxLabelWidth = 11;
        if (this.props.label.trim()) {
            return createElement(Label, {
                className: this.props.class,
                label: this.props.label,
                style: ColorPickerContainer.parseStyle(this.props.style),
                weight: this.props.labelWidth > maxLabelWidth ? maxLabelWidth : this.props.labelWidth
            }, this.renderColorPicker(true));
        }

        return this.renderColorPicker();
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

    public static parseStyle(style = ""): {[key: string]: string} {
        try {
            return style.split(";").reduce<{[key: string]: string}>((styleObject, line) => {
                const pair = line.split(":");
                if (pair.length === 2) {
                    const name = pair[0].trim().replace(/(-.)/g, match => match[1].toUpperCase());
                    styleObject[name] = pair[1].trim();
                }
                return styleObject;
            }, {});
        } catch (error) {
            // tslint:disable-next-line no-console
            console.log("Failed to parse style", style, error);
        }

        return {};
    }

    private renderColorPicker(hasLabel = false) {
        const alertMessage = this.state.alertMessage || ColorPickerContainer.validateProps(this.props);

        return createElement(ColorPicker, {
            alertMessage,
            className: !hasLabel ? this.props.class : undefined,
            color: this.state.color,
            disabled: this.disabled,
            type: this.props.type,
            mode: this.props.mode,
            displayColorPicker: this.state.displayColorPicker,
            style: !hasLabel ? ColorPickerContainer.parseStyle(this.props.style) : undefined,
            onChange: this.updateColorValue,
            onChangeComplete: this.handleOnChange
        }, this.props.mode === "input"
                ? createElement(Input, {
                    disabled: this.disabled,
                    color: this.state.color,
                    onChange: this.handleInputChange
                }, this.renderColorPickerButton())
                : this.renderColorPickerButton()
        );
    }

    private renderColorPickerButton() {
        return createElement(Button, {
            className: this.props.mode === "input" ? "widget-color-picker-input-inner" : "widget-color-picker-inner",
            disabled: this.disabled,
            mode: this.props.mode,
            color: this.state.color,
            ...(!this.disabled && this.props.mode !== "inline")
                ? { onClick: this.handleClick, onBlur: this.handleClose }
                : {}
        });
    }

    private handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker });
    }

    private handleClose = () => {
        this.setState({ displayColorPicker: false });
    }

    private updateColorValue = (color: ColorResult) => {
        const { format, mxObject, colorAttribute } = this.props;
        if (color && mxObject && !this.disabled) {
            if (format === "hex") {
                mxObject.set(colorAttribute, color.hex);
            } else if (format === "rgb") {
                mxObject.set(colorAttribute, `rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})`);
            } else {
                mxObject.set(colorAttribute, `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`);
            }

            this.setState({ alertMessage: "" });
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
                color: "",
                displayColorPicker: false
            };
        }

        return { color, displayColorPicker: false };
    }

    private handleInputChange = (event: any) => {
        const newColor = event.target.value as string;
        if (newColor.length > 0) {
            this.setState({ alertMessage: "", color: event.target.value });
        } else {
            this.setState({ alertMessage: "Invalid color", color: event.target.value });
        }

    }

    private handleOnChange = () => {
        const { mxform, mxObject, onChangeEvent, onChangeMicroflow, onChangeNanoflow, onChangePage } = this.props;
        if (mxObject && !this.disabled) {
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
                    location: this.props.openPageLocation
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
