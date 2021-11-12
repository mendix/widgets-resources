import { Component, createElement, ReactNode } from "react";

import { BootstrapStyle, RangeSlider } from "./RangeSlider";

interface WrapperProps {
    class?: string;
    mxform: mxui.lib.form._FormBase;
    mxObject?: mendix.lib.MxObject;
    style?: string;
    readOnly: boolean;
}

export interface RangeSliderContainerProps extends WrapperProps {
    bootstrapStyle: BootstrapStyle;
    maxAttribute: string;
    minAttribute: string;
    onChangeMicroflow: string;
    onChangeNanoflow: Nanoflow;
    stepValue: number;
    stepAttribute: string;
    noOfMarkers: number;
    tooltipText: string;
    decimalPlaces: number;
    readOnly: boolean;
    lowerBoundAttribute: string;
    upperBoundAttribute: string;
    staticMinimumValue: number;
    staticMaximumValue: number;
}

interface Nanoflow {
    nanoflow: object[];
    paramsSpec: { Progress: string };
}

interface RangeSliderContainerState {
    alertMessage?: string;
    maximumValue?: number;
    minimumValue?: number;
    lowerBoundValue?: number;
    upperBoundValue?: number;
    stepValue?: number;
}

export default class RangeSliderContainer extends Component<RangeSliderContainerProps, RangeSliderContainerState> {
    private subscriptionHandles: number[];
    private subscriptionCallback: (mxObject: mendix.lib.MxObject) => () => void;
    private selfUpdate = false;
    private previousUpperBoundValue?: number;
    private previousLowerBoundValue?: number;

    constructor(props: RangeSliderContainerProps) {
        super(props);

        this.state = this.updateValues(props.mxObject);
        this.handleChangeAction = this.handleChangeAction.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.subscriptionCallback = mxObject => () => {
            if (this.selfUpdate) {
                this.selfUpdate = false;
                return;
            }
            this.setState(this.updateValues(mxObject));
        };
        this.subscriptionHandles = [];
        this.resetSubscriptions(props.mxObject);
    }

    render(): ReactNode {
        const disabled =
            !this.props.mxObject ||
            this.props.readOnly ||
            this.props.mxObject.isReadonlyAttr(this.props.lowerBoundAttribute) ||
            this.props.mxObject.isReadonlyAttr(this.props.upperBoundAttribute);

        const alertMessage = !disabled ? this.validateSettings(this.state) || this.validateValues() : "";

        return createElement(RangeSlider, {
            alertMessage,
            bootstrapStyle: this.props.bootstrapStyle,
            className: this.props.class,
            decimalPlaces: this.props.decimalPlaces,
            disabled,
            lowerBound: this.state.lowerBoundValue,
            maxValue: this.state.maximumValue,
            minValue: this.state.minimumValue,
            noOfMarkers: this.props.noOfMarkers,
            onChange: this.handleChangeAction,
            onUpdate: this.onUpdate,
            stepValue: this.state.stepValue,
            style: RangeSliderContainer.parseStyle(this.props.style),
            tooltipText: this.props.tooltipText,
            upperBound: this.state.upperBoundValue
        });
    }

    UNSAFE_componentWillReceiveProps(newProps: RangeSliderContainerProps): void {
        this.resetSubscriptions(newProps.mxObject);
        this.setState(this.updateValues(newProps.mxObject));
    }

    componentWillUnmount(): void {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
    }

    private validateSettings(state: RangeSliderContainerState): string {
        const message: string[] = [];
        const { minimumValue, maximumValue, lowerBoundValue, upperBoundValue, stepValue } = state;
        const { lowerBoundAttribute, upperBoundAttribute } = this.props;
        const validMax = typeof maximumValue === "number";
        const validMin = typeof minimumValue === "number";

        if (!validMax) {
            message.push("Maximum value is required");
        }
        if (!validMin) {
            message.push("Minimum value is required");
        }
        if (typeof lowerBoundValue !== "number") {
            message.push("Lower bound value is required");
        }
        if (typeof upperBoundValue !== "number") {
            message.push("Upper bound value is required");
        }
        if (typeof maximumValue === "number" && typeof minimumValue === "number") {
            if (validMin && validMax && minimumValue >= maximumValue) {
                message.push(`Minimum value ${minimumValue} should be less than the maximum value ${maximumValue}`);
            }
            if (!stepValue || stepValue <= 0) {
                message.push(`Step value ${stepValue} should be greater than 0`);
            }
            if (maximumValue && minimumValue && stepValue) {
                const quotient = Math.floor((maximumValue - minimumValue) / stepValue);
                const product = quotient * stepValue;
                const remainder = maximumValue - minimumValue - product;

                if (validMax && validMin && remainder > 0) {
                    message.push(`Step value is invalid: max - min (${maximumValue} - ${minimumValue})
                 should be evenly divisible by the step value ${stepValue}`);
                }
            }
            if (
                (!this.isDecimal(lowerBoundAttribute) || !this.isDecimal(upperBoundAttribute)) &&
                stepValue &&
                stepValue % 1 !== 0
            ) {
                message.push(
                    `Step value ${stepValue} is invalid: it can not be a decimal as the attribute ${lowerBoundAttribute} and or attribute ${upperBoundAttribute} can not store decimals`
                );
            }
        }

        return message.join(", ");
    }

