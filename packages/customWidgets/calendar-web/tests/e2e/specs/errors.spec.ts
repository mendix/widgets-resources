import page from "../../../../../../configs/e2e/src/pages/page";
import Calendar from "../objects/calendar.widget";

describe("Calendar", () => {
    it("should show error if no onClick microflow configured", async () => {
        await page.open("p/noMicroflow");

        await (await Calendar.getErrorAlert()).waitForDisplayed();
        expect(await (await Calendar.getErrorAlert()).getText()).toContain(
            "On click event is set to 'Call a microflow' but no microflow is selected"
        );
    });

    it("should show error if no onClick nanoflow configured", async () => {
        await page.open("p/noNanoflow");

        await (await Calendar.getErrorAlert()).waitForDisplayed();
        expect(await (await Calendar.getErrorAlert()).getText()).toContain(
            "On click event is set to 'Call a nanoflow' but no nanoflow is selected"
        );
    });
    it("should show error if no datasource microflow configured", async () => {
        await page.open("p/noMicroflowDatasource");

        await (await Calendar.getErrorAlert()).waitForDisplayed();
        expect(await (await Calendar.getErrorAlert()).getText()).toContain(
            "Datasource is set to 'microflow' but no microflow is selected"
        );
    });
    it("should show error if no datasource nanoflow configured", async () => {
        await page.open("p/noNanoflowDatasource");

        await (await Calendar.getErrorAlert()).waitForDisplayed();
        expect(await (await Calendar.getErrorAlert()).getText()).toContain(
            "Datasource is set to 'nanoflow' but no nanoflow is selected"
        );
    });
});
