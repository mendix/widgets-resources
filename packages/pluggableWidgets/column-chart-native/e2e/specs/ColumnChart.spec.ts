import { element, by } from "detox";
import { expectToMatchScreenshot, resetDevice, tapMenuItem } from "../../../../../detox/src/helpers";

describe("Column chart", () => {
    beforeAll(async () => {
        await tapMenuItem("Column chart");
    });

    afterAll(async () => {
        await resetDevice();
    });

    it("renders correctly", async () => {
        const columnChart = element(by.id("columnChart"));
        await expectToMatchScreenshot(columnChart);
    });
});