    private onUpdate(values: number[]): void {
        const { mxObject, lowerBoundAttribute, upperBoundAttribute } = this.props;

        if (mxObject && this.validValues(values)) {
            if (values[0] !== this.state.lowerBoundValue && !mxObject.isReadonlyAttr(lowerBoundAttribute)) {
                this.selfUpdate = true;
                mxObject.set(lowerBoundAttribute, values[0]);
            }
            if (values[1] !== this.state.upperBoundValue && !mxObject.isReadonlyAttr(upperBoundAttribute)) {
                this.selfUpdate = true;
                mxObject.set(upperBoundAttribute, values[1]);
            }
            this.setState({ lowerBoundValue: values[0], upperBoundValue: values[1] });
        }
    }

    private validValues(values: number[]): boolean {
        const { minimumValue, maximumValue } = this.state;
        const { lowerBoundAttribute, upperBoundAttribute } = this.props;
        return (
            Array.isArray(values) &&
            values.length === 2 &&
            typeof minimumValue === "number" &&
            typeof maximumValue === "number" &&
            typeof values[0] === "number" &&
            typeof values[1] === "number" &&
            minimumValue <= maximumValue &&
            values[0] >= minimumValue &&
            values[0] <= maximumValue &&
            values[1] >= minimumValue &&
            values[1] <= maximumValue &&
            values[0] <= values[1] &&
            (this.isDecimal(lowerBoundAttribute) || (!this.isDecimal(lowerBoundAttribute) && values[0] % 1 === 0)) &&
            (this.isDecimal(upperBoundAttribute) || (!this.isDecimal(upperBoundAttribute) && values[1] % 1 === 0))
        );
    }

    private updateValues(mxObject?: mendix.lib.MxObject): RangeSliderContainerState {
        const { lowerBoundAttribute, maxAttribute, minAttribute, upperBoundAttribute } = this.props;
        const lowerBoundValue = this.getValue(lowerBoundAttribute, mxObject);
        const upperBoundValue = this.getValue(upperBoundAttribute, mxObject);
        this.previousLowerBoundValue = lowerBoundValue;
        this.previousUpperBoundValue = upperBoundValue;

        return {
            lowerBoundValue,
            maximumValue: this.getValue(maxAttribute, mxObject, this.props.staticMaximumValue),
            minimumValue: this.getValue(minAttribute, mxObject, this.props.staticMinimumValue),
            stepValue: this.getValue(this.props.stepAttribute, mxObject, this.props.stepValue),
            upperBoundValue
        };
    }

    private handleChangeAction(value: number[]): void {
        if (this.previousLowerBoundValue === value[0] && this.previousUpperBoundValue === value[1]) {
            return;
        }
        this.previousLowerBoundValue = value[0];
        this.previousUpperBoundValue = value[1];

        if (value !== undefined && this.props.mxObject) {
            this.callOnChangeEvents(this.props.mxObject);
        }
    }

    private callOnChangeEvents(mxObject: mendix.lib.MxObject): void {
        const { onChangeMicroflow, onChangeNanoflow, mxform } = this.props;
        if (onChangeMicroflow) {
            window.mx.ui.action(onChangeMicroflow, {
                error: error =>
                    window.mx.ui.error(
                        `An error occurred while executing microflow: ${onChangeMicroflow}: ${error.message}`
                    ),
                params: {
                    applyto: "selection",
                    guids: [mxObject.getGuid()]
                }
            });
        }

        if (onChangeNanoflow.nanoflow) {
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
                this.props.upperBoundAttribute,
                this.props.lowerBoundAttribute,
                this.props.maxAttribute,
                this.props.minAttribute,
                this.props.stepAttribute
            ];
            this.subscriptionHandles = attributes.map(attr =>
                window.mx.data.subscribe({
                    attr,
                    callback: this.subscriptionCallback(mxObject),
                    guid: mxObject.getGuid()
                })
            );
            this.subscriptionHandles.push(
                window.mx.data.subscribe({
                    callback: this.subscriptionCallback(mxObject),
                    guid: mxObject.getGuid()
                })
            );
        }
    }

    private validateValues(): string {
        const message: string[] = [];
        const { minimumValue, maximumValue, lowerBoundValue, upperBoundValue } = this.state;
        if (typeof maximumValue === "number" && typeof minimumValue === "number") {
            if (typeof lowerBoundValue === "number") {
                if (lowerBoundValue > maximumValue) {
                    message.push(`Lower bound ${lowerBoundValue} should be less than the maximum ${maximumValue}`);
                }
                if (lowerBoundValue < minimumValue) {
                    message.push(`Lower bound ${lowerBoundValue} should be greater than the minimum ${minimumValue}`);
                }
            }
            if (typeof upperBoundValue === "number") {
                if (upperBoundValue > maximumValue) {
                    message.push(`Upper bound ${upperBoundValue} should be less than the maximum ${maximumValue}`);
                }
                if (upperBoundValue < minimumValue) {
                    message.push(`Upper bound ${upperBoundValue} should be greater than the minimum ${minimumValue}`);
                }
            }
        }

        return message.join(", ");
    }

    private isDecimal(attribute: string): boolean {
        return this.props.mxObject ? this.props.mxObject.getAttributeType(attribute) === "Decimal" : false;
    }

    private getValue(attributeName: string, mxObject?: mendix.lib.MxObject, defaultValue?: number): number | undefined {
        if (mxObject && attributeName && mxObject.get(attributeName) !== "") {
            return parseFloat(mxObject.get(attributeName) as string);
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
