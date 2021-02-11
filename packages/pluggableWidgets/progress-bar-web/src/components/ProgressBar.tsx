import { createElement, CSSProperties, ReactElement, ReactNode } from "react";
import classNames from "classnames";
import { Alert } from "@widgets-resources/piw-utils";

export interface ProgressBarProps {
    class: string;
    style?: CSSProperties;
    currentValue: number;
    minValue: number;
    maxValue: number;
    onClick: (() => void) | undefined;
    label: ReactNode;
}

function calculatePercentage(currentValue: number, minValue: number, maxValue: number): number {
    if (currentValue < minValue) {
        return 0;
    }
    if (currentValue > maxValue) {
        return 100;
    }
    const range = maxValue - minValue;
    const percentage = Math.round(((currentValue - minValue) / range) * 100);
    return Math.abs(percentage);
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
    return (
        <div className={classNames("widget-progress-bar", "progress-bar-medium", className)} style={style}>
            <div
                className={classNames("progress", {
                    "widget-progress-bar-alert": maxValue < 1,
                    "widget-progress-bar-clickable": !!onClick
                })}
                onClick={onClick}
            >
                <div
                    className={classNames("progress-bar", "progress-bar-default", "progress-bar-medium", className)}
                    style={{ width: `${calculatePercentage(currentValue, minValue, maxValue)}%` }}
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
