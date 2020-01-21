import page from "../../../../badge/tests/e2e/pages/page";
import dataGrid from "../objects/dataGrid";
import mapPage from "../pages/baseMap.page";

describe("Maps", () => {
    describe("when XPath data source is selected", () => {
        beforeAll(() => {
            page.open("p/MarkerMicroflow"); // opens page
        });

        it("it should show multiple locations", () => {
            dataGrid.getGrid(1).waitForDisplayed();
            dataGrid.getGridRow(0).waitForDisplayed();
            dataGrid.getGridRow(0).click();
            mapPage.leafletMap.waitForDisplayed();
            const moreThanOneMarker = mapPage.expectFewLeafletMarkers();
            expect(moreThanOneMarker).toBeTruthy();
        });
    });
    describe("when there are multiple data sources", () => {
        beforeAll(() => {
            page.open("p/MultipleDataSources"); // opens page
        });

        it("it should show map correctly", () => {
            const mapUnderTest = mapPage.leafletMap;
            mapUnderTest.waitForDisplayed();

            expect(mapUnderTest.isExisting()).toBeTruthy();
            expect(mapPage.noAlerts).toBeTruthy();
        });
    });
    describe("when nanoflow over association data source", () => {
        beforeAll(() => {
            page.open("p/Nanoflow-Association"); // opens page
        });

        it("it should show map correctly", () => {
            const mapUnderTest = page.getWidget("mapsNanoflowAssociation");

            expect(mapUnderTest.isExisting()).toBeTruthy();
            expect(mapPage.noAlerts).toBeTruthy();
        });
    });
});
