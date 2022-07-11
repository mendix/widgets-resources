import { expect, element, by, waitFor } from "detox";
import { Alert } from "../../../../../detox/src/Alert";
import { expectToMatchScreenshot, resetDevice, tapMenuItem } from "../../../../../detox/src/helpers";

describe("Gallery", () => {
    beforeEach(async () => {
        await tapMenuItem("Gallery");
    });

    it("renders correctly", async () => {
        const gallery = element(by.id("galleryContainer"));
        await expectToMatchScreenshot(gallery);
    });

    it("should trigger pull down event when swipe down", async () => {
        await element(by.id("galleryVertical-list")).swipe("down", "fast", 0.9);
        const alert = Alert();
        await expect(alert.messageElement).toHaveText("Pull down");
    });

    it("should load more items when press the load more items button", async () => {
        const gallery = element(by.id("galleryVertical"));
        await waitFor(element(by.id("galleryVertical-pagination-button")))
            .toBeVisible()
            .whileElement(by.id("galleryVertical-list"))
            .scroll(50, "down");
        await element(by.id("galleryVertical-pagination-button")).tap();
        await expectToMatchScreenshot(gallery);
    });

    afterEach(async () => {
        await resetDevice();
    });
});
