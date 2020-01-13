import page from "../../../../badge/tests/e2e/pages/page";
import mapPage from "../pages/baseMap.page";

describe("#Leaflet maps rendering", () => {
    describe("should render simple case", () => {
        beforeAll(() => {
            page.open("p/Playground"); // opens page
        });

        it("should show a single location", () => {
            mapPage.leafletMap.waitForDisplayed();

            expect(mapPage.leafletMap).toBeDefined();

            const markerList = mapPage.leafletMarkers || [];

            // eslint-disable-next-line jest/prefer-to-have-length
            expect(markerList.length).toBe(1);
        });
    });
    describe("should render custom", () => {
        beforeAll(() => {
            page.open("p/CustomMarkers"); // opens page
        });

        it("should show no alerts", () => {
            mapPage.leafletMap.waitForDisplayed();

            expect(mapPage.noAlerts).toBeTruthy();
        });

        it("should show a leaflet maps with custom markers", () => {
            mapPage.leafletMap.waitForDisplayed();

            expect(mapPage.leafletMaps.length).toBe(5);
            expect(mapPage.leafletMarkers.length).toBe(6);
        });

        it("should show a google maps with custom markers", () => {
            mapPage.leafletMap.waitForDisplayed();

            expect(mapPage.googleMaps.length).toBe(5);
            // TODO: google markers: expect(mapPage.leafletMarkers.length).toBe(6);
        });
    });

    describe("should handle no context", () => {
        beforeAll(() => {
            page.open("p/no-context"); // opens page
        });

        it("should not show any alert messages", () => {
            mapPage.leafletMap.waitForDisplayed();

            expect(mapPage.noAlerts).toBeTruthy();
        });
    });
});
