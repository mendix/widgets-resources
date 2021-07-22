import { device, expect } from "detox";
import { Widget } from "../../../../../tests/e2e/helpers-native/Helpers";

describe("Activity Indicator", () => {
    beforeAll(async () => {
        const activityIndicatorWidget = Widget("btnActivityIndicator").getElement();
        await activityIndicatorWidget.tap();
    });

    it("should render the default indicator", async () => {
        const activityIndicator = Widget("activityIndicatorDefault").getElement();
        await expect(activityIndicator).toBeVisible();
    });

    it("should not render the activity indicator with visibility set as false", async () => {
        const activityIndicator = Widget("activityIndicatorNoVisibility").getElement();
        await expect(activityIndicator).not.toBeVisible();
    });

    it("should render the custom indicator", async () => {
        const activityIndicator = Widget("activityIndicatorCustomStyle").getElement();
        await expect(activityIndicator).toBeVisible();
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
