import { CSSProperties } from "react";
import { HeightUnitEnum, WidthUnitEnum } from "../../typings/MapsProps";

export interface Dimensions {
    widthUnit: WidthUnitEnum;
    width: number;
    heightUnit: HeightUnitEnum;
    height: number;
}
/* eslint-disable */
export default class Utils {
    static parseStyle(style = ""): CSSProperties {
        // Doesn't support a few stuff.
        try {
            return style.split(";").reduce<{ [key: string]: string }>((styleObject, line) => {
                const pair = line.split(":");
                if (pair.length === 2) {
                    const name = pair[0].trim().replace(/(-.)/g, match => match[1].toUpperCase());
                    styleObject[name] = pair[1].trim();
                }

                return styleObject;
            }, {});
        } catch (error) {
            window.console.log("Failed to parse style", style, error);
        }

        return {};
    }

    static getDimensions<T extends Dimensions>(props: T): CSSProperties {
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
}

export function translateZoom(level: string) {
    switch (level) {
        case "world":
            return 1;
        case "continent":
            return 5;
        case "city":
            return 10;
        case "street":
            return 15;
        case "buildings":
            return 20;
    }
}
