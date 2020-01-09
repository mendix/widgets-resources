import { ActivityIndicator, Pages } from "./elements";
import { device, expect } from "detox";

describe("Activity Indicator", () => {
    beforeAll(async () => {
        await Pages().openActivityIndicator();
    });

    it("should render the default indicator", async () => {
        await expect(ActivityIndicator("activityIndicatorDefault")).toBeVisible();
    });

    it("should render the custom indicator", async () => {
        await expect(ActivityIndicator("activityIndicatorCustomStyle")).toBeVisible();
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
