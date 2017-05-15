import { Component, SFCElement, createElement } from "react";

import { Switch, SwitchProps, SwitchStatus } from "./Switch";
import { Label } from "./Label";

interface WrapperProps {
    class?: string;
    mxObject?: mendix.lib.MxObject;
    style?: string;
    readOnly?: boolean;
}

interface SwitchContainerProps extends WrapperProps {
    booleanAttribute: string;
    bootstrapStyle: BootstrapStyle;
    deviceStyle: DeviceStyle;
    editable: "default" | "never";
    label: string;
    labelWidth: number;
    onChangeMicroflow: string;
}

interface SwitchContainerState {
    isChecked?: boolean;
}

type BootstrapStyle = "default" | "primary" | "info" | "warning" | "success" | "danger";
type DeviceStyle = "auto" | "android" | "iOS";

class SwitchContainer extends Component<SwitchContainerProps, SwitchContainerState> {
    private subscriptionHandles: number[];

    constructor(props: SwitchContainerProps) {
        super(props);

        this.subscriptionHandles = [];
        this.state = this.updateState(props.mxObject);
        this.handleToggle = this.handleToggle.bind(this);
        this.subscriptionCallback = this.subscriptionCallback.bind(this);

    }

    render() {
        const maxLabelWidth = 11;
        if (this.props.label.trim()) {
            return createElement(Label, {
                className: `${this.props.deviceStyle} ${this.props.class}`,
                label: this.props.label,
                style: SwitchContainer.parseStyle(this.props.style),
                weight: this.props.labelWidth > maxLabelWidth ? maxLabelWidth : this.props.labelWidth
            }, this.renderSwitch(true));
        }

        return this.renderSwitch();
    }

    componentWillReceiveProps(newProps: SwitchContainerProps) {
        this.resetSubscriptions(newProps.mxObject);
        this.setState(this.updateState(newProps.mxObject));
    }

    componentWillUnmount() {
        this.subscriptionHandles.forEach(mx.data.unsubscribe);
    }

    private renderSwitch(hasLabel = false): SFCElement<SwitchProps> {
        const { bootstrapStyle, class: className, deviceStyle, style } = this.props;

        return createElement(Switch, {
            bootstrapStyle,
            className: !hasLabel ? className : undefined,
            deviceStyle,
            isChecked: this.state.isChecked,
            onClick: this.handleToggle,
            status: this.getSwitchStatus(!this.isReadOnly()),
            style: !hasLabel ? SwitchContainer.parseStyle(style) : undefined
        } as SwitchProps);
    }

    private getAttributeValue(attribute: string, mxObject?: mendix.lib.MxObject): boolean {
        return !!mxObject && mxObject.get(attribute) as boolean;
    }

    private isReadOnly() {
        const { booleanAttribute, editable, mxObject, readOnly } = this.props;
        if (editable === "default" && mxObject) {
            return readOnly || mxObject.isReadonlyAttr(booleanAttribute);
        }

        return true;
    }

    private getSwitchStatus(enabled: boolean): SwitchStatus {
        if (this.props.mxObject) {
            return enabled ? "enabled" : "disabled";
        }

        return "no-context";
    }

    private handleToggle() {
        const { booleanAttribute, mxObject, onChangeMicroflow } = this.props;
        if (mxObject) {
            mxObject.set(booleanAttribute, !mxObject.get(booleanAttribute));
            this.executeAction(onChangeMicroflow, mxObject.getGuid());
        }
    }

    private resetSubscriptions(mxObject?: mendix.lib.MxObject) {
        this.subscriptionHandles.forEach(mx.data.unsubscribe);
        this.subscriptionHandles = [];

        if (mxObject) {
            this.subscriptionHandles.push(mx.data.subscribe({
                callback: this.subscriptionCallback,
                guid: mxObject.getGuid()
            }));

            this.subscriptionHandles.push(mx.data.subscribe({
                attr: this.props.booleanAttribute,
                callback: this.subscriptionCallback,
                guid: mxObject.getGuid()
            }));
        }
    }

    private updateState(mxObject = this.props.mxObject): SwitchContainerState {
        return {
            isChecked: this.getAttributeValue(this.props.booleanAttribute, mxObject)
        };
    }

    private subscriptionCallback() {
        this.setState(this.updateState());
    }

    private executeAction(actionname: string, guid: string) {
        if (actionname && this.props.mxObject) {
            window.mx.ui.action(actionname, {
                error: (error) =>
                    window.mx.ui.error(`Error while executing microflow ${actionname}: ${error.message}`),
                params: {
                    applyto: "selection",
                    guids: [ guid ]
                }
            });
        }
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
            console.log("Failed to parse style", style, error);
        }

        return {};
    }
}

export { BootstrapStyle, DeviceStyle, SwitchContainer as default, SwitchContainerProps };
