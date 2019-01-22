import { mount, shallow } from "enzyme";
import { createElement } from "react";

import { Alert } from "../../components/Alert";
import { GoogleMap, GoogleMapsProps } from "../GoogleMap";

import { mockGoogleMaps } from "../../../tests/mocks/GoogleMaps";

describe("Google maps", () => {
    const defaultProps: GoogleMapsProps = {
        autoZoom: true,
        defaultCenterLatitude: "",
        defaultCenterLongitude: "",
        height: 75,
        heightUnit: "pixels",
        scriptsLoaded: true,
        optionDrag: true,
        optionScroll: true,
        optionZoomControl: true,
        zoomLevel: 10,
        width: 50,
        widthUnit: "percentage",
        mapStyles: "",
        divStyles: {},
        mapProvider: "googleMaps",
        inPreviewMode: false
    };

    beforeAll(() => {
        window.google = mockGoogleMaps;
    });

    const renderGoogleMap = (props: GoogleMapsProps) => shallow(createElement(GoogleMap, props));
    const fullRenderGoogleMap = (props: GoogleMapsProps) => mount(createElement(GoogleMap, props));

    it("renders structure correctly", () => {
        const googleMaps = renderGoogleMap(defaultProps);
        const mapStyle = { width: "50px", height: "37.5px" };
        googleMaps.setProps({
            heightUnit: "percentageOfWidth",
            widthUnit: "pixels"
        });

        expect(googleMaps).toBeElement(
            createElement("div", { className: "widget-maps", style: mapStyle },
                createElement(Alert, { className: "widget-google-maps-alert" }),
                createElement("div", { className: "widget-google-maps-wrapper" },
                    createElement("div", { className: "widget-google-maps" })
                )
            )
        );
    });

    it("with pixels renders structure correctly", () => {
        const googleMaps = renderGoogleMap(defaultProps);
        const mapStyle = { width: "50px", height: "75px" };
        googleMaps.setProps({
            heightUnit: "pixels",
            widthUnit: "pixels"
        });

        expect(googleMaps).toBeElement(
            createElement("div", { className: "widget-maps", style: mapStyle },
                createElement(Alert, { className: "widget-google-maps-alert" }),
                createElement("div", { className: "widget-google-maps-wrapper" },
                    createElement("div", { className: "widget-google-maps" })
                )
            )
        );
    });

    it("with percentage of width and height units renders the structure correctly", () => {
        const googleMaps = renderGoogleMap(defaultProps);
        const mapStyle = { width: "50%", paddingBottom: "37.5%", height: "auto" };
        googleMaps.setProps({
            heightUnit: "percentageOfWidth",
            widthUnit: "percentage"
        });

        expect(googleMaps).toBeElement(
            createElement("div", { className: "widget-maps", style: mapStyle },
                createElement(Alert, { className: "widget-google-maps-alert" }),
                createElement("div", { className: "widget-google-maps-wrapper" },
                    createElement("div", { className: "widget-google-maps" })
                )
            )
        );
    });

    it("with percentage of parent units renders the structure correctly", () => {
        const googleMaps = renderGoogleMap(defaultProps);
        const mapStyle = { width: "50%", height: "75%" };
        googleMaps.setProps({
            heightUnit: "percentageOfParent",
            widthUnit: "percentage"
        });

        expect(googleMaps).toBeElement(
            createElement("div", { className: "widget-maps", style: mapStyle },
                createElement(Alert, { className: "widget-google-maps-alert" }),
                createElement("div", { className: "widget-google-maps-wrapper" },
                    createElement("div", { className: "widget-google-maps" })
                )
            )
        );
    });

    it("without default center Latitude and Longitude sets default center location based on the default configured location", () => {
        const googleMaps = fullRenderGoogleMap(defaultProps);
        googleMaps.setProps({
            fetchingData: false
        });

        expect(googleMaps.state("center")).toEqual({ lat: 51.9107963, lng: 4.4789878 });
    });

    it("creates markers from given locations", () => {
        const customProps = {
            ...defaultProps,
            allLocations: [ { latitude: 40.759011, longitude: -73.9844722, mxObject: undefined, url: "http://dummy.url" } ],
            fetchingData: false,
            autoZoom: false
        };
        const googleMaps = fullRenderGoogleMap(defaultProps);
        const googleMapsInstance = googleMaps.instance() as any;
        const createMarkerSpy = spyOn(googleMapsInstance, "addMarkers").and.callThrough();

        googleMapsInstance.componentWillReceiveProps(customProps);

        expect(createMarkerSpy).toHaveBeenCalledWith(customProps.allLocations);
    });

    afterAll(() => {
        window.google = undefined;
    });
});
