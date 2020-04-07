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

            expect(mapPage.googleMap).toBeDefined();

            const markers = mapPage.googleMarkers;

            expect(markers.length).toBe(6);
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

            expect(mapPage.googleMap).toBeDefined();

            const markers = mapPage.googleMarkers;

            expect(markers.length).toBe(2);
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

            expect(mapPage.googleMap).toBeDefined();

            const markers = mapPage.googleMarkers;

            expect(markers.length).toBe(4);
        });
    });
});
