import page from "../pages/page";
import mapPage from "../pages/baseMap.page";

describe("OpenStree Maps", () => {
    describe("mixed rendering", () => {
        beforeAll(() => {
            page.open("p/osm");
        });

        it("checks the rendering", () => {
            mapPage.leafletMap.waitForDisplayed();

            expect(mapPage.leafletMap).toBeDefined();
        });

        it("check the number of locations", () => {
            mapPage.leafletMap.waitForDisplayed();

            expect(mapPage.leafletMap).toBeDefined();

            const markers = mapPage.leafletMarkers;

            expect(markers.length).toBe(3);
        });
    });

    describe("static locations", () => {
        beforeAll(() => {
            page.open("p/osm-static");
        });

        it("checks the rendering", () => {
            mapPage.leafletMap.waitForDisplayed();

            expect(mapPage.leafletMap).toBeDefined();
        });

        it("check the number of locations", () => {
            mapPage.leafletMap.waitForDisplayed();

            expect(mapPage.leafletMap).toBeDefined();

            const markers = mapPage.leafletMarkers;

            expect(markers.length).toBe(1);
        });
    });

    describe("datasource locations", () => {
        beforeAll(() => {
            page.open("p/osm-datasource");
        });

        it("checks the rendering", () => {
            mapPage.leafletMap.waitForDisplayed();

            expect(mapPage.leafletMap).toBeDefined();
        });

        it("check the number of locations", () => {
            mapPage.leafletMap.waitForDisplayed();

            expect(mapPage.leafletMap).toBeDefined();

            const markers = mapPage.leafletMarkers;

            expect(markers.length).toBe(2);
        });
    });
});
