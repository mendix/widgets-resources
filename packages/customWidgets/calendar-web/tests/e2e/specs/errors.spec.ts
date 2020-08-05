import page from "../../../../../../configs/e2e/src/pages/page";
import Calendar from "../objects/calendar.widget";

describe("Calendar", () => {
    it("should show error if no onClick microflow configured", () => {
        page.open("p/noMicroflow");

        Calendar.errorAlert.waitForDisplayed();
        expect(Calendar.errorAlert.getText()).toContain(
            "On click event is set to 'Call a microflow' but no microflow is selected"
        );
    });

    it("should show error if no onClick nanoflow configured", () => {
        page.open("p/noNanoflow");

        Calendar.errorAlert.waitForDisplayed();
        expect(Calendar.errorAlert.getText()).toContain(
            "On click event is set to 'Call a nanoflow' but no nanoflow is selected"
        );
    });
    it("should show error if no datasource microflow configured", () => {
        page.open("p/noMicroflowDatasource");

        Calendar.errorAlert.waitForDisplayed();
        expect(Calendar.errorAlert.getText()).toContain(
            "Datasource is set to 'microflow' but no microflow is selected"
        );
    });
    it("should show error if no datasource nanoflow configured", () => {
        page.open("p/noNanoflowDatasource");

        Calendar.errorAlert.waitForDisplayed();
        expect(Calendar.errorAlert.getText()).toContain("Datasource is set to 'nanoflow' but no nanoflow is selected");
    });
});
