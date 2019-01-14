import { CSSProperties } from "react";
import { MapUtils } from "./namespace";

type Dimensions = MapUtils.Dimensions;

export default class Utils {
    static customUrls: MapUtils.CustomTypeUrls = {
        openStreetMap: `https://{s}.tile.osm.org/{z}/{x}/{y}.png`,
        mapbox: `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=`,
        hereMaps: `https://2.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?`
    };

    static mapAttr: MapUtils.MapAttributions = {
        openStreetMapAttr: `&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors`,
        mapboxAttr: `Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,
            <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`,
        hereMapsAttr: `Map &copy; 1987-2014 <a href="https://developer.here.com">HERE</a>`
    };

    static getDimensions<T extends Dimensions>(props: T, ref?: HTMLDivElement): CSSProperties {
        const style: CSSProperties = {
            width: props.widthUnit === "percentage" ? `${props.width}%` : `${props.width}px`
        };
        if (props.heightUnit === "percentageOfWidth") {
            const ratio = props.height / 100 * props.width;
            if (props.widthUnit === "percentage") {
                style.height = "auto";
                style.paddingBottom = `${ratio}%`;
            } else {
                style.height = `${ratio}px`;
            }
        } else if (props.heightUnit === "pixels") {
            style.height = `${props.height}px`;
        } else if (props.heightUnit === "percentageOfParent") {
            let height = `${props.height}%`;
            if (ref && ref.parentElement) {
                if (ref.parentElement.parentElement) {
                    const parentHeight = ref.parentElement.parentElement.clientHeight;
                    if (parentHeight > 0) {
                        height = `${parentHeight * props.height / 100}px`;
                    }
                }
            }
            style.height = height;
        }

        return style;
    }

    static parseStyle(style = ""): CSSProperties { // Doesn't support a few stuff.
        try {
            return style.split(";").reduce<{[key: string]: string}>((styleObject, line) => {
                const pair = line.split(":");
                if (pair.length === 2) {
                    const name = pair[0].trim().replace(/(-.)/g, match => match[1].toUpperCase());
                    styleObject[name] = pair[1].trim();
                }

                return styleObject;
            }, {});
        } catch (error) {
            // tslint:disable-next-line no-console
            window.console.log("Failed to parse style", style, error);
        }

        return {};
    }

}
