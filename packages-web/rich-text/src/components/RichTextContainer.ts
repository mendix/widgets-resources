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

interface RichTextState {
    value: string;
}

export type ReadOnlyStyle = "bordered" | "text" | "borderedToolbar";

export default class RichTextContainer extends Component<RichTextContainerProps, RichTextState> {
    private subscriptionHandles: number[] = [];

    constructor(props: RichTextContainerProps) {
        super(props);

        this.state = {
            value: getValue(props.stringAttribute, "", props.mxObject) as string
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubscriptions = this.handleSubscriptions.bind(this);
    }

    render() {
        return createElement(ValidateConfigs, { ...this.props as RichTextContainerProps, showOnError: false },
            createElement(RichText, {
                ... this.props as any,
                className: this.props.class,
                hasContext: !!this.props.mxObject,
                onChange: this.handleOnChange,
                readOnly: this.isReadOnly(),
                readOnlyStyle: this.props.mxObject ? this.props.readOnlyStyle : "bordered",
                style: parseStyle(this.props.style),
                value: this.state.value
            })
        );
    }

    componentWillReceiveProps(newProps: RichTextContainerProps) {
        if (newProps.mxObject !== this.props.mxObject) {
            this.resetSubscriptions(newProps.mxObject);
            this.setState({
                value: getValue(newProps.stringAttribute, "", newProps.mxObject) as string
            });
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
        }
    }

    private handleSubscriptions() {
        this.setState({
            value: getValue(this.props.stringAttribute, "", this.props.mxObject) as string
        });
    }

    private handleOnChange(data: string) {
        const { mxObject, onChangeMicroflow } = this.props;
        if (!mxObject) {
            return;
        }
        mxObject.set(this.props.stringAttribute, data);
        this.executeAction(mxObject, onChangeMicroflow);
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
