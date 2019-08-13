import { Component, ReactElement, createElement, ReactNode } from "react";
import { RichTextContainerProps } from "./RichTextContainer";
import { Alert } from "./Alert";

export class ValidateConfigs extends Component<RichTextContainerProps & { showOnError: boolean }, {}> {
    render(): ReactNode {
        const message = ValidateConfigs.validate(this.props);

        if (message) {
            const alertClassName = "widget-rich-text-alert";
            return this.props.showOnError
                ? createElement(
                      "div",
                      { className: "widget-rich-text-invalid" },
                      createElement(Alert, { className: alertClassName, message }),
                      this.props.children as ReactElement<RichTextContainerProps>
                  )
                : createElement(Alert, { className: alertClassName, message });
        }

        return this.props.children as ReactElement<RichTextContainerProps>;
    }

    static validate(props: RichTextContainerProps): string {
        if (props.minNumberOfLines < 0) {
            return "The minimum number of lines must not be less than 0";
        } else if (props.maxNumberOfLines < 0) {
            return "The maximum number of lines must not be less than 0";
        } else if (props.minNumberOfLines !== 0 && props.minNumberOfLines > props.maxNumberOfLines) {
            return `The minimum number of lines ${props.minNumberOfLines} should not be greater than the maximum ${props.maxNumberOfLines}`;
        }

        return "";
    }
}
