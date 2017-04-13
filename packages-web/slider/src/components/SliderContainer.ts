import { Component, createElement } from "react";

import { BootstrapStyle, Slider } from "./Slider";

interface WrapperProps {
    class?: string;
    mxObject?: mendix.lib.MxObject;
    style?: string;
}

interface SliderContainerProps extends WrapperProps {
    bootstrapStyle: BootstrapStyle;
    decimalPlaces: number;
    maxAttribute: string;
    minAttribute: string;
    noOfMarkers: number;
    onChangeMicroflow: string;
    readOnly: boolean;
    stepValue: number;
    stepAttribute: string;
    tooltipText: string;
    valueAttribute: string;
}

interface SliderContainerState {
    maximumValue?: number;
    minimumValue?: number;
    stepValue?: number;
    value: number | null;
}

class SliderContainer extends Component<SliderContainerProps, SliderContainerState> {
    private subscriptionHandles: number[];
    private attributeCallback: (mxObject: mendix.lib.MxObject) => () => void;

    constructor(props: SliderContainerProps) {
        super(props);

        this.state = this.updateValues(props.mxObject);
        this.subscriptionHandles = [];
        this.handleAction = this.handleAction.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.attributeCallback = mxObject => () => this.setState(this.updateValues(mxObject));
    }

    render() {
        const disabled = !this.props.mxObject
            || !!(this.props.stepAttribute && this.props.mxObject.isReadonlyAttr(this.props.stepAttribute));

        const alertMessage = !disabled ? this.validateSettings() || this.validateValues() : "";

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

    componentWillReceiveProps(newProps: SliderContainerProps) {
        this.resetSubscriptions(newProps.mxObject);
        this.setState(this.updateValues(newProps.mxObject));
    }

    componentWillUnmount() {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
    }

    private updateValues(mxObject?: mendix.lib.MxObject): SliderContainerState {
        const value = SliderContainer.getValue(this.props.valueAttribute, mxObject, null);

        return {
            maximumValue: SliderContainer.getValue(this.props.maxAttribute, mxObject, undefined),
            minimumValue: SliderContainer.getValue(this.props.minAttribute, mxObject, undefined),
            stepValue: SliderContainer.getValue(this.props.stepAttribute, mxObject, this.props.stepValue),
            value: (value || value === 0) ? value : null
        };
    }

    private onUpdate(value: number) {
        const { mxObject, valueAttribute } = this.props;
        const { maximumValue } = this.state;
        if ((value || value === 0) && mxObject) {
            if ((maximumValue || maximumValue === 0) && (value > maximumValue)) {
                mxObject.set(valueAttribute, maximumValue);
            } else {
                mxObject.set(valueAttribute, value);
            }
        }
    }

    private handleAction(value: number) {
        if ((value || value === 0) && this.props.mxObject) {
            this.executeMicroflow(this.props.onChangeMicroflow, this.props.mxObject.getGuid());
        }
    }

    private executeMicroflow(actionName: string, guid: string) {
        if (actionName) {
            window.mx.ui.action(actionName, {
                error: error =>
                    window.mx.ui.error(`An error occurred while executing microflow: ${actionName}: ${error.message}`),
                params: {
                    applyto: "selection",
                    guids: [ guid ]
                }
            });
        }
    }

    private resetSubscriptions(mxObject?: mendix.lib.MxObject) {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
        this.subscriptionHandles = [];

        if (mxObject) {
            const attributes = [
                this.props.valueAttribute,
                this.props.maxAttribute,
                this.props.minAttribute,
                this.props.stepAttribute
            ];
            this.subscriptionHandles = attributes.map(attr => window.mx.data.subscribe({
                attr,
                callback: this.attributeCallback(mxObject),
                guid: mxObject.getGuid()
            }));
            this.subscriptionHandles.push(window.mx.data.subscribe({
                callback: this.attributeCallback(mxObject),
                guid: mxObject.getGuid()
            }));
        }
    }

    private validateSettings(): string {
        const message: string[] = [];
        const { minimumValue, maximumValue, stepValue } = this.state;
        const validMax = typeof maximumValue === "number";
        const validMin = typeof minimumValue === "number";
        if (!validMax) {
            message.push("Maximum value is required");
        }
        if (!validMin) {
            message.push("Minimum value is required");
        }
        if (typeof maximumValue === "number" && typeof minimumValue === "number") {
            if (validMin && validMax && (minimumValue >= maximumValue)) {
                message.push(`Minimum value ${minimumValue} should be less than the maximum value ${maximumValue}`);
            }
            if (!stepValue || stepValue <= 0) {
                message.push(`Step value ${stepValue} should be greater than 0`);
            } else if (validMax && validMin && (maximumValue - minimumValue) % stepValue > 0) {
                message.push(`Step value is invalid: max - min (${maximumValue} - ${minimumValue})
             should be evenly divisible by the step value ${stepValue}`);
            }
        }

        return message.join(", ");
    }

    private validateValues(): string {
        const message: string[] = [];
        const { minimumValue, maximumValue, value } = this.state;
        if (typeof minimumValue === "number" && typeof maximumValue === "number" && typeof value === "number") {
            if (value > maximumValue) {
                message.push(`Value ${value} should be less than the maximum ${maximumValue}`);
            }
            if (value < minimumValue) {
                message.push(`Value ${value} should be greater than the minimum ${minimumValue}`);
            }
        }

        return message.join(", ");
    }

    private static parseStyle(style = ""): {[key: string]: string} {
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
            console.log("Failed to parse style", style, error);
        }

        return {};
    }

    private static getValue<T>(attribute?: string, mxObject?: mendix.lib.MxObject, defaultValue?: T): number | T | undefined {
        if (mxObject && attribute) {
            if (mxObject.get(attribute)) {
                return parseFloat(mxObject.get(attribute) as string);
            }
        }

        return defaultValue;
    }
}

export { SliderContainer as default, SliderContainerProps };
