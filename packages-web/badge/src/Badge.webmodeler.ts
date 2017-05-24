import { Component, createElement } from "react";
import { Badge, BadgeProps } from "./components/Badge";
import { Overlay } from "./components/Overlay";
import { Alert } from "./components/Alert";
import BadgeContainer, { BadgeContainerProps } from "./components/BadgeContainer";

declare function require(name: string): string;

// tslint:disable-next-line class-name
export class preview extends Component<BadgeContainerProps, {}> {

    componentWillMount() {
        const css = require("./ui/Badge.css");
        this.addPreviewStyle(css, "widget-badge");
    }

    render() {
        const message = BadgeContainer.validateProps(this.props);
        return createElement(Overlay, { myRef: this.parentInline },
            message && Alert(message),
            createElement(Badge, this.transformProps(this.props))
        );
    }

    private parentInline(node?: HTMLElement) {
        if (node && node.parentElement) {
            node.parentElement.style.display = "inline-block";
        }
    }

    private transformProps(props: BadgeContainerProps): BadgeProps {
        const valueAttribute = props.valueAttribute ? props.valueAttribute.split(".")[2] : "";
        return {
            badgeType: props.badgeType,
            bootstrapStyle: props.bootstrapStyle,
            className: props.class,
            clickable: false,
            style: BadgeContainer.parseStyle(props.style),
            value: valueAttribute ? "[" + valueAttribute + "]" : props.badgeValue
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
