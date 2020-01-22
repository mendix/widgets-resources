import page from "../pages/page";
import mapPage from "../pages/baseMap.page";
import dataGrid from "../objects/dataGrid";

describe("Events are handled in maps", () => {
    describe("static locations", () => {
        const alertValue =
            'Static location items (at location 1) does not support maker events. The On click can only be set to "Do nothing"';

        beforeAll(() => {
            page.open("p/StaticLocations");
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
            page.open("p/ShowPage");
        });

        it("should show full page when click leaflet marker", () => {
            mapPage.leafletMap.waitForDisplayed();
            dataGrid.getGridRow(2).waitForDisplayed();
            dataGrid.getGridRow(2).click();
            let value = "";
            browser.waitUntil(
                () => {
                    value = page.getWidget("textBox1 input").getValue();
                    return value === "China";
                },
                5000,
                "expected China was selected from datagrid"
            );

            mapPage.leafletMarker.waitForDisplayed(3000);
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
