import * as React from "react";
import * as classNames from "classnames";

export type HeightUnitType = "percentageOfWidth" | "percentageOfParent" | "pixels";

export type WidthUnitType = "percentage" | "pixels";

export interface Dimensions {
    widthUnit: WidthUnitType;
    width: number;
    heightUnit: HeightUnitType;
    height: number;
    tabIndex: number;
}

export interface SizeProps extends Dimensions {
    className: string;
    classNameInner?: string;
    style?: React.CSSProperties;
}

export const SizeContainer: React.FunctionComponent<SizeProps> = (props) => {
    const styleWidth = props.widthUnit === "percentage" ? `${props.width}%` : `${props.width}px`;
    const relativeStyle: React.CSSProperties = {
        position: "relative",
        width: styleWidth,
        ...getHeight(props.heightUnit, props.height, props.widthUnit, props.width),
        display: "flex",
        justifyContent: "center",
        ...props.style
    };
    const absoluteStyle: React.CSSProperties = {
        position: "absolute",
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
        display: "flex",
        justifyContent: "center"
    };

    return (
        <div className={classNames(props.className, "size-box")} style={relativeStyle} tabIndex={props.tabIndex}>
            <div className={classNames("size-box-inner", props.classNameInner)} style={absoluteStyle}>
                {props.children}
            </div>
        </div>
    );
};

SizeContainer.displayName = "SizeContainer";

const getHeight = (heightUnit: HeightUnitType, height: number, widthUnit: WidthUnitType, width: number): React.CSSProperties => {
    const style: React.CSSProperties = {};
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
