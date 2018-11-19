import * as classNames from "classnames";
import * as React from "react";

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
    style?: React.CSSProperties;
}

export const SizeContainer: React.SFC<SizeProps> = ({ className, widthUnit, width, heightUnit, height, children, style }) => {
    const styleWidth = widthUnit === "percentage" ? `${width}%` : `${width}px`;
    return (
        <div className={classNames(className, "size-box")}
             style={
                 {
                     position: "relative",
                     width: styleWidth,
                     ...getHeight(heightUnit, height),
                     ...style
                 }
             }
             ref={parentHeight}>
            <div className="size-box-inner" style={
                {
                    position: "absolute",
                    top: "0",
                    right: "0",
                    bottom: "0",
                    left: "0"
                }
            }>{children}</div>
        </div>);
};
const parentHeight = (node?: HTMLElement | null) => {
    // Fix for percentage height of parent.
    // There no other way to control widget wrapper style
    if (node && node.parentElement) {
        node.parentElement.style.height = "100%";
    }
};
const getHeight = (heightUnit: HeightUnitType, height: number): React.CSSProperties => {
    const style: React.CSSProperties = {};
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
