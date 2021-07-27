import { device, expect } from "detox";
import { Widget } from "../../../../../tests/e2e/index";

describe("Activity Indicator", () => {
    beforeAll(async () => {
        const activityIndicatorWidget = Widget("btnActivityIndicator").getElement();
        await activityIndicatorWidget.tap();
    });

    it("renders the default indicator", async () => {
        const activityIndicator = Widget("activityIndicatorDefault").getElement();
        await expect(activityIndicator).toBeVisible();
    });

    it("does not render the activity indicator with visibility set as false", async () => {
        const activityIndicator = Widget("activityIndicatorNoVisibility").getElement();
        await expect(activityIndicator).not.toBeVisible();
    });

    it("renders the custom indicator", async () => {
        const activityIndicator = Widget("activityIndicatorCustomStyle").getElement();
        await expect(activityIndicator).toBeVisible();
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
