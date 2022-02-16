import { element, by, waitFor } from "detox";
import { expectToMatchScreenshot, resetDevice, tapMenuItem } from "../../../../../detox/src/helpers";

describe("Pie-doughnut chart", () => {
    beforeEach(async () => {
        await tapMenuItem("Pie doughnut chart");
    });

    afterEach(async () => {
        await resetDevice();
    });

    it("renders pie chart correctly", async () => {
        await element(by.text("Pie chart Multiple data points")).tap();
        const matcher = by.id("pieChartMultipleDs");
        await waitFor(element(matcher)).toBeVisible().withTimeout(5000);
        const pieChart = element(matcher);
        await expectToMatchScreenshot(pieChart);
    });

    it("renders doughnut chart correctly", async () => {
        await element(by.text("Doughnut chart Multiple data points")).tap();
        const matcher = by.id("doughnutChartMultipleDs");
        await waitFor(element(matcher)).toBeVisible().withTimeout(5000);
        const doughnutChart = element(matcher);
        await expectToMatchScreenshot(doughnutChart);
    });
});
