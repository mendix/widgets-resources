import { ActivityIndicator, Pages } from "./elements";
import { device, expect } from "detox";

describe("Activity Indicator", () => {
    beforeEach(async () => {
        await Pages().openActivityIndicator();
    });

    afterEach(async () => {
        await device.reloadReactNative();
    });

    it("should render the default indicator", async () => {
        await expect(ActivityIndicator("activityIndicator1")).toBeVisible();
    });

    it("should render the custom indicator", async () => {
        await expect(ActivityIndicator("activityIndicator2")).toBeVisible();
    });
});
