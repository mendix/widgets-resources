import { random } from "faker";

import { Container } from "../../utils/namespace";
import { validateLocationProps, validateLocations } from "../../utils/Validations";
type locationDataProps = Container.DataSourceLocationProps;
type mapContainerProps = Container.MapsContainerProps;

describe("utils/Data", () => {

    describe("#validateLocationProps", () => {
        const defaultProps: Partial<locationDataProps> = {
            locationsEntity: "location",
            latitudeAttribute: "latitude",
            longitudeAttribute: "longitude",
            dataSourceType: "context"
        };

        const validationProps: Partial<mapContainerProps> = {
            mapProvider: "openStreet",
            autoZoom: true
        };

        it("returns no alert message if autoZoom is enabled", () => {
            const validationMessage = validateLocationProps({ ...validationProps });

            expect(validationMessage).toBe("");
        });

        it("returns alert message if autozoom is not enabled and zomm is less than 2", () => {
            const validationMessage = validateLocationProps({ ...validationProps, zoomLevel: 1, autoZoom: false });

            expect(validationMessage).toBe("Zoom Level should be greater than one");
        });

        it("returns no alert if there is a map token for mapProvider mapbox", () => {
            const mapToken = random.uuid();
            const validationMessage = validateLocationProps({ mapProvider: "mapBox", apiToken: mapToken });

            expect(validationMessage).toBe("");
        });

        it("returns alert if there is no map token for mapProvider mapbox", () => {
            const validationMessage = validateLocationProps({ ...validationProps, mapProvider: "mapBox" });

            expect(validationMessage).toBe("An 'Access token' for 'Map provider' mapBox is required");
        });

        it("returns no alert if there are no locations", () => {
            const validationMessage = validateLocationProps({ ...validationProps, locations: [] });

            expect(validationMessage).toBe("");
        });

        it("returns alert if data source type is context and there is no latitude or longitude", () => {
            const validationMessage = validateLocationProps({
                ...validationProps,
                locations: [ { ...defaultProps as locationDataProps, longitudeAttribute: "" } ]
            });

            expect(validationMessage).toBe(`Latitude and longitude attributes are required for data source context at location 1`);
        });

        it("returns alert if data source type is static and there is no latitude or longitude", () => {
            const validationMessage = validateLocationProps({
                ...validationProps,
                locations: [ { ...defaultProps as locationDataProps, dataSourceType: "static", staticLatitude: "lat" } ]
            });

            expect(validationMessage).toBe("Invalid static locations. Latitude and longitude are required at location 1");
        });

        it("returns alert if data source type is microflow and there is no microflow", () => {
            const validationMessage = validateLocationProps({
                ...validationProps,
                locations: [ { ...defaultProps as locationDataProps, dataSourceType: "microflow" } ]
            });

            expect(validationMessage).toBe("A Microflow is required for Data source Microflow at location 1");
        });

        it("return an alert if marker image is selected and there are no marker images", () => {
            const validationMessage = validateLocationProps({
                ...validationProps,
                locations: [ { ...defaultProps as locationDataProps, markerImage: "enumImage" } ]
            });

            expect(validationMessage).toBe("Marker images are required for image attribute at location 1");
        });

        it("return an alert if marker image type is 'system image path' and there is no 'system image path'", () => {
            const validationMessage = validateLocationProps({
                ...validationProps,
                locations: [ { ...defaultProps as locationDataProps, markerImage: "systemImage" } ]
            });

            expect(validationMessage).toBe("System image path is required at location 1");
        });

        it("return an alert if on click event is call microflow and there is no microflow", () => {
            const validationMessage = validateLocationProps({
                ...validationProps,
                locations: [ { ...defaultProps as locationDataProps, onClickEvent: "callMicroflow" } ]
            });

            expect(validationMessage).toBe("A Microflow is required for on click Microflow at location 1");
        });
        it("return an alert if on click event is call nanoflow and there is no nanoflow", () => {
            const validationMessage = validateLocationProps({
                ...validationProps,
                locations: [ { ...defaultProps as locationDataProps, onClickEvent: "callNanoflow" } ]
            });

            expect(validationMessage).toBe("A Nanoflow is required for on click Nanoflow at location 1");
        });

        it("return an alert if on click event is show page and there is no page", () => {
            const validationMessage = validateLocationProps({
                ...validationProps,
                locations: [ { ...defaultProps as locationDataProps, onClickEvent: "showPage" } ]
            });

            expect(validationMessage).toBe("A page is required for on click show page at location 1");
        });

        it("return no alert if on click event is do nothing", () => {
            const validationMessage = validateLocationProps({
                ...validationProps,
                locations: [ { ...defaultProps as locationDataProps, onClickEvent: "doNothing" } ]
            });

            expect(validationMessage).toBe("");
        });
    });

    describe("#ValidLocation", () => {
        it("returns location if valid", () => {
            const location = { latitude:  51.9107963, longitude: 4.4789878 };
            const checkValidLocation = validateLocations(location);

            checkValidLocation.then(e => expect(e).toEqual({ latitude: 51.9107963, longitude: 4.4789878 }));
        });

        it("returns error if location is not valid", () => {
            const location = { latitude: 0, longitude: 0 };
            const checkValidLocation = validateLocations(location);

            checkValidLocation.catch(e => expect(e).toEqual("invalid location: latitude 0, longitude 0"));
        });
    });
});
