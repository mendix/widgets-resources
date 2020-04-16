import { CSSProperties } from "react";
import { Dimensions } from "../../typings/shared";

export function getDimensions<T extends Dimensions>(props: T): CSSProperties {
    const style: CSSProperties = {
        width: props.widthUnit === "percentage" ? `${props.width}%` : `${props.width}px`
    };
    if (props.heightUnit === "percentageOfWidth") {
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

    return style;
}
