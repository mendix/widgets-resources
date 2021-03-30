import { Component, ReactNode, SFCElement, createElement } from "react";

import { Switch, SwitchProps, SwitchStatus } from "./Switch";

interface WrapperProps {
    class?: string;
    mxform: mxui.lib.form._FormBase;
    mxObject?: mendix.lib.MxObject;
    style?: string;
    readOnly?: boolean;
    uniqueid: string;
}

interface SwitchContainerProps extends WrapperProps {
    booleanAttribute: string;
    colorStyle: ColorStyle;
    deviceStyle: DeviceStyle;
    editable: "default" | "never";
    label: string;
    labelWidth: number;
    onChangeMicroflow: string;
    onChangeNanoflow: Nanoflow;
}

interface SwitchContainerState {
    alertMessage?: string;
    isChecked?: boolean;
}

interface Nanoflow {
    nanoflow: object[];
    paramsSpec: { Progress: string };
}

type ColorStyle = "default" | "primary" | "inverse" | "info" | "warning" | "success" | "danger";
type DeviceStyle = "auto" | "android" | "iOS";

class SwitchContainer extends Component<SwitchContainerProps, SwitchContainerState> {
    private subscriptionHandles: number[];

    constructor(props: SwitchContainerProps) {
        super(props);

        this.subscriptionHandles = [];
        this.state = this.updateState(props.mxObject);
        this.handleToggle = this.handleToggle.bind(this);
        this.subscriptionCallback = this.subscriptionCallback.bind(this);
        this.handleValidations = this.handleValidations.bind(this);
        this.resetSubscriptions(props.mxObject);
    }

    render(): ReactNode {
        return this.renderSwitch();
    }

    UNSAFE_componentWillReceiveProps(newProps: SwitchContainerProps): void {
        this.resetSubscriptions(newProps.mxObject);
        this.setState(this.updateState(newProps.mxObject));
    }

    componentWillUnmount(): void {
        this.subscriptionHandles.forEach(mx.data.unsubscribe);
    }

    private renderSwitch(hasLabel = false): SFCElement<SwitchProps> {
        const { class: className, colorStyle, deviceStyle, style, uniqueid } = this.props;

        return createElement(Switch, {
            alertMessage: this.state.alertMessage,
            className: !hasLabel ? className : undefined,
            colorStyle,
            deviceStyle,
            isChecked: this.state.isChecked,
            onClick: this.handleToggle,
            status: this.getSwitchStatus(!this.isReadOnly()),
            style: !hasLabel ? SwitchContainer.parseStyle(style) : undefined,
            labelId: hasLabel ? `${uniqueid}_label` : undefined
        } as SwitchProps);
    }

    private getAttributeValue(attribute: string, mxObject?: mendix.lib.MxObject): boolean {
        return !!mxObject && (mxObject.get(attribute) as boolean);
    }

    private isReadOnly(): boolean {
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

    private handleToggle(): void {
        const { booleanAttribute, mxObject } = this.props;
        if (mxObject) {
            mxObject.set(booleanAttribute, !mxObject.get(booleanAttribute));
            this.executeAction(mxObject);
        }
    }

    private resetSubscriptions(mxObject?: mendix.lib.MxObject): void {
        this.subscriptionHandles.forEach(mx.data.unsubscribe);
        this.subscriptionHandles = [];

        if (mxObject) {
            this.subscriptionHandles.push(
                mx.data.subscribe({
                    callback: this.subscriptionCallback,
                    guid: mxObject.getGuid()
                })
            );

            this.subscriptionHandles.push(
                mx.data.subscribe({
                    attr: this.props.booleanAttribute,
                    callback: this.subscriptionCallback,
                    guid: mxObject.getGuid()
                })
            );

            this.subscriptionHandles.push(
                mx.data.subscribe({
                    callback: this.handleValidations,
                    guid: mxObject.getGuid(),
                    val: true
                })
            );
        }
    }

    private updateState(mxObject = this.props.mxObject): SwitchContainerState {
        return {
            alertMessage: "",
            isChecked: this.getAttributeValue(this.props.booleanAttribute, mxObject)
        };
    }

    private subscriptionCallback(): void {
        this.setState(this.updateState());
    }

    private handleValidations(validations: mendix.lib.ObjectValidation[]): void {
        const validationMessage = validations[0].getErrorReason(this.props.booleanAttribute);
        validations[0].removeAttribute(this.props.booleanAttribute);
        if (validationMessage) {
            this.setState({ alertMessage: validationMessage });
        }
    }

    private executeAction(mxObject: mendix.lib.MxObject): void {
        const { onChangeMicroflow, onChangeNanoflow, mxform } = this.props;

        if (onChangeMicroflow) {
            window.mx.data.action({
                error: error =>
                    window.mx.ui.error(`Error while executing microflow ${onChangeMicroflow}: ${error.message}`),
                origin: mxform,
                params: {
                    actionname: onChangeMicroflow,
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
                error: error => window.mx.ui.error(`Error while executing the on change nanoflow: ${error.message}`),
                nanoflow: onChangeNanoflow,
                origin: mxform
            });
        }
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
            // tslint:disable-next-line no-console
            window.console.error("Failed to parse style", style, error);
        }

        return {};
    }
}

export { ColorStyle, DeviceStyle, SwitchContainer as default, SwitchContainerProps };
