import { MapProviderEnum } from "../../typings/MapsProps";

const customUrls = {
    openStreetMap: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
    mapbox: "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=",
    hereMaps: "https://2.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?"
};

const mapAttr = {
    openStreetMapAttr: "&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors",
    mapboxAttr:
        "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    hereMapsAttr: "Map &copy; 1987-2014 <a href='https://developer.here.com'>HERE</a>"
};

export function baseMapLayer(mapProvider: MapProviderEnum, mapsToken?: string): { attribution: string; url: string } {
    let url;
    let attribution;
    if (mapProvider === "mapBox") {
        url = customUrls.mapbox + mapsToken;
        attribution = mapAttr.mapboxAttr;
    } else if (mapProvider === "hereMaps" && mapsToken && mapsToken.indexOf(",") > 0) {
        const splitToken = mapsToken.split(",");
        url = customUrls.hereMaps + `app_id=${splitToken[0]}&app_code=${splitToken[1]}`;
        attribution = mapAttr.hereMapsAttr;
    } else {
        url = customUrls.openStreetMap;
        attribution = mapAttr.openStreetMapAttr;
    }

    return {
        attribution,
        url
    };
}
