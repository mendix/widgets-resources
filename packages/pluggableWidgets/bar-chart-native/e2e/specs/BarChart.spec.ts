import { element, by } from "detox";
import { expectToMatchScreenshot, launchApp, sessionLogout, tapMenuItem } from "../../../../../detox/src/helpers";

describe("Bar chart", () => {
    beforeAll(async () => {
        await launchApp();
        await tapMenuItem("Bar chart");
    });

    afterAll(async () => {
        await sessionLogout();
    });

    it("renders correctly", async () => {
        const barChart = element(by.id("barChart"));
        await expectToMatchScreenshot(barChart);
    });
});
