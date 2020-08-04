import { Component, createElement, ReactNode } from "react";

import { BootstrapStyle, Slider } from "./Slider";

interface WrapperProps {
    class: string;
    mxform: mxui.lib.form._FormBase;
    mxObject?: mendix.lib.MxObject;
    style: string;
    readOnly: boolean;
}

export interface SliderContainerProps extends WrapperProps {
    bootstrapStyle: BootstrapStyle;
    decimalPlaces: number;
    maxAttribute: string;
    minAttribute: string;
    noOfMarkers: number;
    onChangeMicroflow: string;
    onChangeNanoflow: Nanoflow;
    readOnly: boolean;
    stepValue: number;
    stepAttribute: string;
    tooltipText: string;
    valueAttribute: string;
    editable: "default" | "never";
    staticMaximumValue: number;
    staticMinimumValue: number;
}

interface Nanoflow {
    nanoflow: object[];
    paramsSpec: { Progress: string };
}

interface SliderContainerState {
    maximumValue?: number;
    minimumValue?: number;
    stepValue?: number;
    value: number | null;
}

export default class SliderContainer extends Component<SliderContainerProps, SliderContainerState> {
    private subscriptionHandles: number[];
    private attributeCallback: (mxObject: mendix.lib.MxObject) => () => void;
    private selfUpdate = false;
    private previousValue?: number;

    constructor(props: SliderContainerProps) {
        super(props);

        this.state = this.updateValues(props.mxObject);
        this.subscriptionHandles = [];
        this.handleAction = this.handleAction.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.attributeCallback = mxObject => () => {
            if (this.selfUpdate) {
                this.selfUpdate = false;
                return;
            }
            this.setState(this.updateValues(mxObject));
        };
        this.resetSubscriptions(props.mxObject);
    }

    render(): ReactNode {
        const { mxObject, readOnly, valueAttribute } = this.props;
        const disabled =
            this.props.editable === "default" ? readOnly || !mxObject || mxObject.isReadonlyAttr(valueAttribute) : true;

        const alertMessage = !disabled ? this.validateSettings(this.state) || this.validateValues() : "";

        return createElement(Slider, {
            alertMessage,
            bootstrapStyle: this.props.bootstrapStyle,
            className: this.props.class,
            decimalPlaces: this.props.decimalPlaces,
            disabled,
            maxValue: this.state.maximumValue,
            minValue: this.state.minimumValue,
            noOfMarkers: this.props.noOfMarkers,
            onChange: this.handleAction,
            onUpdate: this.onUpdate,
            stepValue: this.state.stepValue,
            style: SliderContainer.parseStyle(this.props.style),
            tooltipText: this.props.tooltipText,
            value: this.state.value
        });
    }

    UNSAFE_componentWillReceiveProps(newProps: SliderContainerProps): void {
        this.resetSubscriptions(newProps.mxObject);
        this.setState(this.updateValues(newProps.mxObject));
    }

    componentWillUnmount(): void {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
    }

    private validateSettings(state: SliderContainerState): string {
        const message: string[] = [];
        const { minimumValue, maximumValue, stepValue } = state;
        const validMax = typeof maximumValue === "number";
        const validMin = typeof minimumValue === "number";

        if (maximumValue && minimumValue && stepValue) {
            const quotient = Math.floor((maximumValue - minimumValue) / stepValue);
            const product = quotient * stepValue;
            const remainder = maximumValue - minimumValue - product;

            if (validMax && validMin && remainder > 0) {
                message.push(
                    `Step value is invalid: max - min (${maximumValue} - ${minimumValue}) should be evenly divisible by the step value ${stepValue}`
                );
            }
        }
        if (!validMax) {
            message.push("Maximum value is required");
        }
        if (!validMin) {
            message.push("Minimum value is required");
        }
        if (typeof maximumValue === "number" && typeof minimumValue === "number") {
            if (validMin && validMax && minimumValue > maximumValue) {
                message.push(
                    `Minimum value ${minimumValue} should be less than or equal to the maximum value ${maximumValue}`
                );
            }
            if (!stepValue || stepValue <= 0) {
                message.push(`Step value ${stepValue} should be greater than 0`);
            }
        }

        return message.join(", ");
    }

