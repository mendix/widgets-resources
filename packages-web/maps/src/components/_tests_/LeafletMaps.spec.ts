import { mount, shallow } from "enzyme";
import { createElement } from "react";
import ReactResizeDetector from "react-resize-detector";

import { LeafletMap, LeafletMapProps } from "../LeafletMap";
import { Alert } from "../../components/Alert";

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

    const renderLeafletMap = (props: LeafletMapProps) => shallow(createElement(LeafletMap, props));
    const fullRenderLeafletMap = (props: LeafletMapProps) => mount(createElement(LeafletMap, props));

    it("renders structure correctly", () => {
        const leafletMap = renderLeafletMap(defaultProps);
        const mapStyle = { width: "50px", height: "37.5px" };
        leafletMap.setProps({
            heightUnit: "percentageOfWidth",
            widthUnit: "pixels"
        });

        expect(leafletMap).toBeElement(
            createElement("div", { className: "widget-maps", style: mapStyle },
                createElement(Alert, { className: "widget-leaflet-maps-alert leaflet-control" }),
                createElement("div", { className: "widget-leaflet-maps-wrapper" },
                    createElement("div", { className: "widget-leaflet-maps" }),
                    createElement(ReactResizeDetector)
                )
            )
        );
    });

    it("with pixels renders structure correctly", () => {
        const leafletMap = renderLeafletMap(defaultProps);
        const mapStyle = { width: "50px", height: "75px" };
        leafletMap.setProps({
            heightUnit: "pixels",
            widthUnit: "pixels"
        });

        expect(leafletMap).toBeElement(
            createElement("div", { className: "widget-maps", style: mapStyle },
                createElement(Alert, { className: "widget-leaflet-maps-alert leaflet-control" }),
                createElement("div", { className: "widget-leaflet-maps-wrapper" },
                    createElement("div", { className: "widget-leaflet-maps" })
                )
            )
        );
    });

    it("with percentage of width and height units renders the structure correctly", () => {
        const leafletMap = renderLeafletMap(defaultProps);
        const mapStyle = { width: "50%", paddingBottom: "37.5%", height: "auto" };
        leafletMap.setProps({
            heightUnit: "percentageOfWidth",
            widthUnit: "percentage"
        });

        expect(leafletMap).toBeElement(
            createElement("div", { className: "widget-maps", style: mapStyle },
                createElement(Alert, { className: "widget-leaflet-maps-alert leaflet-control" }),
                createElement("div", { className: "widget-leaflet-maps-wrapper" },
                    createElement("div", { className: "widget-leaflet-maps" })
                )
            )
        );
    });

    it("with percentage of parent units renders the structure correctly", () => {
        const leafletMap = renderLeafletMap(defaultProps);
        const mapStyle = { width: "50%", height: "75%" };
        leafletMap.setProps({
            heightUnit: "percentageOfParent",
            widthUnit: "percentage"
        });

        expect(leafletMap).toBeElement(
            createElement("div", { className: "widget-maps", style: mapStyle },
                createElement(Alert, { className: "widget-leaflet-maps-alert leaflet-control" }),
                createElement("div", { className: "widget-leaflet-maps-wrapper" },
                    createElement("div", { className: "widget-leaflet-maps" })
                )
            )
        );
    });

    it("without default center Latitude and Longitude sets default center location based on the default configured location", () => {
        const leafletMap = fullRenderLeafletMap(defaultProps);
        leafletMap.setProps({
            fetchingData: false,
            allLocations: []
        });

        expect(leafletMap.state("center")).toEqual({ lat: 51.9107963, lng: 4.4789878 });
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
            allLocations: [ { latitude: 40.759011, longitude: -73.9844722, mxObject: undefined, url: "http://dummy.url" } ],
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
            allLocations: [ { latitude: 40.759011, longitude: -73.9844722, mxObject: undefined } ],
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
