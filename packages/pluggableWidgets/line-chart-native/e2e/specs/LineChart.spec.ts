import { element, by } from "detox";
import { expectToMatchScreenshot, launchApp, tapMenuItem } from "../../../../../detox/src/helpers";

describe("Line chart", () => {
    beforeAll(async () => {
        await launchApp();
        await tapMenuItem("Line chart");
    });

    it("renders correctly", async () => {
        const barChart = element(by.id("lineChart"));
        await expectToMatchScreenshot(barChart);
    });
});
