import { tapMenuItem } from "../../../../../detox/src/helpers";
import { expect } from "detox";

describe("Activity Indicator", () => {
    beforeAll(async () => {
        await tapMenuItem("Activity Indicator");
    });

    it("renders the default indicator", async () => {
        const activityIndicator = element(by.id("activityIndicatorDefault"));
        expect(activityIndicator).toBeVisible();
    });

    it("does not render the activity indicator with visibility set as false", async () => {
        const activityIndicator = element(by.id("activityIndicatorNoVisibility"));
        expect(activityIndicator).not.toBeVisible();
    });

    it("renders the custom indicator", async () => {
        const activityIndicator = element(by.id("activityIndicatorCustomStyle"));
        expect(activityIndicator).toBeVisible();
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
