import { Component, createElement, ReactNode } from "react";
import { ColorState } from "react-color";
import classNames = require("classnames");

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
    defaultColors: Array<{ color: string }>;
    labelOrientation: "horizontal" | "vertical";
    showLabel: boolean;
    invalidFromatMessage: string;
}

interface ColorPickerContainerState {
    color: string;
    alertMessage?: string;
    displayColorPicker: boolean;
    hasValidationFeedback: boolean;
}

type Format = "hex" | "rgb" | "rgba";
type onChange = "doNothing" | "callMicroflow" | "callNanoflow";

export default class ColorPickerContainer extends Component<ColorPickerContainerProps, ColorPickerContainerState> {
    readonly state: ColorPickerContainerState = {
        alertMessage: "",
        color: "",
        displayColorPicker: false,
        hasValidationFeedback: false
    };

    private subscriptionHandles: number[] = [];
    private disabled = false;
    private previousColor = "";
    private colorChanged = false;
    private formHandle?: number;
    private defaultColor = {
        hex: "#FFFFFF",
        rgb: "rgb(255,255,255)",
        rgba: "rgb(255,255,255,1)"
    };

    constructor(props: ColorPickerContainerProps) {
        super(props);
        this.resetSubscriptions(props.mxObject);
    }

    render(): ReactNode {
        this.disabled = this.isReadOnly();
        if (this.props.showLabel) {
            return createElement(
                Label,
                {
                    className: classNames(this.props.class, "widget-color-picker"),
                    label: this.props.label,
                    orientation: this.props.labelOrientation,
                    style: ColorPickerContainer.parseStyle(this.props.style),
                    weight: this.props.labelWidth,
                    hasError: this.state.hasValidationFeedback
                },
                this.renderColorPicker(true)
            );
        }

        return this.renderColorPicker();
    }

    componentDidMount(): void {
        this.formHandle = this.props.mxform.listen("validate", (callback, error) => {
            const newState = this.validateColor(this.state.color);
            this.setState(newState);
            if (newState.hasValidationFeedback && error) {
                error(new mendix.lib.ValidationError({}));
            } else {
                callback();
            }
        });
    }

    UNSAFE_componentWillReceiveProps(newProps: ColorPickerContainerProps): void {
        this.resetSubscriptions(newProps.mxObject);
        this.setState(this.validateColor(this.getValue(newProps.mxObject)));
    }

    componentWillUnmount(): void {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
        if (this.formHandle) {
            this.props.mxform.unlisten(this.formHandle);
        }
    }

    private renderColorPicker(hasLabel = false): ReactNode {
        const alertMessage = this.state.alertMessage || ColorPickerContainer.validateProps(this.props);
        const className = !hasLabel
            ? classNames("widget-color-picker", this.props.class, { "has-error": this.state.hasValidationFeedback })
            : undefined;
        return createElement(
            ColorPicker,
            {
                alertMessage,
                className,
                color: this.state.color || this.defaultColor[this.props.format],
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
            },
            this.props.mode === "input" ? this.renderInput() : this.renderButton()
        );
    }

    private renderButton(): ReactNode {
        return createElement(Button, {
            className: this.props.mode === "input" ? "widget-color-picker-input-inner" : "widget-color-picker-inner",
            disabled: this.disabled,
            mode: this.props.mode,
            color: this.state.alertMessage ? this.getValue(this.props.mxObject) : this.state.color,
            onClick: this.handleClick,
            tabIndex: this.props.mode === "popover" ? 0 : -1
        });
    }

    private renderInput(): ReactNode {
        return createElement(
            Input,
            {
                disabled: this.disabled,
                color: this.state.color,
                onChange: this.handleInputChange,
                onKeyUp: this.handleKeyUpEvent
            },
            this.renderButton()
        );
    }

    private isReadOnly(): boolean {
        const { editable, mxObject, readOnly, colorAttribute } = this.props;

        return (
            editable !== "default" ||
            !mxObject ||
            readOnly ||
            !!(colorAttribute && mxObject.isReadonlyAttr(colorAttribute))
        );
    }

    private handleClick = (): void => {
        if (!this.disabled && this.props.mode !== "inline") {
            // eslint-disable-next-line react/no-access-state-in-setstate
            this.setState({ displayColorPicker: !this.state.displayColorPicker });
        }
    };

    private handleClose = (): void => {
        this.setState({ displayColorPicker: false });
    };

    private handleKeyUpEvent = (event: KeyboardEvent) => {
        if (event.keyCode === 40) {
            this.handleClick();
        }
    };

    private updateColorValue = (color: ColorState): void => {
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
    };

    private getValue = (mxObject?: mendix.lib.MxObject): string => {
        return mxObject ? (mxObject.get(this.props.colorAttribute) as string) : "";
    };

    private resetSubscriptions(mxObject?: mendix.lib.MxObject): void {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
        this.subscriptionHandles = [];

        if (mxObject) {
            this.subscriptionHandles.push(
                window.mx.data.subscribe({
                    attr: this.props.colorAttribute,
                    callback: this.handleSubscriptions,
                    guid: mxObject.getGuid()
                })
            );
            this.subscriptionHandles.push(
                window.mx.data.subscribe({
                    callback: this.handleSubscriptions,
                    guid: mxObject.getGuid()
                })
            );
            this.subscriptionHandles.push(
                window.mx.data.subscribe({
                    val: true,
                    callback: this.handleValidations,
                    guid: mxObject.getGuid()
                })
            );
        }
    }

