import { ActivityIndicator, Pages } from "./elements";
import { expect } from "detox";

describe("Activity Indicator", () => {
    beforeAll(async () => {
        await Pages().openActivityIndicator();
    });

    it("should render the default indicator", async () => {
        await expect(ActivityIndicator("activityIndicator1")).toBeVisible();
    });

    it("should render the custom indicator", async () => {
        await expect(ActivityIndicator("activityIndicator2")).toBeVisible();
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
