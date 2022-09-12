import { element, by } from "detox";
import { expectToMatchScreenshot, launchApp, sessionLogout, tapMenuItem } from "../../../../../detox/src/helpers";

describe("Line chart", () => {
    beforeAll(async () => {
        await launchApp();
        await tapMenuItem("Line chart");
    });

    afterAll(async () => {
        await sessionLogout();
    });

    it("renders correctly", async () => {
        const barChart = element(by.id("lineChart"));
        await expectToMatchScreenshot(barChart);
    });
});
