import { Component, createElement, ReactNode } from "react";
import { ProgressBar, ProgressBarProps } from "./components/ProgressBar";
import ProgressBarContainer, { ProgressBarContainerProps } from "./components/ProgressBarContainer";
import { Alert } from "./components/Alert";

declare function require(name: string): string;

type VisibilityMap = {
    [P in keyof ProgressBarContainerProps]: boolean;
};

export class preview extends Component<ProgressBarContainerProps, {}> {
    render(): ReactNode {
        const warnings = ProgressBarContainer.validateProps(this.props);
        const bar = createElement(ProgressBar, this.transformProps(this.props));
        if (warnings) {
            return createElement("div", {}, createElement(Alert, { bootstrapStyle: "danger", message: warnings }), bar);
        }
        return bar;
    }

    private transformProps(props: ProgressBarContainerProps): ProgressBarProps {
        return {
            barType: props.barType,
            bootstrapStyle: props.bootstrapStyle,
            className: props.class,
            colorSwitch: props.textColorSwitch,
            displayText: props.displayText,
            displayTextValue: this.getDisplayTextValue(),
            maximumValue: props.staticMaximumValue,
            progress: props.staticValue,
            style: ProgressBarContainer.parseStyle(props.style)
        };
    }

    private getDisplayTextValue(): string {
        if (this.props.displayText === "attribute") {
            return `{ ${this.props.displayTextAttribute} }`;
        } else if (this.props.displayText === "static") {
            return this.props.displayTextStatic;
        }

        return "";
    }
}

export function getPreviewCss(): string {
    return require("./ui/ProgressBar.scss");
}

export function getVisibleProperties(valueMap: ProgressBarContainerProps, visibilityMap: VisibilityMap): VisibilityMap {
    visibilityMap.onClickMicroflow = valueMap.onClickOption === "callMicroflow";
    visibilityMap.onClickNanoflow = valueMap.onClickOption === "callNanoflow";
    visibilityMap.onClickPage = valueMap.onClickOption === "showPage";
    visibilityMap.openPageAs = valueMap.onClickOption === "showPage";
    visibilityMap.displayTextAttribute = valueMap.displayText === "attribute";
    visibilityMap.displayTextStatic = valueMap.displayText === "static";

    return visibilityMap;
}
