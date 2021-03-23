import { createElement, CSSProperties, FunctionComponent, ReactNode, useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { Alert } from "@widgets-resources/piw-utils";
import { Circle, CircleOptions } from "progressbar.js";
import { calculatePercentage } from "../util";

export interface ProgressCircleProps {
    class: string;
    style?: CSSProperties;
    currentValue: number;
    minValue: number;
    maxValue: number;
    onClick: (() => void) | undefined;
    label: ReactNode;
}

const defaultOptions: CircleOptions = {
    duration: 800,
    // These default values are necessary so that progressbar.js at least renders anything, which we override with custom styling.
    // They also need to be equal to the largest size that we have available, since that will determine the size of the bounding box.
    strokeWidth: 16,
    trailWidth: 16
};

function getValuesErrorMessage(currentValue: number, minValue: number, maxValue: number): string | null {
    if (maxValue < minValue) {
        return "Error in progress circle values: The maximum value is lower than the minimum value.";
    }
    if (currentValue < minValue) {
        return "Error in progress circle values: The progress value is lower than the minimum value.";
    }
    if (currentValue > maxValue) {
        return "Error in progress circle values: The progress value is higher than the maximum value.";
    }
    return null;
}

export const ProgressCircle: FunctionComponent<ProgressCircleProps> = ({
    class: className,
    style,
    currentValue,
    minValue,
    maxValue,
    onClick,
    label
}) => {
    const [progressCircle, setProgressCircle] = useState<Circle>();
    const alertMessage = getValuesErrorMessage(currentValue, minValue, maxValue);

    const setProgressCircleElement = useCallback(
        (node: HTMLDivElement | null) => {
            if (node !== null) {
                const circleElement = new Circle(node, defaultOptions);
                circleElement.path.className.baseVal = "widget-progress-circle-path";
                circleElement.trail.className.baseVal = "widget-progress-circle-trail-path";
                setProgressCircle(circleElement);
            }
        },
        [setProgressCircle]
    );

    useEffect(() => {
        if (progressCircle) {
            const percentage = calculatePercentage(currentValue, minValue, maxValue);
            progressCircle.animate(percentage / 100);
        }
    }, [currentValue, minValue, maxValue, progressCircle]);

    useEffect(() => {
        return () => {
            progressCircle?.destroy();
        };
    }, [progressCircle]);

    return (
        <div
            className={classNames(
                "widget-progress-circle",
                "widget-progress-circle-primary",
                "widget-progress-circle-thickness-medium",
                className
            )}
            style={style}
        >
            {alertMessage ? <Alert bootstrapStyle="danger">{alertMessage}</Alert> : null}
            <div
                className={classNames("h2", "progress-circle-label-container", {
                    "widget-progress-circle-clickable": !!onClick
                })}
                onClick={onClick}
                ref={setProgressCircleElement}
            >
                <div className={classNames("progressbar-text")}>{label}</div>
            </div>
        </div>
    );
};
