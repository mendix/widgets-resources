import { resetDevice, tapMenuItem } from "../../../../../detox/src/helpers";
import { expect, element, by } from "detox";

describe("Activity indicator", () => {
    beforeAll(async () => {
        await tapMenuItem("Activity Indicator");
    });

    afterAll(async () => {
        await resetDevice();
    });

    it("renders the default indicator", async () => {
        const activityIndicator = element(by.id("activityIndicatorDefault"));
        await expect(activityIndicator).toBeVisible();
    });

    it("does not render the activity indicator with visibility set as false", async () => {
        const activityIndicator = element(by.id("activityIndicatorNoVisibility"));
        await expect(activityIndicator).not.toBeVisible();
    });

    it("renders the custom indicator", async () => {
        const activityIndicator = element(by.id("activityIndicatorCustomStyle"));
        await expect(activityIndicator).toBeVisible();
    });
});
