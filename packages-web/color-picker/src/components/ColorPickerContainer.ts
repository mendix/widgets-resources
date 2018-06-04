import { Component, createElement } from "react";
import { ColorResult } from "react-color";

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
    friendlyId: string;
}

interface Nanoflow {
    nanoflow: object[];
    paramsSpec: { Progress: string };
}

export interface ColorPickerContainerProps extends WrapperProps {
    colorAttribute: string;
    editable: "default" | "never";
    format: Format;
    mode: Mode;
    type: PickerType;
    label: string;
    labelWidth: number;
    onChangeEvent: onChange;
    onChangeMicroflow: string;
    onChangeNanoflow: Nanoflow;
    defaultColors: string[];
}

interface ColorPickerContainerState {
    color: string;
    alertMessage?: string;
    displayColorPicker: boolean;
}

type Format = "hex" | "rgb" | "rgba";
type onChange = "doNothing" | "callMicroflow" | "callNanoflow";

export default class ColorPickerContainer extends Component<ColorPickerContainerProps, ColorPickerContainerState> {
    private subscriptionHandles: number[] = [];
    private disabled = false;
    private previousColor = "";
    private colorChanged = false;

    constructor(props: ColorPickerContainerProps) {
        super(props);

        this.state = {
            alertMessage: "",
            color: "",
            displayColorPicker: false
        };
    }

    render() {
        this.disabled = this.isReadOnly();
        if (this.props.label.trim()) {
            return createElement(Label, {
                className: this.props.class,
                label: this.props.label,
                style: ColorPickerContainer.parseStyle(this.props.style),
                weight: this.props.labelWidth
            }, this.renderColorPicker(true));
        }

        return this.renderColorPicker();
    }

    componentWillReceiveProps(newProps: ColorPickerContainerProps) {
        this.resetSubscriptions(newProps.mxObject);
        this.setState(this.validateColor(this.getValue(newProps.mxObject)));
    }

    componentWillUnmount() {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
    }

    private renderColorPicker(hasLabel = false) {
        ColorPickerContainer.validateProps(this.props);

        return createElement(ColorPicker, {
            alertMessage: this.state.alertMessage,
            className: !hasLabel ? this.props.class : undefined,
            color: this.state.color,
            defaultColors: this.props.defaultColors,
            disabled: this.disabled,
            disableAlpha: this.props.format !== "rgba",
            displayColorPicker: this.state.displayColorPicker,
            type: this.props.type,
            mode: this.props.mode,
            close: this.handleClose,
            style: !hasLabel ? ColorPickerContainer.parseStyle(this.props.style) : undefined,
            onChange: this.updateColorValue,
            onChangeComplete: this.handleOnChange
        }, this.props.mode === "input"
                ? this.renderInput()
                : this.renderButton()
        );
    }

    private renderButton() {
        return createElement(Button, {
            className: this.props.mode === "input" ? "widget-color-picker-input-inner" : "widget-color-picker-inner",
            disabled: this.disabled,
            mode: this.props.mode,
            color: this.state.alertMessage ? this.getValue(this.props.mxObject) : this.state.color,
            onClick: this.handleClick,
            tabIndex: this.props.mode === "popover" ? 0 : -1
        });
    }

    private renderInput() {
        return createElement(Input, {
            disabled: this.disabled,
            color: this.state.color,
            onChange: this.handleInputChange,
            onKeyUp: this.handleKeyUpEvent,
            hasError: !!this.state.alertMessage
        }, this.renderButton());
    }

    private isReadOnly(): boolean {
        const { editable, mxObject, readOnly, colorAttribute } = this.props;

        return editable !== "default" || (!mxObject || readOnly || !!(colorAttribute && mxObject.isReadonlyAttr(colorAttribute)));
    }

    private handleClick = () => {
        if (!this.disabled && this.props.mode !== "inline") {
            this.setState({ displayColorPicker: !this.state.displayColorPicker });
        }
    }

    private handleClose = () => {
        this.setState({ displayColorPicker: false });
    }

    private handleKeyUpEvent = (event: KeyboardEvent) => {
        if (event.keyCode === 40) {
            this.handleClick();
        }
    }

    private updateColorValue = (color: ColorResult) => {
        const { format, mxObject, colorAttribute } = this.props;
        this.previousColor = this.getValue(this.props.mxObject);
        if (color && mxObject && !this.disabled) {
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
        return mxObject ? mxObject.get(this.props.colorAttribute) as string : "";
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
        this.setState(this.validateColor(this.getValue(this.props.mxObject)));
    }

    private validateColor = (color: string): ColorPickerContainerState => {
        const hexRegExp = /^#?([a-f\d]{3}|[a-f\d]{6})$/;
        const rgbRegExp = /^rgb\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\)$/;
        const rgbaRegExp = /^rgba\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0?\.\d*|1(\.0)?)\)$/;
        let message = "";
        if (color && this.props.format === "hex" && !hexRegExp.test(color)) {
            message = `Invalid hex format, color value ${color} should be of format '#0d0' or #d0d0d0'`;
        } else if (color && this.props.format === "rgb" && !rgbRegExp.test(color.toLowerCase())) {
            message = `Invalid rgb format, color value ${color} should be of format 'rgb(115,159,159)'`;
        } else if (color && this.props.format === "rgba" && !rgbaRegExp.test(color.toLowerCase())) {
            message = `Invalid rgba format, color value ${color} should be of format 'rgba(195,226,226,1)'`;
        }

        return {
            alertMessage: message,
            color,
            displayColorPicker: this.state.displayColorPicker
        };
    }

    private handleInputChange = (event: any) => {
        const newColor = event.target.value as string;
        if (newColor) {
            this.colorChanged = this.getValue(this.props.mxObject) !== newColor;
            const state = this.validateColor(event.target.value);
            if (!state.alertMessage && this.props.mxObject) {
                this.props.mxObject.set(this.props.colorAttribute, newColor);
                this.handleOnChange();
            }
            this.setState(state);
        } else {
            this.setState({ alertMessage: "Invalid color", color: event.target.value });
        }
    }

    private handleOnChange = () => {
        const { mxform, mxObject, onChangeEvent, onChangeMicroflow, onChangeNanoflow } = this.props;
        if (mxObject && ((this.previousColor !== this.state.color) || this.colorChanged)) {
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

    public static validateProps(props: ColorPickerContainerProps) {
        const message: string[] = [];
        if (props.onChangeEvent === "callMicroflow" && !props.onChangeMicroflow) {
            message.push("On change event is set to 'Call a microflow' but no microflow is selected");
        } else if (props.onChangeEvent === "callNanoflow" && (JSON.stringify(props.onChangeNanoflow) === JSON.stringify({}))) {
            message.push("On change event is set to 'Call a nanoflow' but no nanoflow is selected");
        }
        if (props.label.trim() && props.labelWidth > 11) {
            message.push("Label width should not be greater than 11");
        }

        if (message.length) {
            ColorPickerContainer.logError(`Configuration error in widget ${props.friendlyId}: ${message.join(", ")}`);
        }
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
            ColorPickerContainer.logError("Failed to parse style", style, error);
        }

        return {};
    }

    public static logError(message: string, style?: string, error?: any) {
        // tslint:disable-next-line:no-console
        window.logger ? window.logger.error(message) : console.log(message, style, error);
    }
}
