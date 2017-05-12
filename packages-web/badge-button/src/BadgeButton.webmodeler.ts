import { Component, createElement } from "react";
import { BadgeButton, BadgeButtonProps } from "./components/BadgeButton";
import BadgeButtonContainer, { BadgeButtonContainerProps } from "./components/BadgeButtonContainer";

declare function require(name: string): string;

export class preview extends Component<BadgeButtonContainerProps, {}> {
    componentWillMount() {
        // This workaround is to load style in the preview temporary till mendix has a better solution
        const css = require("./ui/BadgeButton.css");
        const iFrame = document.getElementsByClassName("t-page-editor-iframe")[0] as HTMLIFrameElement;
        const iFrameDoc = iFrame.contentDocument;
        const styleTarget = iFrameDoc.head || iFrameDoc.getElementsByTagName("head")[0];

        const styleElement = document.createElement("style");
        styleElement.setAttribute("type", "text/css");
        styleElement.appendChild(document.createTextNode(css));
        styleTarget.appendChild(styleElement);
    }

    render() {
        return createElement(BadgeButton, this.transformProps(this.props));
    }

    private transformProps(props: BadgeButtonContainerProps): BadgeButtonProps {
        return {
            bootstrapStyle: props.bootstrapStyle,
            className: props.class,
            label: props.label,
            style: BadgeButtonContainer.parseStyle(props.style),
            value: props.badgeButtonValue || "[" + props.valueAttribute + "]"
        };
    }
}
