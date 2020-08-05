import { shallow, ShallowWrapper } from "enzyme";
import { createElement } from "react";
import { LeafletMap, LeafletProps } from "../LeafletMap";

describe("Leaflet maps", () => {
    const defaultProps: LeafletProps = {
        attributionControl: false,
        autoZoom: true,
        className: "",
        currentLocation: undefined,
        height: 75,
        heightUnit: "pixels",
        locations: [],
        mapProvider: "openStreet",
        mapsToken: "",
        optionDrag: true,
        optionScroll: true,
        optionZoomControl: true,
        showCurrentLocation: false,
        style: {},
        width: 50,
        widthUnit: "percentage",
        zoomLevel: 10
    };

    const renderLeafletMap = (props: LeafletProps): ShallowWrapper<LeafletProps, any> =>
        shallow(createElement(LeafletMap, props));

    it("renders a map with right structure", () => {
        const leafletMaps = renderLeafletMap(defaultProps);
        leafletMaps.setProps({
            heightUnit: "percentageOfWidth",
            widthUnit: "pixels"
        });

        expect(leafletMaps).toMatchSnapshot();
    });

    it("renders a map with pixels renders structure correctly", () => {
        const leafletMaps = renderLeafletMap(defaultProps);
        leafletMaps.setProps({
            heightUnit: "pixels",
            widthUnit: "pixels"
        });

        expect(leafletMaps).toMatchSnapshot();
    });

    it("renders a map with percentage of width and height units renders the structure correctly", () => {
        const leafletMaps = renderLeafletMap(defaultProps);
        leafletMaps.setProps({
            heightUnit: "percentageOfWidth",
            widthUnit: "percentage"
        });

        expect(leafletMaps).toMatchSnapshot();
    });

    it("renders a map with percentage of parent units renders the structure correctly", () => {
        const leafletMaps = renderLeafletMap(defaultProps);
        leafletMaps.setProps({
            heightUnit: "percentageOfParent",
            widthUnit: "percentage"
        });

        expect(leafletMaps).toMatchSnapshot();
    });

    it("renders a map with HERE maps as provider", () => {
        const leafletMaps = renderLeafletMap(defaultProps);
        leafletMaps.setProps({
            mapProvider: "hereMaps"
        });

        expect(leafletMaps).toMatchSnapshot();
    });

    it("renders a map with MapBox maps as provider", () => {
        const leafletMaps = renderLeafletMap(defaultProps);
        leafletMaps.setProps({
            mapProvider: "mapBox"
        });

        expect(leafletMaps).toMatchSnapshot();
    });

    it("renders a map with attribution", () => {
        const leafletMaps = renderLeafletMap(defaultProps);
        leafletMaps.setProps({
            attributionControl: true
        });

        expect(leafletMaps).toMatchSnapshot();
    });

    it("renders a map with markers", () => {
        const leafletMaps = renderLeafletMap(defaultProps);
        leafletMaps.setProps({
            locations: [
                {
                    title: "Mendix HQ",
                    latitude: 51.906688,
                    longitude: 4.48837,
                    url: "image:url"
                },
                {
                    title: "Gementee Rotterdam",
                    latitude: 51.922823,
                    longitude: 4.479632,
                    url: "image:url"
                }
            ]
        });

        expect(leafletMaps).toMatchSnapshot();
    });

    it("renders a map with current location", () => {
        const leafletMaps = renderLeafletMap(defaultProps);
        leafletMaps.setProps({
            showCurrentLocation: true,
            currentLocation: {
                latitude: 51.906688,
                longitude: 4.48837,
                url: "image:url"
            }
        });

        expect(leafletMaps).toMatchSnapshot();
    });
});
