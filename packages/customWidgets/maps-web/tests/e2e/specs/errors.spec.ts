import page from "../pages/page";
import mapPage from "../pages/baseMap.page";

describe("Handle errors", () => {
    describe("wrong coordinates", () => {
        const alertValue = "invalid location";

        beforeAll(() => {
            page.open("p/InvalidLocation");
        });

        it("show an alert message", () => {
            mapPage.leafletMap.waitForDisplayed();

            mapPage.leafletAlert.waitForDisplayed();
            const alert = mapPage.leafletAlert.getText();

            expect(alert).toContain(alertValue);
        });
    });
    describe("when there are errors in Google Maps config", () => {
        const alertValue = "Latitude and longitude attributes are required for data source context at location 1";

        beforeAll(() => {
            page.open("p/GoogleMapsConfigErrors");
        });
        it("should show an alert message", () => {
            mapPage.googleMap.waitForDisplayed();

            mapPage.googleAlert.waitForDisplayed();
            const alert = mapPage.googleAlert.getText();

            expect(alert).toContain(alertValue);
        });
    });

    describe("when there is no token", () => {
        const alertValue = "An 'Access token' for 'Map provider' mapBox is required";

        beforeAll(() => {
            page.open("p/NoToken");
        });
        it("should show an alert message", () => {
            mapPage.googleMap.waitForDisplayed();

            mapPage.leafletAlert.waitForDisplayed();
            const alert = mapPage.leafletAlert.getText();

            expect(alert).toContain(alertValue);
        });
    });
});
