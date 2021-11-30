import { MapsPreviewProps } from "../../typings/MapsProps";
import { check } from "../Maps.editorConfig";

describe("Zoom level check", () => {
    let mapsPreviewProps: Omit<MapsPreviewProps, "class" | "style">;

    beforeEach(() => {
        mapsPreviewProps = {
            markers: [],
            dynamicMarkers: [],
            fitToMarkers: true,
            centerAddress: "",
            centerLatitude: "",
            centerLongitude: "",
            defaultZoomLevel: "city",
            minZoomLevel: "city",
            maxZoomLevel: "streets",
            mapType: "standard",
            provider: "default",
            interactive: true,
            showsUserLocation: true
        };
    });

    it("should return 0 errors when max zoom level is greater than minimum zoom level", () => {
        const results = check(mapsPreviewProps);
        expect(results).toHaveLength(0);
    });

    it("should return an error when max zoom level is less than minimum zoom level", () => {
        mapsPreviewProps.minZoomLevel = "building";
        mapsPreviewProps.maxZoomLevel = "city";

        const results = check(mapsPreviewProps);
        expect(results).toContainEqual({
            property: "minZoomLevel",
            severity: "error",
            message: "The minimum zoom level can not be greater than the maximum zoom level."
        });
    });

    it("should return an error when default zoom level is greater than minimum zoom level", () => {
        mapsPreviewProps.minZoomLevel = "town";

        const results = check(mapsPreviewProps);
        expect(results).toContainEqual({
            property: "defaultZoomLevel",
            severity: "error",
            message: "The default zoom level can not be smaller than the minimum zoom level."
        });
    });

    it("should return an error when default zoom level is less than maximum zoom level", () => {
        mapsPreviewProps.defaultZoomLevel = "building";

        const results = check(mapsPreviewProps);
        expect(results).toContainEqual({
            property: "defaultZoomLevel",
            severity: "error",
            message: "The default zoom level can not be greater than the maximum zoom level."
        });
    });

    it("should return 0 errors when default, minimum and maximum zoom levels are the same", () => {
        mapsPreviewProps.maxZoomLevel = "city";

        expect(check(mapsPreviewProps)).toHaveLength(0);
    });
});
