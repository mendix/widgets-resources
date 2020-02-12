import { CSSProperties } from "react";

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
