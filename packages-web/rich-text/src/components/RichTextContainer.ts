import { Component, createElement, ReactNode } from "react";

import { CommonRichTextProps, RichText, TabOptions } from "./RichText";
import { ValidateConfigs } from "./ValidateConfigs";

import { getValue, parseStyle } from "../utils/ContainerUtils";

interface WrapperProps {
    class: string;
    mxform: mxui.lib.form._FormBase;
    mxObject?: mendix.lib.MxObject;
    style: string;
    readOnly: boolean;
}

export interface RichTextContainerProps extends WrapperProps, CommonRichTextProps {
    stringAttribute: string;
    sanitizeContent: boolean;
    editable: "default" | "never";
    onChangeMicroflow: string;
    onChangeNanoflow: Nanoflow;
    tabAction: TabOptions;
}

interface Nanoflow {
    nanoflow: object[];
    paramsSpec: { Progress: string };
}

interface RichTextContainerState {
    alertMessage: string;
    value: string;
}

export type ReadOnlyStyle = "bordered" | "text" | "borderedToolbar";

export default class RichTextContainer extends Component<RichTextContainerProps, RichTextContainerState> {
    private subscriptionHandles: number[] = [];
    private defaultValue: string | null | undefined;
    private isEditing = false;

    constructor(props: RichTextContainerProps) {
        super(props);

        this.state = {
            alertMessage: "",
            value: getValue(props.stringAttribute, "", props.mxObject) as string
        };
        this.resetSubscriptions(props.mxObject);
    }

    UNSAFE_componentWillMount(): void {
        this.handleOnChange = this.handleOnChange.bind(this);
        this.executeOnChangeAction = this.executeOnChangeAction.bind(this);
        this.handleSubscriptions = this.handleSubscriptions.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleValidations = this.handleValidations.bind(this);
    }

    render(): ReactNode {
        const readOnly = this.isReadOnly();
        return createElement(
            ValidateConfigs,
            { ...(this.props as RichTextContainerProps), showOnError: false },
            createElement(RichText, {
                editorOption: this.props.editorOption,
                tabAction: this.props.tabAction,
                theme: this.props.theme,
                customOptions: this.props.customOptions,
                minNumberOfLines: this.props.minNumberOfLines,
                maxNumberOfLines: this.props.maxNumberOfLines,
                readOnlyStyle: this.props.mxObject ? this.props.readOnlyStyle : "bordered",
                className: this.props.class,
                style: parseStyle(this.props.style),
                sanitizeContent: this.props.sanitizeContent,
                translatable: this.props.editable === "never" || this.props.readOnly,
                value: this.state.value,
                onChange: !readOnly ? this.handleOnChange : undefined,
                onBlur: !readOnly ? this.executeOnChangeAction : undefined,
                readOnly,
                alertMessage: this.state.alertMessage
            })
        );
    }

    UNSAFE_componentWillReceiveProps(newProps: RichTextContainerProps): void {
        if (newProps.mxObject !== this.props.mxObject) {
            this.resetSubscriptions(newProps.mxObject);
            this.defaultValue = getValue(newProps.stringAttribute, "", newProps.mxObject) as string;
            this.setState({ value: this.defaultValue });
        }
    }

    componentWillUnmount(): void {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
    }

    private isReadOnly(): boolean {
        return (
            !this.props.mxObject ||
            this.props.editable === "never" ||
            this.props.readOnly ||
            this.props.mxObject.isReadonlyAttr(this.props.stringAttribute)
        );
    }

    private resetSubscriptions(mxObject?: mendix.lib.MxObject): void {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
        this.subscriptionHandles = [];

        if (mxObject) {
            const commonOptions = {
                callback: this.handleSubscriptions,
                guid: mxObject.getGuid()
            };
            this.subscriptionHandles = [
                window.mx.data.subscribe(commonOptions),
                window.mx.data.subscribe({ attr: this.props.stringAttribute, ...commonOptions }),
                window.mx.data.subscribe({
                    callback: this.handleValidations,
                    guid: mxObject.getGuid(),
                    val: true
                })
            ];

            this.props.mxform.listen("submit", this.onFormSubmit);
        }
    }

    private handleSubscriptions(): void {
        const value = getValue(this.props.stringAttribute, "", this.props.mxObject) as string;
        if (value !== this.state.value) {
            this.setState({ value, alertMessage: "" });
        }
    }

    private handleValidations(validations: mendix.lib.ObjectValidation[]): void {
        const alertMessage = validations[0].getErrorReason(this.props.stringAttribute);
        validations[0].removeAttribute(this.props.stringAttribute);
        if (alertMessage) {
            this.setState({ alertMessage });
        }
    }

    private handleOnChange(value: string): void {
        if (!this.props.mxObject) {
            return;
        }
        this.isEditing = true;
        this.props.mxObject.set(this.props.stringAttribute, value);
    }

    private executeOnChangeAction(): void {
        if (this.props.mxObject && this.state.value !== this.defaultValue) {
            this.executeAction(this.props.mxObject);
            this.defaultValue = this.state.value;
        }
        if (this.isEditing) {
            this.isEditing = false;
        }
    }

    private onFormSubmit(onSuccess: () => void): void {
        if (this.isEditing) {
            this.executeOnChangeAction();
        }
        onSuccess();
    }

    private executeAction(mxObject: mendix.lib.MxObject): void {
        const { onChangeMicroflow, onChangeNanoflow, mxform } = this.props;

        if (onChangeMicroflow) {
            window.mx.ui.action(onChangeMicroflow, {
                origin: this.props.mxform,
                params: {
                    guids: [mxObject.getGuid()],
                    applyto: "selection"
                },
                error: error =>
                    window.mx.ui.error(`Error while executing microflow: ${onChangeMicroflow}: ${error.message}`)
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
}
