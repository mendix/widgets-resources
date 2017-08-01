import { Component, createElement } from "react";
import { ProgressBar, ProgressBarProps } from "./components/ProgressBar";
import ProgressBarContainer, { ProgressBarContainerProps } from "./components/ProgressBarContainer";
import { Alert } from "./components/Alert";

declare function require(name: string): string;

// tslint:disable-next-line:class-name
export class preview extends Component<ProgressBarContainerProps, {}> {

    render() {
        const warnings = ProgressBarContainer.validateProps(this.props);
        const bar = createElement(ProgressBar, this.transformProps(this.props));
        if (warnings) {
            return createElement("div", {},
                createElement(Alert, { bootstrapStyle: "danger", message: warnings }),
                bar
            );
        }
        return bar;
    }

    private transformProps(props: ProgressBarContainerProps): ProgressBarProps {
        return {
            barType: props.barType,
            bootstrapStyle: props.bootstrapStyle,
            className: props.class,
            colorSwitch: props.textColorSwitch,
            maximumValue: 100,
            progress: 80,
            style: ProgressBarContainer.parseStyle(props.style)
        };
    }
}

export function getPreviewCss() {
    return require("./ui/ProgressBar.scss");
}

export function getVisibleProperties(valueMap: any, visibilityMap: any) {
    if (valueMap.onClickOption === "doNothing") {
        visibilityMap.onClickMicroflow = false;
        visibilityMap.onClickPage = false;
    }
    if (valueMap.onClickOption === "callMicroflow") {
        visibilityMap.onClickMicroflow = true;
        visibilityMap.onClickPage = false;
    }
    if (valueMap.onClickOption === "showPage") {
        visibilityMap.onClickMicroflow = false;
        visibilityMap.onClickPage = true;
    }

    return visibilityMap;
}
