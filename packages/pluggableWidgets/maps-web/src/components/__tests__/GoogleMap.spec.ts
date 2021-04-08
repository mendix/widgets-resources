import { shallow, ShallowWrapper } from "enzyme";
import { createElement } from "react";
import { GoogleMap, GoogleMapsProps } from "../GoogleMap";
import { initialize } from "@googlemaps/jest-mocks";
import { useLoadScript } from "@react-google-maps/api";

jest.mock("@react-google-maps/api", () => {
    const original = jest.requireActual("@react-google-maps/api");
    return {
        ...original,
        useLoadScript: jest.fn()
    };
});

function mockUseLoadScriptHookWithReturn(returnValue: Partial<ReturnType<typeof useLoadScript>>): void {
    // @ts-expect-error `mockImplementation` is present cuz of the mock, but TS doesn't know.
    useLoadScript.mockImplementation(() => returnValue);
}

describe("Google maps", () => {
    const defaultProps: GoogleMapsProps = {
        autoZoom: true,
        className: "",
        currentLocation: undefined,
        fullscreenControl: false,
        height: 75,
        heightUnit: "pixels",
        locations: [],
        mapStyles: "",
        mapsToken: "",
        mapTypeControl: false,
        optionDrag: true,
        optionScroll: true,
        optionZoomControl: true,
        rotateControl: false,
        showCurrentLocation: false,
        streetViewControl: false,
        style: {},
        width: 50,
        widthUnit: "percentage",
        zoomLevel: 10
    };

    beforeEach(() => {
        initialize();
        mockUseLoadScriptHookWithReturn({ isLoaded: true, loadError: undefined });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const renderGoogleMap = (props: GoogleMapsProps): ShallowWrapper<GoogleMapsProps, any> =>
        shallow(createElement(GoogleMap, props));

    it("renders a map with right structure", () => {
        const googleMaps = renderGoogleMap(defaultProps);
        googleMaps.setProps({
            heightUnit: "percentageOfWidth",
            widthUnit: "pixels"
        });

        expect(googleMaps).toMatchSnapshot();
    });

    it("renders a map with pixels renders structure correctly", () => {
        const googleMaps = renderGoogleMap(defaultProps);
        googleMaps.setProps({
            heightUnit: "pixels",
            widthUnit: "pixels"
        });

        expect(googleMaps).toMatchSnapshot();
    });

    it("renders a map with percentage of width and height units renders the structure correctly", () => {
        const googleMaps = renderGoogleMap(defaultProps);
        googleMaps.setProps({
            heightUnit: "percentageOfWidth",
            widthUnit: "percentage"
        });

        expect(googleMaps).toMatchSnapshot();
    });

    it("renders a map with percentage of parent units renders the structure correctly", () => {
        const googleMaps = renderGoogleMap(defaultProps);
        googleMaps.setProps({
            heightUnit: "percentageOfParent",
            widthUnit: "percentage"
        });

        expect(googleMaps).toMatchSnapshot();
    });

    it("renders a map with markers", () => {
        const googleMaps = renderGoogleMap(defaultProps);
        googleMaps.setProps({
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

        expect(googleMaps).toMatchSnapshot();
    });

    it("renders a map with current location", () => {
        const googleMaps = renderGoogleMap(defaultProps);
        googleMaps.setProps({
            showCurrentLocation: true,
            currentLocation: {
                latitude: 51.906688,
                longitude: 4.48837,
                url: "image:url"
            }
        });

        expect(googleMaps).toMatchSnapshot();
    });
});
