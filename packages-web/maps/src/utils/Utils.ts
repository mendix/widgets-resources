import { CSSProperties } from "react";
import { DynamicMarkersType, HeightUnitEnum, MarkersType, WidthUnitEnum } from "../../typings/MapsProps";
import { ModeledMarker } from "../components/GoogleMap";
import { ObjectItem } from "mendix";

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

export const analyzeStaticMarker = (marker: MarkersType): ModeledMarker => {
    console.warn("Analyzing static marker");
    let location;
    if (marker.dataSourceType === "static") {
        if (marker.locationType === "address") {
            location = marker.address!;
        } else {
            location = `${marker.latitude},${marker.longitude}`;
        }
    } else {
        if (marker.locationType === "address") {
            if (marker.propertyContext === "attribute") {
                location = marker.addressAttribute?.value!;
            } else {
                location = marker.addressExpression?.value!;
            }
        } else {
            if (marker.propertyContext === "attribute") {
                location = `${marker.latitudeAttribute?.value},${marker.longitudeAttribute?.value}`;
            } else {
                location = `${marker.latitudeExpression?.value},${marker.longitudeExpression?.value}`;
            }
        }
    }

    return {
        location,
        action: marker.onClick?.execute,
        customMarker: marker.customMarker?.value?.uri
    };
};

export const analyzeDynamicMarker = (marker: DynamicMarkersType, item: ObjectItem): ModeledMarker => {
    console.warn("Analyzing dynamic marker");
    const { locationType, address, latitude, longitude, onClickAttribute } = marker;
    let location;
    if (locationType === "address") {
        location = address ? address(item).value! : "";
    } else {
        location = `${latitude ? latitude(item).value : 0},${longitude ? longitude(item).value : 0}`;
    }
    return {
        location,
        action: onClickAttribute ? onClickAttribute(item).execute : undefined,
        customMarker: marker.customMarkerDynamic?.value?.uri
    };
};
