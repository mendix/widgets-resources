import page from "../pages/page";
import mapPage from "../pages/baseMap.page";

describe("Google Maps", () => {
    describe("rendering", () => {
        beforeAll(() => {
            page.open("p/google-static");
        });

        it("compares with a screenshot baseline and checks if basemap is correct", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const screenshotElem = $(".widget-maps");
            screenshotElem.waitForDisplayed({ timeout: 5000 });
            browser.pause(3000);
            browser.saveElement(screenshotElem, "googleMaps");
            expect(browser.checkElement(screenshotElem, "googleMaps")).toBeLessThan(1);
        });
    });

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

            expect(markers.length).toBe(3);
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

            expect(markers.length).toBe(1);
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

            expect(markers.length).toBe(2);
        });
    });
});
