import { CSSProperties } from "react";

export function getStyleProp({
    orientation,
    height,
    heightUnit,
    style
}: {
    orientation: "vertical" | "horizontal";
    height: number;
    heightUnit: "pixels" | "percentage";
    style?: CSSProperties;
}): CSSProperties | undefined {
    if (orientation === "vertical") {
        const rootHeight = `${height}${heightUnit === "pixels" ? "px" : "%"}`;
        return {
            ...style,
            height: rootHeight
        };
    }

    return style;
}
