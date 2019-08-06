import { Component, createElement } from "react";
import { Badge, BadgeProps } from "./components/Badge";
import { Alert } from "./components/Alert";
import BadgeContainer, { BadgeContainerProps } from "./components/BadgeContainer";

declare function require(name: string): string;

type VisibilityMap = {
    [P in keyof BadgeContainerProps]: boolean;
};

// tslint:disable-next-line class-name
export class preview extends Component<BadgeContainerProps, {}> {
    render() {
        const message = BadgeContainer.validateProps(this.props);
        return createElement("div", { ref: this.parentInline },
            createElement(Alert, { bootstrapStyle: "danger", message, className: "widget-badge-alert" }),
            createElement(Badge, this.transformProps(this.props))
        );
    }

    private parentInline(node?: HTMLElement | null) {
        // Temporary fix, the web modeler add a containing div, to render inline we need to change it.
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
}

export function getPreviewCss() {
    return require("./ui/Badge.css");
}

export function getVisibleProperties(valueMap: BadgeContainerProps, visibilityMap: VisibilityMap) {

    visibilityMap.microflow = valueMap.onClickEvent === "callMicroflow";
    visibilityMap.nanoflow = valueMap.onClickEvent === "callNanoflow";
    visibilityMap.page = valueMap.onClickEvent === "showPage";
    visibilityMap.openPageAs = valueMap.onClickEvent === "showPage";

    return visibilityMap;
}
