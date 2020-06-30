import page from "../pages/page";
import mapPage from "../pages/baseMap.page";

describe("Google Maps", () => {
    describe("mixed rendering", () => {
        beforeAll(() => {
            page.open("p/google");
        });

        it("checks the rendering", () => {
            mapPage.googleMap.waitForDisplayed();

            expect(mapPage.googleMap).toBeDefined();
        });

        it("check the number of locations", () => {
            mapPage.googleMap.waitForDisplayed();

            const markers = mapPage.googleMarkers;

            browser.waitUntil(() => markers.length === 3, 5000);
        });
    });

    describe("static locations", () => {
        beforeAll(() => {
            page.open("p/google-static");
        });

        it("checks the rendering", () => {
            mapPage.googleMap.waitForDisplayed();

            expect(mapPage.googleMap).toBeDefined();
        });

        it("check the number of locations", () => {
            mapPage.googleMap.waitForDisplayed();

            const markers = mapPage.googleMarkers;

            browser.waitUntil(() => markers.length === 1, 5000);
        });
    });

    describe("datasource locations", () => {
        beforeAll(() => {
            page.open("p/google-datasource");
        });

        it("checks the rendering", () => {
            mapPage.googleMap.waitForDisplayed();

            expect(mapPage.googleMap).toBeDefined();
        });

        it("check the number of locations", () => {
            mapPage.googleMap.waitForDisplayed();

            const markers = mapPage.googleMarkers;

            browser.waitUntil(() => markers.length === 2, 5000);
        });
    });
});
