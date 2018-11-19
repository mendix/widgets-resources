import { CSSProperties, SFC, createElement } from "react";
import * as classNames from "classnames";

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
    classNameInner?: string;
    style?: CSSProperties;
}

export const SizeContainer: SFC<SizeProps> = ({ className, classNameInner, widthUnit, width, heightUnit, height, children, style }) => {
    const styleWidth = widthUnit === "percentage" ? `${width}%` : `${width}px`;
    return createElement("div",
        {
            className: classNames(className, "size-box"),
            style: {
                position: "relative",
                width: styleWidth,
                ...getHeight(heightUnit, height, widthUnit, width),
                ...style
            }
        }, createElement("div", {
            className: classNames("size-box-inner", classNameInner),
            style: {
                position: "absolute",
                top: "0",
                right: "0",
                bottom: "0",
                left: "0"
            }
        }, children)
    );
};

SizeContainer.displayName = "SizeContainer";

const getHeight = (heightUnit: HeightUnitType, height: number, widthUnit: WidthUnitType, width: number): CSSProperties => {
    const style: CSSProperties = {};
    if (heightUnit === "percentageOfWidth") {
        const ratio = height / 100 * width;
        if (widthUnit === "percentage") {
            style.height = "auto";
            style.paddingBottom = `${ratio}%`;
        } else {
            style.height = `${ratio}px`;
        }
    } else if (heightUnit === "pixels") {
        style.height = `${height}px`;
    } else if (heightUnit === "percentageOfParent") {
        style.height = `${height}%`;
    }

    return style;
};
