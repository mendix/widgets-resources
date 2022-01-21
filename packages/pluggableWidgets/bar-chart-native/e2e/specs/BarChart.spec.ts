import { element, by } from "detox";
import { expectToMatchScreenshot, tapMenuItem } from "../../../../../detox/src/helpers";

describe("Bar chart", () => {
    beforeAll(async () => {
        await tapMenuItem("Bar chart");
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });

    it("renders correctly", async () => {
        const barChart = element(by.id("barChart"));
        await expectToMatchScreenshot(barChart);
    });
});
