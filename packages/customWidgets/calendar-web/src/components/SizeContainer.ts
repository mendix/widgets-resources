import { CSSProperties, createElement, FunctionComponent } from "react";
import classNames from "classnames";

export type HeightUnitType = "percentageOfWidth" | "percentageOfParent" | "pixels";

export type WidthUnitType = "percentage" | "pixels";

export interface Dimensions {
    widthUnit: WidthUnitType;
    width: number;
    heightUnit: HeightUnitType;
    height: number;
}

export interface SizeProps extends Dimensions {
    className: string;
    style?: CSSProperties;
}

export const SizeContainer: FunctionComponent<SizeProps> = ({
    className,
    widthUnit,
    width,
    heightUnit,
    height,
    children,
    style
}) => {
    const styleWidth = widthUnit === "percentage" ? `${width}%` : `${width}px`;

    return createElement(
        "div",
        {
            className: classNames(className, "size-box"),
            style: {
                position: "relative",
                width: styleWidth,
                ...getHeight(heightUnit, height),
                ...style
            },
            ref: parentHeight
        },
        createElement(
            "div",
            {
                className: "size-box-inner",
                style: {
                    position: "absolute",
                    top: "0",
                    right: "0",
                    bottom: "0",
                    left: "0"
                }
            },
            children
        )
    );
};

const parentHeight = (node?: HTMLElement | null): void => {
    // Fix for percentage height of parent.
    // There no other way to control widget wrapper style
    if (node && node.parentElement) {
        node.parentElement.style.height = "100%";
    }
};

const getHeight = (heightUnit: HeightUnitType, height: number): CSSProperties => {
    const style: CSSProperties = {};

    if (heightUnit === "percentageOfWidth") {
        style.height = "auto";
        style.paddingBottom = `${height}%`;
    } else if (heightUnit === "pixels") {
        style.height = `${height}px`;
    } else if (heightUnit === "percentageOfParent") {
        style.height = `${height}%`;
    }

    return style;
};
