import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import { createElement } from "react";

import { LeafletMap, LeafletMapProps } from "../LeafletMap";

describe("Leaflet maps", () => {
    const defaultProps: LeafletMapProps = {
        autoZoom: true,
        defaultCenterLatitude: "",
        defaultCenterLongitude: "",
        height: 75,
        heightUnit: "pixels",
        optionDrag: true,
        optionScroll: true,
        optionZoomControl: true,
        zoomLevel: 10,
        width: 50,
        widthUnit: "percentage",
        mapProvider: "openStreet",
        divStyles: {},
        inPreviewMode: false
    };

    const renderLeafletMap = (props: LeafletMapProps): ShallowWrapper<LeafletMapProps, any> =>
        shallow(createElement(LeafletMap, props));
    const fullRenderLeafletMap = (props: LeafletMapProps): ReactWrapper<LeafletMapProps, any> =>
        mount(createElement(LeafletMap, props));

    it("renders structure correctly", () => {
        const leafletMap = renderLeafletMap(defaultProps);
        leafletMap.setProps({
            heightUnit: "percentageOfWidth",
            widthUnit: "pixels"
        });

        expect(leafletMap).toMatchSnapshot();
    });

    it("with pixels renders structure correctly", () => {
        const leafletMap = renderLeafletMap(defaultProps);
        leafletMap.setProps({
            heightUnit: "pixels",
            widthUnit: "pixels"
        });

        expect(leafletMap).toMatchSnapshot();
    });

    it("with percentage of width and height units renders the structure correctly", () => {
        const leafletMap = renderLeafletMap(defaultProps);
        leafletMap.setProps({
            heightUnit: "percentageOfWidth",
            widthUnit: "percentage"
        });

        expect(leafletMap).toMatchSnapshot();
    });

    it("with percentage of parent units renders the structure correctly", () => {
        const leafletMap = renderLeafletMap(defaultProps);
        leafletMap.setProps({
            heightUnit: "percentageOfParent",
            widthUnit: "percentage"
        });
        expect(leafletMap).toMatchSnapshot();
    });

    it("without default center Latitude and Longitude sets default center location based on the default configured location", () => {
        const leafletMap = fullRenderLeafletMap(defaultProps);
        leafletMap.setProps({
            fetchingData: false,
            allLocations: []
        });

        expect(leafletMap.state("center")).toEqual({ lat: 51.9066346, lng: 4.4861703 });
    });

    it("un mounts from the dom when unmounted", () => {
        const leafletMap = renderLeafletMap(defaultProps);
        const leafletInstance = leafletMap.instance() as any;
        const componentWillUnmount = spyOn(leafletInstance, "componentWillUnmount").and.callThrough();

        leafletInstance.map = document.createElement("div");
        leafletMap.unmount();

        expect(componentWillUnmount).toHaveBeenCalled();
    });

    it("creates markers from given locations with a url", () => {
        const customProps = {
            ...defaultProps,
            allLocations: [
                { latitude: 40.759011, longitude: -73.9844722, mxObject: undefined, url: "http://dummy.url" }
            ],
            fetchingData: false,
            autoZoom: false
        };
        const leafletMap = fullRenderLeafletMap(defaultProps);
        const leafletMapInstance = leafletMap.instance() as any;
        const createMarkerSpy = spyOn(leafletMapInstance, "renderMarkers").and.callThrough();
        leafletMapInstance.componentWillReceiveProps(customProps);

        expect(createMarkerSpy).toHaveBeenCalledWith(customProps.allLocations);
    });

    it("creates markers from given locations with default icon", () => {
        const customProps = {
            ...defaultProps,
            allLocations: [{ latitude: 40.759011, longitude: -73.9844722, mxObject: undefined }],
            fetchingData: false,
            autoZoom: false
        };
        const leafletMap = fullRenderLeafletMap(defaultProps);
        const leafletMapInstance = leafletMap.instance() as any;
        const createMarkerSpy = spyOn(leafletMapInstance, "renderMarkers").and.callThrough();
        leafletMapInstance.componentWillReceiveProps(customProps);

        expect(createMarkerSpy).toHaveBeenCalledWith(customProps.allLocations);
    });
});
