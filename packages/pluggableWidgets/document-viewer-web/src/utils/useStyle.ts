import { HeightUnitEnum, WidthUnitEnum } from "../../typings/DocumentViewerProps";
import { CSSProperties, useMemo } from "react";

export interface UseStyleProps {
    widthUnit: WidthUnitEnum;
    width: number | null;
    heightUnit: HeightUnitEnum;
    height: number | null;
}

const unitMap: Record<"pixels" | "percentage", "px" | "%"> = {
    pixels: "px",
    percentage: "%"
};

export function useStyle({ heightUnit, height, width, widthUnit }: UseStyleProps): CSSProperties {
    return useMemo(() => {
        return {
            height: `${height}${unitMap[heightUnit]}`,
            width: `${width}${unitMap[widthUnit]}`
        };
    }, [heightUnit, height, widthUnit, width]);
}