    private updateValues(mxObject?: mendix.lib.MxObject): SliderContainerState {
        const value = this.getValue(this.props.valueAttribute, mxObject);
        this.previousValue = value;
        return {
            maximumValue: this.getValue(this.props.maxAttribute, mxObject, this.props.staticMaximumValue),
            minimumValue: this.getValue(this.props.minAttribute, mxObject, this.props.staticMinimumValue),
            stepValue: this.getValue(this.props.stepAttribute, mxObject, this.props.stepValue),
            value: value !== undefined ? value : null
        };
    }

    private onUpdate(value: number): void {
        const { mxObject, valueAttribute } = this.props;
        if (value !== undefined && mxObject) {
            this.setState({ value });
            if (this.validValue(value) && !mxObject.isReadonlyAttr(valueAttribute)) {
                this.selfUpdate = true;
                mxObject.set(valueAttribute, value);
            }
        }
    }

    private validValue(value: number): boolean {
        const { minimumValue, maximumValue } = this.state;
        return (
            typeof minimumValue === "number" &&
            typeof maximumValue === "number" &&
            typeof value === "number" &&
            minimumValue <= maximumValue &&
            value >= minimumValue &&
            value <= maximumValue
        );
    }

    private handleAction(value: number): void {
        if (value !== undefined && this.props.mxObject) {
            if (this.previousValue === value) {
                return;
            }
            this.previousValue = value;
            this.handleChange();
        }
    }

    private handleChange(): void {
        const { mxform, mxObject, onChangeMicroflow, onChangeNanoflow } = this.props;
        if (onChangeMicroflow && mxObject) {
            window.mx.data.action({
                error: error =>
                    window.mx.ui.error(
                        `An error occurred while executing microflow: ${onChangeMicroflow}: ${error.message}`
                    ),
                origin: mxform,
                params: {
                    actionname: onChangeMicroflow,
                    applyto: "selection",
                    guids: [mxObject.getGuid()]
                }
            });
        }

        if (onChangeNanoflow.nanoflow && mxObject) {
            const context = new mendix.lib.MxContext();
            context.setContext(mxObject.getEntity(), mxObject.getGuid());
            window.mx.data.callNanoflow({
                context,
                error: error =>
                    window.mx.ui.error(`An error occurred while executing the on change nanoflow: ${error.message}`),
                nanoflow: onChangeNanoflow,
                origin: mxform
            });
        }
    }

    private resetSubscriptions(mxObject?: mendix.lib.MxObject): void {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
        this.subscriptionHandles = [];

        if (mxObject) {
            const attributes = [
                this.props.valueAttribute,
                this.props.maxAttribute,
                this.props.minAttribute,
                this.props.stepAttribute
            ];
            this.subscriptionHandles = attributes.map(attr =>
                window.mx.data.subscribe({
                    attr,
                    callback: this.attributeCallback(mxObject),
                    guid: mxObject.getGuid()
                })
            );
            this.subscriptionHandles.push(
                window.mx.data.subscribe({
                    callback: this.attributeCallback(mxObject),
                    guid: mxObject.getGuid()
                })
            );
        }
    }

    private validateValues(): string {
        const message: string[] = [];
        const { minimumValue, maximumValue, value } = this.state;
        if (typeof minimumValue === "number" && typeof maximumValue === "number" && typeof value === "number") {
            if (value > maximumValue) {
                message.push(`Value ${value} should be equal or less than the maximum ${maximumValue}`);
            }
            if (value < minimumValue) {
                message.push(`Value ${value} should be equal or greater than the minimum ${minimumValue}`);
            }
        }

        return message.join(", ");
    }

    private getValue(attribute: string, mxObject?: mendix.lib.MxObject, defaultValue?: number): number | undefined {
        if (mxObject && attribute) {
            if (mxObject.get(attribute)) {
                return parseFloat(mxObject.get(attribute) as string);
            }
        }

        return defaultValue;
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
            // eslint-disable-next-line no-console
            console.log("Failed to parse style", style, error);
        }

        return {};
    }
}
