import { CSSProperties } from "react";

export type WidthUnitEnum = "percentage" | "pixels";

export type HeightUnitEnum = "percentageOfWidth" | "pixels" | "percentageOfParent";

export interface Dimensions {
    widthUnit: WidthUnitEnum;
    width: number | null;
    heightUnit: HeightUnitEnum;
    height: number | null;
}

export function getDimensions<T extends Dimensions>(props: T): CSSProperties {
    const style: CSSProperties = {};

    if (props.width) {
        style.width = props.widthUnit === "percentage" ? `${props.width}%` : `${props.width}px`;
    }

    if (props.height) {
        if (props.heightUnit === "percentageOfWidth" && props.width) {
            const ratio = (props.height / 100) * props.width;
            if (props.widthUnit === "percentage") {
                style.height = "auto";
                style.paddingBottom = `${ratio}%`;
            } else {
                style.height = `${ratio}px`;
            }
        } else if (props.heightUnit === "pixels") {
            style.height = `${props.height}px`;
        } else if (props.heightUnit === "percentageOfParent") {
            style.height = `${props.height}%`;
        }
    }

    return style;
}
