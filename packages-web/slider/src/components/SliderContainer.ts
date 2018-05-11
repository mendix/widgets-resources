import { Component, createElement } from "react";

import { BootstrapStyle, Slider } from "./Slider";

interface WrapperProps {
    class: string;
    mxform: mxui.lib.form._FormBase;
    mxObject: mendix.lib.MxObject;
    style: string;
    readOnly: boolean;
}

interface SliderContainerProps extends WrapperProps {
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
        const { mxObject, readOnly, valueAttribute } = this.props;
        const disabled = this.props.editable === "default"
            ? (!mxObject || readOnly || !!(valueAttribute && mxObject.isReadonlyAttr(valueAttribute)))
            : true;

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

    componentWillReceiveProps(newProps: SliderContainerProps) {
        this.resetSubscriptions(newProps.mxObject);
        this.setState(this.updateValues(newProps.mxObject));
    }

    componentWillUnmount() {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
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

    private validateSettings(state: SliderContainerState): string {
        const message: string[] = [];
        const { minimumValue, maximumValue, stepValue } = state;
        const validMax = typeof maximumValue === "number";
        const validMin = typeof minimumValue === "number";
        if (!validMax) {
            message.push("Maximum value is required");
        }
        if (!validMin) {
            message.push("Minimum value is required");
        }
        if (typeof maximumValue === "number" && typeof minimumValue === "number") {
            if (validMin && validMax && (minimumValue > maximumValue)) {
                message.push(`Minimum value ${minimumValue} should be less than or equal to the maximum value ${maximumValue}`); // tslint:disable:max-line-length
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

    private updateValues(mxObject?: mendix.lib.MxObject): SliderContainerState {
        const value = this.getValue(this.props.valueAttribute, mxObject);

        return {
            maximumValue: this.getValue(this.props.maxAttribute, mxObject),
            minimumValue: this.getValue(this.props.minAttribute, mxObject),
            stepValue: this.getValue(this.props.stepAttribute, mxObject, this.props.stepValue),
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
            this.handleChange();
        }
    }

    private handleChange() {
        const { mxform, mxObject, onChangeMicroflow, onChangeNanoflow } = this.props;
        if (onChangeMicroflow) {
            window.mx.ui.action(onChangeMicroflow, {
                error: error =>
                    window.mx.ui.error(`An error occurred while executing microflow: ${onChangeMicroflow}: ${error.message}`),
                origin: mxform,
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

    // tslint:disable-next-line:max-line-length
    private getValue(attribute: string, mxObject?: mendix.lib.MxObject, defaultValue?: number): number | undefined {
        if (mxObject) {
            if (mxObject.get(attribute)) {
                return parseFloat(mxObject.get(attribute) as string);
            }
        }

        return defaultValue;
    }
}

export { SliderContainer as default, SliderContainerProps };