    private handleSubscriptions = (): void => {
        this.setState(this.validateColor(this.getValue(this.props.mxObject)));
    };

    private handleValidations = (validations: mendix.lib.ObjectValidation[]): void => {
        if (this.isReadOnly()) {
            return;
        }

        const validation = validations.length ? validations[0].getErrorReason(this.props.colorAttribute) : undefined;
        if (validation !== undefined) {
            this.setState({ alertMessage: validation, hasValidationFeedback: true });
            validations[0].removeAttribute(this.props.colorAttribute);
        }
    };

    private validateColor = (color: string): ColorPickerContainerState => {
        const validFormat = ColorPickerContainer.validateColorFormat(color, this.props.format);

        return {
            alertMessage: validFormat ? this.props.invalidFromatMessage.replace(/\{1}/, validFormat) : "",
            hasValidationFeedback: !!validFormat,
            color,
            displayColorPicker: this.state.displayColorPicker
        };
    };

    private handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newColor = event.target.value as string;
        if (newColor) {
            this.colorChanged = this.getValue(this.props.mxObject) !== newColor;
            const state = this.validateColor(event.target.value);
            this.updateColorAttribute(newColor, this.props.mxObject);
            this.setState(state);
        } else {
            this.updateColorAttribute(newColor, this.props.mxObject);
            this.setState({
                alertMessage: "",
                color: event.target.value,
                hasValidationFeedback: false
            });
        }
    };

    private updateColorAttribute = (color: string, mxObject?: mendix.lib.MxObject): void => {
        if (mxObject) {
            mxObject.set(this.props.colorAttribute, color);
            this.handleOnChange();
        }
    };

    private handleOnChange = (): void => {
        const { mxform, mxObject, onChangeEvent, onChangeMicroflow, onChangeNanoflow } = this.props;
        if (mxObject && (this.previousColor !== this.state.color || this.colorChanged)) {
            const context = new mendix.lib.MxContext();
            context.setContext(mxObject.getEntity(), mxObject.getGuid());
            if (onChangeEvent === "callMicroflow" && onChangeMicroflow) {
                window.mx.ui.action(onChangeMicroflow, {
                    error: error =>
                        window.mx.ui.error(`Error while executing microflow ${onChangeMicroflow}: ${error.message}`), // tslint:disable-line max-line-length
                    params: {
                        applyto: "selection",
                        guids: [mxObject.getGuid()]
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
    };

    static validateColorFormat = (color: string, colorFormat: Format): string => {
        const hexRegExp = /^#?([a-f\d]{3}|[a-f\d]{6})$/;
        const rgbRegExp = /^rgb\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\)$/;
        const rgbaRegExp = /^rgba\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0?\.\d*|0|1(\.0)?)\)$/;
        let format = "";
        if (color && colorFormat === "hex" && !hexRegExp.test(color.toLowerCase())) {
            format = "'#0d0' or '#d0d0d0'";
        } else if (color && colorFormat === "rgb" && !rgbRegExp.test(color.toLowerCase())) {
            format = "'rgb(115,159,159)'";
        } else if (color && colorFormat === "rgba" && !rgbaRegExp.test(color.toLowerCase())) {
            format = "'rgba(195,226,226,1)'";
        }

        return format;
    };

    static validateProps(props: ColorPickerContainerProps): string {
        const message: string[] = [];
        const supportDefaultColors =
            props.type === "block" ||
            props.type === "sketch" ||
            props.type === "circle" ||
            props.type === "compact" ||
            props.type === "twitter";
        if (props.onChangeEvent === "callMicroflow" && !props.onChangeMicroflow) {
            message.push("On change event is set to 'Call a microflow' but no microflow is selected");
        } else if (
            props.onChangeEvent === "callNanoflow" &&
            JSON.stringify(props.onChangeNanoflow) === JSON.stringify({})
        ) {
            message.push("On change event is set to 'Call a nanoflow' but no nanoflow is selected");
        }
        if (props.label.trim() && props.showLabel && (props.labelWidth > 11 || props.labelWidth < 1)) {
            message.push("Label width should be a value between 0 and 12");
        }
        if (props.defaultColors.length > 0 && supportDefaultColors) {
            props.defaultColors.forEach(color => {
                const validFormat = ColorPickerContainer.validateColorFormat(color.color, props.format);
                if (validFormat) {
                    message.push(`${color.color}, ${props.invalidFromatMessage.replace(/\{1}/, validFormat)}`);
                }
            });
        }
        if (message.length) {
            const errorMessage = `Configuration error in widget ${props.friendlyId}: ${message.join(", ")}`;
            ColorPickerContainer.logError(errorMessage);
            return errorMessage;
        }

        return message.join(", ");
    }

    static parseStyle(style = ""): { [key: string]: string } {
        try {
            return style.split(";").reduce<{ [key: string]: string }>((styleObject, line) => {
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

    static logError(message: string, style?: string, error?: any): void {
        console.error(message, style, error);
    }
}
