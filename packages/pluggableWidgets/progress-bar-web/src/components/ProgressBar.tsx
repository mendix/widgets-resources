import { createElement, CSSProperties, ReactElement, ReactNode } from "react";
import classNames from "classnames";
import { Alert } from "@widgets-resources/piw-utils";
import { calculatePercentage } from "../util";
import { LabelTypeEnum } from "../../typings/ProgressBarProps";

export interface ProgressBarProps {
    class: string;
    style?: CSSProperties;
    currentValue: number;
    minValue: number;
    maxValue: number;
    onClick: (() => void) | undefined;
    label: ReactNode;
    labelType: LabelTypeEnum;
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

/**
 * This is unfortunately hard coupled to the class defined and used in
 * `theming/atlas/src/themesource/atlas_ui_resources/web/core/helpers/_progressbar.scss` because the
 * information regarding the size of the progress bar is only available through the passed CSS classes
 * as it's a design property. Thus the only way to make use of this information is doing a string check.
 * This was not used for the conditional visibility of the label since that can be done through pure CSS
 * and avoid the usage of this function unless not it's unavoidable.
 */
function isSizeSmall(className: string): boolean {
    return className.includes("progress-bar-small");
}

export function ProgressBar({
    class: className,
    style,
    minValue,
    maxValue,
    onClick,
    currentValue,
    label,
    labelType
}: ProgressBarProps): ReactElement {
    const errorMessage = getValuesErrorMessage(currentValue, minValue, maxValue);
    const percentage = calculatePercentage(currentValue, minValue, maxValue);
    const isTextualLabel = labelType === "percentage" || labelType === "text";
    return (
        <div
            className={classNames("widget-progress-bar", "progress-bar-medium", "progress-bar-default", className)}
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
                    className={classNames("progress-bar", `progress-bar-label-type-${labelType}`)}
                    title={isSizeSmall(className) && isTextualLabel ? (label as string) : undefined}
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
