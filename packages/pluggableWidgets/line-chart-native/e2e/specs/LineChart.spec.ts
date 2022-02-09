import { element, by } from "detox";
import { expectToMatchScreenshot, resetDevice, tapMenuItem } from "../../../../../detox/src/helpers";

describe("Line chart", () => {
    beforeAll(async () => {
        await tapMenuItem("Line chart");
    });

    afterAll(async () => {
        await resetDevice();
    });

    it("renders correctly", async () => {
        const barChart = element(by.id("lineChart"));
        await expectToMatchScreenshot(barChart);
    });
});
