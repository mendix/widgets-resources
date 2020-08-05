import { Component, createElement, ReactNode } from "react";
import { ProgressCircle, ProgressCircleProps } from "./components/ProgressCircle";
import ProgressCircleContainer, { ContainerProps } from "./components/ProgressCircleContainer";

declare function require(name: string): string;

type VisibilityMap = {
    [P in keyof ContainerProps]: boolean;
};

export class preview extends Component<ContainerProps, {}> {
    render(): ReactNode {
        return createElement(ProgressCircle, this.transformProps(this.props));
    }

    private transformProps(props: ContainerProps): ProgressCircleProps {
        return {
            alertMessage: ProgressCircleContainer.validateProps(props),
            circleThickness: props.circleThickness,
            className: props.class,
            clickable: false,
            displayText: props.displayText,
            displayTextValue: this.getDisplayTextValue(),
            maximumValue: props.staticMaximumValue,
            positiveValueColor: props.positiveValueColor,
            style: ProgressCircleContainer.parseStyle(props.style),
            textSize: props.textSize,
            value: props.staticValue
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
    return require("./ui/ProgressCircle.scss");
}

export function getVisibleProperties(valueMap: ContainerProps, visibilityMap: VisibilityMap): VisibilityMap {
    visibilityMap.microflow = valueMap.onClickEvent === "callMicroflow";
    visibilityMap.nanoflow = valueMap.onClickEvent === "callNanoflow";
    visibilityMap.page = valueMap.onClickEvent === "showPage";
    visibilityMap.openPageAs = valueMap.onClickEvent === "showPage";
    visibilityMap.displayTextAttribute = valueMap.displayText === "attribute";
    visibilityMap.displayTextStatic = valueMap.displayText === "static";

    return visibilityMap;
}
