import singleLocationPage from "./pages/singleLocation.page";
import xpathPage from "./pages/xpath.page";

describe("Maps", () => {
    describe("#Leaflet maps", () => {
        const alertValue = "invalid location";

        it("should show a single location", () => {
            singleLocationPage.open();
            singleLocationPage.map.waitForDisplayed();

            expect(singleLocationPage.map).toBeDefined();

            const markerList: WebdriverIO.Element[] = singleLocationPage.markers || [];

            // eslint-disable-next-line jest/prefer-to-have-length
            expect(markerList.length).toBe(1);
        });

        it("with wrong coordinates should show an alert message", () => {
            singleLocationPage.latitudeInput.waitForExist();
            singleLocationPage.longitudeInput.waitForExist();

            singleLocationPage.latitudeInput.setValue(190);
            singleLocationPage.longitudeInput.setValue(200);

            singleLocationPage.alert.waitForExist();
            const alert = singleLocationPage.alert.getText();

            expect(alert).toContain(alertValue);
        });

        describe("when XPath data source is selected", () => {
            it("it should show multiple locations", () => {
                xpathPage.open();
                xpathPage.getGrid(1).waitForDisplayed();
                xpathPage.getGridRow(0).waitForDisplayed();
                xpathPage.getGridRow(0).click();
                xpathPage.map.waitForDisplayed();

                browser.waitUntil(
                    () => {
                        const markerList: WebdriverIO.Element[] = xpathPage.markers;

                        return markerList.length > 1;
                    },
                    5000,
                    "expected more than 1 marker to be populated"
                );
            });
        });
    });
});
