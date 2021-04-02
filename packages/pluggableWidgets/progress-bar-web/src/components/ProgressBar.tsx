import { createElement, CSSProperties, ReactElement, ReactNode } from "react";
import classNames from "classnames";
import { Alert } from "@mendix/piw-utils-internal";
import { calculatePercentage } from "../util";

export interface ProgressBarProps {
    class: string;
    style?: CSSProperties;
    currentValue: number;
    minValue: number;
    maxValue: number;
    onClick: (() => void) | undefined;
    label: ReactNode;
}

function getValuesErrorMessage(currentValue: number, minValue: number, maxValue: number): string | null {
    if (maxValue < minValue) {
        return "Error in progress bar values: The maximum value is lower than the minimum value.";
    }
    if (currentValue < minValue) {
        return "Error in progress bar values: The progress value is lower than the minimum value.";
    }
    if (currentValue > maxValue) {
        return "Error in progress bar values: The progress value is higher than the maximum value.";
    }
    return null;
}

export function ProgressBar({
    class: className,
    style,
    minValue,
    maxValue,
    onClick,
    currentValue,
    label
}: ProgressBarProps): ReactElement {
    const errorMessage = getValuesErrorMessage(currentValue, minValue, maxValue);
    const percentage = calculatePercentage(currentValue, minValue, maxValue);
    return (
        <div
            className={classNames("widget-progress-bar", "progress-bar-medium", "progress-bar-primary", className)}
            style={style}
        >
            <div
                className={classNames("progress", {
                    "widget-progress-bar-alert": maxValue < 1,
                    "widget-progress-bar-clickable": !!onClick
                })}
                onClick={onClick}
            >
                <div
                    className={classNames("progress-bar")}
                    title={typeof label === "string" ? label : undefined}
                    style={{ width: `${percentage}%` }}
                >
                    {label}
                </div>
            </div>
            {errorMessage ? (
                <Alert bootstrapStyle="danger" className="widget-progress-bar">
                    {errorMessage}
                </Alert>
            ) : null}
        </div>
    );
}
