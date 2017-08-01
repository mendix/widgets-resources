import { Component, createElement } from "react";
import * as classNames from "classnames";

import { Alert } from "./Alert";
import "../ui/ProgressBar.scss";

interface ProgressBarProps {
    alertMessage?: string;
    barType?: BarType;
    bootstrapStyle?: BarStyle;
    className?: string;
    colorSwitch?: number;
    maximumValue: number;
    onClickAction?: () => void;
    progress?: number;
    style?: object;
}

type BarStyle = "default" | "info" | "primary" | "success" | "warning" | "danger" | "inverse";
type BarType = "default" | "striped" | "animated";

class ProgressBar extends Component<ProgressBarProps, {}> {
    static defaultProps: ProgressBarProps = {
        barType: "default",
        bootstrapStyle: "default",
        colorSwitch: 50,
        maximumValue: 100
    };

    render() {
        const { barType, bootstrapStyle, colorSwitch, maximumValue, onClickAction, progress } = this.props;
        const percentage = this.progressValue(maximumValue as number, progress);
        return createElement("div",
         { className: classNames("widget-progress-bar", this.props.className), style: this.props.style },
            createElement("div",
                {
                    className: classNames("progress", {
                        "widget-progress-bar-alert": !maximumValue || maximumValue < 1,
                        "widget-progress-bar-clickable": !!onClickAction,
                        "widget-progress-bar-text-contrast": Math.abs(percentage) < (colorSwitch as number)
                    }),
                    onClick: this.props.onClickAction
                },
                createElement("div",
                    {
                        className: classNames("progress-bar", `progress-bar-${bootstrapStyle || "default"}`, {
                            "active": barType === "animated",
                            "progress-bar-striped": barType === "striped" || barType === "animated",
                            "widget-progress-bar-negative": percentage < 0
                        }),
                        style: { width: `${Math.abs(percentage)}%` }
                    },
                    this.getProgressText(maximumValue, progress)
                )
            ),
            createElement(Alert as any, {
                bootstrapStyle: "danger",
                className: "widget-progressbar",
                message: this.props.alertMessage
            })
        );
    }

    private progressValue(maximumValue: number, progress?: number): number {
        if (typeof progress !== "number" || maximumValue < 1) {
            return 0;
        } else if (progress > maximumValue || Math.abs(this.calculatePercentage(progress, maximumValue)) > 100) {
            return 100;
        }

        return this.calculatePercentage(progress, maximumValue);
    }

    private calculatePercentage(progress: number, maximumValue: number): number {
        return Math.round((progress / maximumValue) * 100);
    }

    private getProgressText(maximumValue: number, progress?: number): string {
        if (progress || progress === 0) {
            return maximumValue < 1 ? "Invalid" : `${this.calculatePercentage(progress, maximumValue)}%`;
        }

        return "";
    }
}

export { BarType, BarStyle, ProgressBar, ProgressBarProps };
