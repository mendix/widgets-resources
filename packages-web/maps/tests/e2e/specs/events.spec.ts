import page from "../pages/page";
import mapPage from "../pages/baseMap.page";
import dataGrid from "../objects/dataGrid";
import { getMxObjectMarkerUrl } from "../../../src/utils/Data";

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
        beforeEach(() => {
            page.open("p/ShowPage"); // opens page
        });

        it("should show full page when click leaflet marker", () => {
            mapPage.leafletMap.waitForDisplayed();
            dataGrid.getGridRow(2).waitForDisplayed();
            dataGrid.getGridRow(2).click();
            // const text = page.getWidget("textBox1 input").getText();
            let value = "";
            browser.waitUntil(
                () => {
                    value = page.getWidget("textBox1 input").getValue();
                    return value === "China";
                },
                5000,
                "expected more than 1 marker to be populated"
            );

            mapPage.expectFewLeafletMarkers();
            const markerList = mapPage.leafletMarkers || [];
            if (markerList.length > 0) {
                mapPage.leafletMarkers[0].click();
            }
            page.waitTitleToBeDisplayed();
            expect(page.title).toBe("Event triggered");
        });

        // Unable to locate clickable of a google maps marker
        xit("should show page when click google marker", () => {
            mapPage.leafletMap.waitForDisplayed();
            page.tab(1).click();
            mapPage.googleMap.waitForDisplayed();

            dataGrid.getGrid(3).waitForDisplayed();
            dataGrid.getGrid(3).click();

            const markerImage = mapPage.googleMarkers[4];
            const div = markerImage.$("..").$(":last-child");
            div.waitForClickable();
            div.click();

            page.waitTitleToBeDisplayed();
            expect(page.title).toBe("Event triggered");
        });
    });
});
