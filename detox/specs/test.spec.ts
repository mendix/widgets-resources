import { device, element, by } from "detox";

describe("A test", () => {
    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it("should work", async () => {
        await expect(element(by.id("welcome"))).not.toBeDefined();
    });
});
