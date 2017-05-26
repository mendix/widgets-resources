import { Component, createElement } from "react";
import { BadgeButton, BadgeButtonProps } from "./components/BadgeButton";
import { Overlay } from "./components/Overlay";
import { Alert } from "./components/Alert";
import BadgeButtonContainer, { BadgeButtonContainerProps } from "./components/BadgeButtonContainer";

declare function require(name: string): string;

// tslint:disable-next-line:class-name
export class preview extends Component<BadgeButtonContainerProps, {}> {

    componentWillMount() {
        const css = require("./ui/BadgeButton.css");
        this.addPreviewStyle(css, "widget-badge");
    }

    render() {
        const message = BadgeButtonContainer.validateProps(this.props);

        return createElement(Overlay, { myRef: this.parentInline },
            createElement(Alert, { message }),
            createElement(BadgeButton, this.transformProps(this.props))
        );
    }

    private parentInline(node?: HTMLElement) {
        if (node && node.parentElement) {
            node.parentElement.style.display = "inline-block";
        }
    }

    private transformProps(props: BadgeButtonContainerProps): BadgeButtonProps {
        const valueAttributeArray = props.valueAttribute ? props.valueAttribute.split(".")[2] : "";
        return {
            bootstrapStyle: props.bootstrapStyle,
            className: props.class,
            label: props.label,
            style: BadgeButtonContainer.parseStyle(props.style),
            value: valueAttributeArray ? "[" + valueAttributeArray + "]" : props.badgeButtonValue || " "
        };
    }

    private addPreviewStyle(css: string, styleId: string) {
        // This workaround is to load style in the preview temporary till mendix has a better solution
        const iFrame = document.getElementsByClassName("t-page-editor-iframe")[0] as HTMLIFrameElement;
        const iFrameDoc = iFrame.contentDocument;
        if (!iFrameDoc.getElementById(styleId)) {
            const styleTarget = iFrameDoc.head || iFrameDoc.getElementsByTagName("head")[0];
            const styleElement = document.createElement("style");
            styleElement.setAttribute("type", "text/css");
            styleElement.setAttribute("id", styleId);
            styleElement.appendChild(document.createTextNode(css));
            styleTarget.appendChild(styleElement);
        }
    }
}
