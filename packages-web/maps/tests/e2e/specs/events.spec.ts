import page from "../../../../badge/tests/e2e/pages/page";
import mapPage from "../pages/baseMap.page";
import dataGrid from "../objects/dataGrid";

describe("Events are handled in maps", () => {
    describe("static locations", () => {
        const alertValue = `Static location items (at location 1) does not support maker events. The On click can only be set to "Do nothing"`;

        beforeAll(() => {
            page.open("p/StaticLocations"); // opens page
        });

        it("can not setup on click on a static location", () => {
            mapPage.leafletMap.waitForDisplayed();

            mapPage.leafletAlert.waitForDisplayed();
            const alert = mapPage.leafletAlert.getText();

            expect(alert).toContain(alertValue);
        });
    });

    describe("show page", () => {
        beforeAll(() => {
            page.open("p/ShowPage"); // opens page
        });

        xit("should show page when click leaflet marker", () => {
            mapPage.leafletMap.waitForDisplayed();
            dataGrid.getGridRow(2).waitForDisplayed();
            dataGrid.getGridRow(2).click();
        });

        xit("should show page when click google marker", () => {
            mapPage.googleMap.waitForDisplayed();
        });
    });
});
