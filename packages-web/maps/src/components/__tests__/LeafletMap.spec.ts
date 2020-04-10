import { shallow, ShallowWrapper } from "enzyme";
import { createElement } from "react";
import { LeafletMap, LeafletProps } from "../LeafletMap";

describe("Leaflet maps", () => {
    const defaultProps: LeafletProps = {
        autoZoom: true,
        height: 75,
        heightUnit: "pixels",
        optionDrag: true,
        optionScroll: true,
        optionZoomControl: true,
        zoomLevel: 10,
        width: 50,
        widthUnit: "percentage",
        style: {},
        currentLocation: undefined,
        locations: [],
        className: "",
        mapsToken: "",
        showCurrentLocation: false,
        attributionControl: false,
        mapProvider: "openStreet"
    };

    const renderGoogleMap = (props: LeafletProps): ShallowWrapper<LeafletProps, any> =>
        shallow(createElement(LeafletMap, props));

    it("renders a map with right structure", () => {
        const leafletMaps = renderGoogleMap(defaultProps);
        leafletMaps.setProps({
            heightUnit: "percentageOfWidth",
            widthUnit: "pixels"
        });

        expect(leafletMaps).toMatchSnapshot();
    });

    it("renders a map with pixels renders structure correctly", () => {
        const leafletMaps = renderGoogleMap(defaultProps);
        leafletMaps.setProps({
            heightUnit: "pixels",
            widthUnit: "pixels"
        });

        expect(leafletMaps).toMatchSnapshot();
    });

    it("renders a map with percentage of width and height units renders the structure correctly", () => {
        const leafletMaps = renderGoogleMap(defaultProps);
        leafletMaps.setProps({
            heightUnit: "percentageOfWidth",
            widthUnit: "percentage"
        });

        expect(leafletMaps).toMatchSnapshot();
    });

    it("renders a map with percentage of parent units renders the structure correctly", () => {
        const leafletMaps = renderGoogleMap(defaultProps);
        leafletMaps.setProps({
            heightUnit: "percentageOfParent",
            widthUnit: "percentage"
        });

        expect(leafletMaps).toMatchSnapshot();
    });

    it("renders a map with HERE maps as provider", () => {
        const leafletMaps = renderGoogleMap(defaultProps);
        leafletMaps.setProps({
            mapProvider: "hereMaps"
        });

        expect(leafletMaps).toMatchSnapshot();
    });

    it("renders a map with MapBox maps as provider", () => {
        const leafletMaps = renderGoogleMap(defaultProps);
        leafletMaps.setProps({
            mapProvider: "mapBox"
        });

        expect(leafletMaps).toMatchSnapshot();
    });

    it("renders a map with attribution", () => {
        const leafletMaps = renderGoogleMap(defaultProps);
        leafletMaps.setProps({
            attributionControl: true
        });

        expect(leafletMaps).toMatchSnapshot();
    });
});
