import singleLocationPage from "./pages/singleLocation.page";
import xpathPage from "./pages/xpath.page";

describe("Maps", () => {
    describe("#Leaflet maps", () => {
        const alertValue = "invalid location";

        it("should show a single location", () => {
            singleLocationPage.open();
            singleLocationPage.markers.waitForVisible();

            const markerList: WebdriverIO.Element[] = singleLocationPage.markers.value;
            expect(markerList.length).toBe(1);
        });

        it("with wrong coodinates should show an alert message", () => {
            singleLocationPage.latitudeInput.waitForExist();
            singleLocationPage.longitudeInput.waitForExist();

            singleLocationPage.latitudeInput.click();
            singleLocationPage.latitudeInput.setValue(190);
            singleLocationPage.longitudeInput.click();
            singleLocationPage.longitudeInput.setValue(200);
            singleLocationPage.longitudeLabel.click();

            singleLocationPage.alert.waitForExist();
            const alert = singleLocationPage.alert.getText();

            expect (alert).toContain(alertValue);
        });

        describe("when xpath data source is selected", () => {
            it("it should show multiple locations", () => {
                xpathPage.open();
                xpathPage.getGrid(1).waitForVisible();
                xpathPage.getGridRow(0).waitForVisible();
                xpathPage.getGridRow(0).click();
                xpathPage.markers.waitForVisible();

                browser.waitUntil(() => {
                    const markerList: WebdriverIO.Element[] = xpathPage.markers.value;

                    return markerList.length > 1;
                }, 5000, "expected more than 1 marker to be populated");
            });
        });
    });
});
