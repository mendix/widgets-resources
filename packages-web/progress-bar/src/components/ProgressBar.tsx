import { CSSProperties, FunctionComponent, createElement } from "react";
import classNames from "classnames";

import "../ui/ProgressBar.scss";

export interface ProgressBarProps {
    barType?: BarType;
    bootstrapStyle?: BarStyle;
    className?: string;
    colorSwitch?: number;
    text?: string;
    showContent?: ShowContent;
    minimumValue?: number;
    maximumValue?: number;
    onClickAction?: () => void;
    progress?: number;
    style?: CSSProperties;
}

export type BarStyle = "default" | "info" | "primary" | "success" | "warning" | "danger" | "inverse";
export type BarType = "default" | "striped" | "animated";
export type ShowContent = "none" | "value" | "percentage" | "text";

export const ProgressBar: FunctionComponent<ProgressBarProps> = ({
    barType,
    bootstrapStyle,
    colorSwitch,
    className,
    showContent,
    text,
    minimumValue,
    maximumValue,
    onClickAction,
    progress,
    style
}) => {
    const percentage = progressValue(minimumValue, maximumValue, progress);
    const progressText = getProgressText(minimumValue, maximumValue, progress, showContent, text);
    return (
        <div className={classNames("widget-progress-bar", className)} style={style}>
            <div
                className={classNames("progress", {
                    "widget-progress-bar-alert": !validRange(minimumValue, maximumValue),
                    "widget-progress-bar-clickable": !!onClickAction,
                    "widget-progress-bar-text-contrast": Math.abs(percentage) < (colorSwitch as number)
                })}
                onClick={onClickAction}
            >
                <div
                    className={classNames("progress-bar", `progress-bar-${bootstrapStyle || "default"}`, {
                        active: barType === "animated",
                        "progress-bar-striped": barType === "striped" || barType === "animated",
                        "widget-progress-bar-negative": percentage < 0
                    })}
                    style={{ width: `${Math.abs(percentage)}%` }}
                >
                    {progressText}
                </div>
            </div>
        </div>
    );
};

ProgressBar.defaultProps = {
    barType: "default",
    bootstrapStyle: "default",
    colorSwitch: 50,
    showContent: "percentage"
};

function progressValue(minimum?: number, maximum?: number, progress?: number): number {
    if (typeof progress !== "number" || !validRange(minimum, maximum)) {
        return 0;
    }
    const value = calculatePercentage(progress, minimum!, maximum!);
    if (progress > maximum! || Math.abs(value) > 100) {
        return 100;
    }

    return value;
}

function calculatePercentage(progress: number, minimum: number, maximum: number): number {
    const range = maximum - minimum;
    const progressInRange = progress - minimum;
    return Math.round((progressInRange / range) * 100);
}

function getProgressText(
    minimum?: number,
    maximum?: number,
    value?: number,
    text?: ShowContent,
    displayTextValue?: string
): string {
    if (value === null || typeof value === "undefined") {
        return "";
    }
    if (!validRange(minimum, maximum)) {
        return "Invalid";
    }
    if (text === "value") {
        return `${calculatePercentage(value, minimum!, maximum!)}`;
    }
    if (text === "percentage") {
        return `${calculatePercentage(value, minimum!, maximum!)}%`;
    }
    if (text === "text") {
        return displayTextValue || "";
    }
    return "";
}

function validRange(minimum: number | undefined, maximum: number | undefined): boolean {
    return minimum !== undefined && maximum !== undefined ? minimum < maximum : false;
}
