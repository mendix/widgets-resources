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

        it("check the number of locations", () => {
            mapPage.leafletMap.waitForDisplayed();

            const markers = mapPage.leafletMarkers;

            browser.waitUntil(() => markers.length === 3, 5000);
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

            browser.waitUntil(() => markers.length === 1, 5000);
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

            browser.waitUntil(() => markers.length === 2, 5000);
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
