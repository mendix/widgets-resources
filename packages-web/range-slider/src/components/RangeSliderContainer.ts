import { Component, createElement } from "react";

import { BootstrapStyle, RangeSlider } from "./RangeSlider";

interface WrapperProps {
    class?: string;
    mxform: mxui.lib.form._FormBase;
    mxObject: mendix.lib.MxObject;
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

    constructor(props: RangeSliderContainerProps) {
        super(props);

        this.state = this.updateValues(props.mxObject);
        this.subscriptionHandles = [];
        this.handleChangeAction = this.handleChangeAction.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.subscriptionCallback = mxObject => () => this.setState(this.updateValues(mxObject));
    }

    render() {
        const disabled = !this.props.mxObject || this.props.readOnly
            || !!(this.props.lowerBoundAttribute && this.props.mxObject.isReadonlyAttr(this.props.lowerBoundAttribute))
            || !!(this.props.upperBoundAttribute && this.props.mxObject.isReadonlyAttr(this.props.upperBoundAttribute));

        const alertMessage = !disabled
            ? this.validateSettings(this.state) || this.validateValues()
            : "";

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

    componentWillReceiveProps(newProps: RangeSliderContainerProps) {
        this.resetSubscriptions(newProps.mxObject);
        this.setState(this.updateValues(newProps.mxObject));
    }

    componentWillUnmount() {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
    }

    public static parseStyle(style = ""): { [key: string]: string } {
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
            // tslint:disable-next-line no-console
            console.log("Failed to parse style", style, error);
        }

        return {};
    }

    private validateSettings(state: RangeSliderContainerState): string {
        const message: string[] = [];
        const { minimumValue, maximumValue, lowerBoundValue, upperBoundValue, stepValue } = state;
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
            if (validMin && validMax && (minimumValue >= maximumValue)) {
                message.push(`Minimum value ${minimumValue} should be less than the maximum value ${maximumValue}`);
            }
            if (!stepValue || stepValue <= 0) {
                message.push(`Step value ${stepValue} should be greater than 0`);
            }
            if (maximumValue && minimumValue && stepValue) {
                const quotient = Math.floor((maximumValue - minimumValue) / stepValue);
                const product = quotient * stepValue;
                const remainder = (maximumValue - minimumValue) - product;

                if (validMax && validMin && remainder > 0) {
                    message.push(`Step value is invalid: max - min (${maximumValue} - ${minimumValue})
                 should be evenly divisible by the step value ${stepValue}`);
                }
            }
        }

        return message.join(", ");
    }

    private onUpdate(value: number[]) {
        const { mxObject, lowerBoundAttribute, upperBoundAttribute } = this.props;
        if (mxObject && Array.isArray(value) && value.length > 0) {
            if (value[0] !== this.state.lowerBoundValue) {
                mxObject.set(lowerBoundAttribute, value[0]);
            } else {
                if (this.state.maximumValue && value[1] > this.state.maximumValue) {
                    mxObject.set(upperBoundAttribute, this.getValue(this.props.maxAttribute, mxObject));
                } else {
                    mxObject.set(upperBoundAttribute, value[1]);
                }

            }
        }
    }

    private updateValues(mxObject?: mendix.lib.MxObject): RangeSliderContainerState {
        const { lowerBoundAttribute, maxAttribute, minAttribute, upperBoundAttribute } = this.props;
        return {
            lowerBoundValue: this.getValue(lowerBoundAttribute, mxObject),
            maximumValue: this.getValue(maxAttribute, mxObject, this.props.staticMaximumValue),
            minimumValue: this.getValue(minAttribute, mxObject, this.props.staticMinimumValue),
            stepValue: this.getValue(this.props.stepAttribute, mxObject, this.props.stepValue),
            upperBoundValue: this.getValue(upperBoundAttribute, mxObject)
        };
    }

    private handleChangeAction(value: number) {
        if ((value || value === 0) && this.props.mxObject) {
            this.executeOnChangeAction(this.props.mxObject);
        }
    }

    private executeOnChangeAction(mxObject: mendix.lib.MxObject) {
        const { onChangeMicroflow, onChangeNanoflow, mxform } = this.props;
        if (onChangeMicroflow) {
            window.mx.ui.action(onChangeMicroflow, {
                error: (error) => window.mx.ui.error(
                    `An error occurred while executing microflow: ${onChangeMicroflow}: ${error.message}`
                ),
                params: {
                    applyto: "selection",
                    guids: [ mxObject.getGuid() ]
                }
            });
        }

        if (onChangeNanoflow.nanoflow) {
            const context = new mendix.lib.MxContext();
            context.setContext(mxObject.getEntity(), mxObject.getGuid());
            window.mx.data.callNanoflow({
                context,
                error: error => window.mx.ui.error(
                    `An error occurred while executing the on change nanoflow: ${error.message}`
                ),
                nanoflow: onChangeNanoflow,
                origin: mxform
            });
        }
    }

    private resetSubscriptions(mxObject?: mendix.lib.MxObject) {
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
            this.subscriptionHandles = attributes.map(attr => window.mx.data.subscribe({
                attr,
                callback: this.subscriptionCallback(mxObject),
                guid: mxObject.getGuid()
            }));
            this.subscriptionHandles.push(window.mx.data.subscribe({
                callback: this.subscriptionCallback(mxObject),
                guid: mxObject.getGuid()
            }));
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

    private getValue(attributeName: string, mxObject?: mendix.lib.MxObject, defaultValue?: number): number | undefined {
        if (mxObject && attributeName) {
            if (mxObject.get(attributeName) !== "") {
                return parseFloat(mxObject.get(attributeName) as string);
            }
        }

        return defaultValue;
    }
}
