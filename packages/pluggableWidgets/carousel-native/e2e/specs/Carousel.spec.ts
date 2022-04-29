import { expectToMatchScreenshot, resetDevice, tapMenuItem } from "../../../../../detox/src/helpers";
import { expect, element, by } from "detox";
import { Alert } from "../../../../../detox/src/Alert";

describe("Carousel", () => {
    beforeEach(async () => {
        await tapMenuItem("Carousel");
    });

    afterEach(async () => {
        await resetDevice();
    });

    it("should be able to swipe left and right", async () => {
        const carousel = element(by.id("carousel"));

        await carousel.swipe("left", "slow", NaN, 0.5, 0.5);
        await expectToMatchScreenshot(carousel);

        await carousel.swipe("right", "slow", NaN, 0.5, 0.5);
        await expectToMatchScreenshot(carousel);
    });

    it("should propagate events of contained widgets", async () => {
        await element(by.id("image1$ImageSmallPressable")).tap();
        await expect(Alert().messageElement).toHaveText("You clicked the Logo image.");
    });
});
