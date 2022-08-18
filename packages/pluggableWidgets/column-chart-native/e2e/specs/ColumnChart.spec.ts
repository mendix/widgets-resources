import { element, by } from "detox";
import { expectToMatchScreenshot, tapMenuItem } from "../../../../../detox/src/helpers";

describe("Column chart", () => {
    beforeAll(async () => {
        await tapMenuItem("Column chart");
    });

    it("renders correctly", async () => {
        const columnChart = element(by.id("columnChart"));
        await expectToMatchScreenshot(columnChart);
    });
});
