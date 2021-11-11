// import { Component, createElement, ReactNode } from "react";
//
// import { CommonRichTextProps, RichText, TabOptions } from "./RichText";
// import { ValidateConfigs } from "./ValidateConfigs";
//
// import { getValue, parseStyle } from "../utils/ContainerUtils";
//
// interface WrapperProps {
//     class: string;
//     mxform: mxui.lib.form._FormBase;
//     mxObject?: mendix.lib.MxObject;
//     style: string;
//     readOnly: boolean;
// }
//
// export interface RichTextContainerProps extends WrapperProps, CommonRichTextProps {
//     stringAttribute: string;
//     sanitizeContent: boolean;
//     editable: "default" | "never";
//     onChangeMicroflow: string;
//     onChangeNanoflow: Nanoflow;
//     tabAction: TabOptions;
// }
//
// interface Nanoflow {
//     nanoflow: object[];
//     paramsSpec: { Progress: string };
// }
//
// interface RichTextContainerState {
//     alertMessage: string;
//     value: string;
// }
//
// export type ReadOnlyStyle = "bordered" | "text" | "borderedToolbar";
//
// export default class RichTextContainer extends Component<RichTextContainerProps, RichTextContainerState> {
//     private subscriptionHandles: number[] = [];
//     private defaultValue: string | null | undefined;
//     private isEditing = false;
//
//     constructor(props: RichTextContainerProps) {
//         super(props);
//
//         this.state = {
//             alertMessage: "",
//             value: getValue(props.stringAttribute, "", props.mxObject) as string
//         };
//         this.resetSubscriptions(props.mxObject);
//     }
//
//     UNSAFE_componentWillMount(): void {
//         this.handleOnChange = this.handleOnChange.bind(this);
//         this.executeOnChangeAction = this.executeOnChangeAction.bind(this);
//         this.handleSubscriptions = this.handleSubscriptions.bind(this);
//         this.onFormSubmit = this.onFormSubmit.bind(this);
//         this.handleValidations = this.handleValidations.bind(this);
//     }
//
//     render(): ReactNode {
//         const readOnly = this.isReadOnly();
//         return createElement(
//             ValidateConfigs,
//             { ...(this.props as RichTextContainerProps), showOnError: false },
//             createElement(RichText, {
//                 editorOption: this.props.editorOption,
//                 tabAction: this.props.tabAction,
//                 theme: this.props.theme,
//                 customOptions: this.props.customOptions,
//                 minNumberOfLines: this.props.minNumberOfLines,
//                 maxNumberOfLines: this.props.maxNumberOfLines,
//                 readOnlyStyle: this.props.mxObject ? this.props.readOnlyStyle : "bordered",
//                 className: this.props.class,
//                 style: parseStyle(this.props.style),
//                 sanitizeContent: this.props.sanitizeContent,
//                 translatable: this.props.editable === "never" || this.props.readOnly,
//                 value: this.state.value,
//                 onChange: !readOnly ? this.handleOnChange : undefined,
//                 onBlur: !readOnly ? this.executeOnChangeAction : undefined,
//                 readOnly,
//                 alertMessage: this.state.alertMessage
//             })
//         );
//     }
// }
