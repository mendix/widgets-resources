import { Component, createElement } from "react";

import { Switch, SwitchProps, SwitchStatus } from "./Switch";
import { Label, LabelOrientation } from "./Label";

interface WrapperProps {
    class?: string;
    mxObject?: mendix.lib.MxObject;
    style?: string;
}

interface SwitchContainerProps extends WrapperProps {
    booleanAttribute: string;
    editable: "default" | "never";
    label: string;
    labelWidth: number;
    onChangeMicroflow: string;
    orientation: LabelOrientation;
}

interface SwitchContainerState {
    alertMessage?: string;
    isChecked?: boolean;
}

export default class SwitchContainer extends Component<SwitchContainerProps, SwitchContainerState> {
    private subscriptionHandles: number[];

    constructor(props: SwitchContainerProps) {
        super(props);

        this.subscriptionHandles = [];
        this.state = this.updateState(props.mxObject);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleValidations = this.handleValidations.bind(this);
        this.subscriptionCallback = this.subscriptionCallback.bind(this);

    }

    render() {
        const maxLabelWidth = 11;
        if (this.props.label.trim()) {
            return createElement(Label, {
                className: this.props.class,
                label: this.props.label,
                orientation: this.props.orientation,
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

    private renderSwitch(hasLabel = false) {
        const { editable, mxObject } = this.props;
        const enabled = editable === "default" && (mxObject && !mxObject.isReadonlyAttr(this.props.booleanAttribute));
        const status: SwitchStatus = mxObject
            ? enabled ? "enabled" : "disabled"
            : "no-context";

        return createElement(Switch, {
            alertMessage: this.state.alertMessage,
            className: !hasLabel ? this.props.class : undefined,
            isChecked: this.state.isChecked,
            onClick: this.handleToggle,
            status,
            style: !hasLabel ? this.props.style : undefined,
        } as SwitchProps);
    }

    private getAttributeValue(attribute: string, mxObject?: mendix.lib.MxObject): boolean {
        if (mxObject) {
            return mxObject.get(attribute) as boolean;
        }

        return false;
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
            // Inline validation suspended until popup issue is fixed i.e popup validations still show up too
            // this.subscriptionHandles.push(mx.data.subscribe({
            //     callback: this.handleValidations,
            //     guid: mxObject.getGuid(),
            //     val: true
            // }));
        }
    }

    private updateState(mxObject = this.props.mxObject): SwitchContainerState {
        return {
            alertMessage: "",
            isChecked: this.getAttributeValue(this.props.booleanAttribute, mxObject)
        };
    }

    private subscriptionCallback() {
        this.setState(this.updateState());
    }

    private handleValidations(validations: mendix.lib.ObjectValidation[]) {
        const validationMessage = validations[0].getErrorReason(this.props.booleanAttribute);
        if (validationMessage) this.setState({ alertMessage: validationMessage });
    }

    private executeAction(actionname: string, guid: string) {
        if (actionname) {
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
}
