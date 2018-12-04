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

    static getDimensions<T extends Dimensions>(props: T): CSSProperties {
        const style: CSSProperties = {
            width: props.widthUnit === "percentage" ? `${props.width}%` : `${props.width}px`
        };
        if (props.heightUnit === "percentageOfWidth") {
            style.paddingBottom = props.widthUnit === "percentage"
                ? `${props.height}%`
                : `${props.width / 2}px`;
        } else if (props.heightUnit === "pixels") {
            style.height = `${props.height}px`;
        } else if (props.heightUnit === "percentageOfParent") {
            style.height = `${props.height}%`;
        }

        return style;
    }
}
