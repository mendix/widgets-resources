import { Component, createElement } from "react";

import { CommonRichTextProps, RichText } from "./RichText";
import { ValidateConfigs } from "./ValidateConfigs";

import { getValue, parseStyle } from "../utils/ContainerUtils";

interface WrapperProps {
    "class": string;
    mxform: mxui.lib.form._FormBase;
    mxObject?: mendix.lib.MxObject;
    style: string;
    readOnly: boolean;
}

export interface RichTextContainerProps extends WrapperProps, CommonRichTextProps {
    stringAttribute: string;
    editable: "default" | "never";
    onChangeMicroflow: string;
}

interface RichTextContainerState {
    value: string;
}

export type ReadOnlyStyle = "bordered" | "text" | "borderedToolbar";

export default class RichTextContainer extends Component<RichTextContainerProps, RichTextContainerState> {
    private subscriptionHandles: number[] = [];
    private defaultValue: string | null;

    constructor(props: RichTextContainerProps) {
        super(props);

        this.state = { value: getValue(props.stringAttribute, "", props.mxObject) as string };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.executeOnChangeAction = this.executeOnChangeAction.bind(this);
        this.handleSubscriptions = this.handleSubscriptions.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    render() {
        return createElement(ValidateConfigs, { ...this.props as RichTextContainerProps, showOnError: false },
            createElement(RichText, {
                editorOption: this.props.editorOption,
                theme: this.props.theme,
                customOptions: this.props.customOptions,
                minNumberOfLines: this.props.minNumberOfLines,
                maxNumberOfLines: this.props.maxNumberOfLines,
                readOnlyStyle: this.props.mxObject ? this.props.readOnlyStyle : "bordered",
                className: this.props.class,
                style: parseStyle(this.props.style),
                value: this.state.value,
                onChange: this.handleOnChange,
                onBlur: this.executeOnChangeAction,
                readOnly: this.isReadOnly()
            })
        );
    }

    componentWillReceiveProps(newProps: RichTextContainerProps) {
        if (newProps.mxObject !== this.props.mxObject) {
            this.resetSubscriptions(newProps.mxObject);
            this.defaultValue = getValue(newProps.stringAttribute, "", newProps.mxObject) as string;
            this.setState({ value: this.defaultValue });
        }
    }

    componentWillUnmount() {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
    }

    private isReadOnly(): boolean {
        return !this.props.mxObject || this.props.editable === "never" || this.props.readOnly ||
            this.props.mxObject.isReadonlyAttr(this.props.stringAttribute);
    }

    private resetSubscriptions(mxObject?: mendix.lib.MxObject) {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);

        if (mxObject) {
            const commonOptions = {
                callback: this.handleSubscriptions,
                guid: mxObject.getGuid()
            };
            this.subscriptionHandles = [
                window.mx.data.subscribe(commonOptions),
                window.mx.data.subscribe({ attr: this.props.stringAttribute, ...commonOptions })
            ];

            this.props.mxform.listen("submit", this.onFormSubmit);
        }
    }

    private handleSubscriptions() {
        this.setState({
            value: getValue(this.props.stringAttribute, "", this.props.mxObject) as string
        });
    }

    private handleOnChange(value: string) {
        if (!this.props.mxObject) {
            return;
        }
        this.props.mxObject.set(this.props.stringAttribute, value);
    }

    private executeOnChangeAction() {
        if (this.props.mxObject && this.state.value !== this.defaultValue) {
            this.executeAction(this.props.mxObject, this.props.onChangeMicroflow);
            this.defaultValue = this.state.value;
        }
    }

    private onFormSubmit(onSuccess: () => void) {
        if (this.state.value !== this.defaultValue) {
            this.executeOnChangeAction();
        }
        onSuccess();
    }

    private executeAction(mxObject: mendix.lib.MxObject, action?: string) {
        if (action) {
            window.mx.ui.action(action, {
                origin: this.props.mxform,
                params: {
                    guids: [ mxObject.getGuid() ],
                    applyto: "selection"
                },
                error: error => window.mx.ui.error(`Error while executing microflow: ${action}: ${error.message}`)
            });
        }
    }
}
