import page from "../pages/page";
import mapPage from "../pages/baseMap.page";

describe("Here Maps", () => {
    describe("mixed rendering", () => {
        beforeAll(() => {
            page.open("p/here");
        });

        it("checks the rendering", () => {
            mapPage.leafletMap.waitForDisplayed();

            expect(mapPage.leafletMap).toBeDefined();
        });

        xit("check the number of locations", () => {
            mapPage.leafletMap.waitForDisplayed();

            const markers = mapPage.leafletMarkers;

            expect(markers.length).toBe(3);
        });
    });

    describe("static locations", () => {
        beforeAll(() => {
            page.open("p/here-static");
        });

        it("checks the rendering", () => {
            mapPage.leafletMap.waitForDisplayed();

            expect(mapPage.leafletMap).toBeDefined();
        });

        it("check the number of locations", () => {
            mapPage.leafletMap.waitForDisplayed();

            const markers = mapPage.leafletMarkers;

            expect(markers.length).toBe(1);
        });
    });

    describe("datasource locations", () => {
        beforeAll(() => {
            page.open("p/here-datasource");
        });

        it("checks the rendering", () => {
            mapPage.leafletMap.waitForDisplayed();

            expect(mapPage.leafletMap).toBeDefined();
        });

        it("check the number of locations", () => {
            mapPage.leafletMap.waitForDisplayed();

            const markers = mapPage.leafletMarkers;

            expect(markers.length).toBe(2);
        });
    });

    describe("on click", () => {
        beforeAll(() => {
            page.open("p/here-onclick");
        });

        it("should click on first marker", () => {
            mapPage.leafletMap.waitForDisplayed();
            const marker = mapPage.leafletFirstMarker;
            marker.waitForDisplayed();

            browser.execute(e => e.click(), marker);

            mapPage.dialog.waitForDisplayed();

            expect(mapPage.dialog.getText()).toBe("Clicked on static marker");
        });
    });
});
