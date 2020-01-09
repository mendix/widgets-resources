import { Pages } from "./elements";
import { by, element, expect } from "detox";

describe("Rating", () => {
    let textBox: any = null;
    beforeAll(async () => {
        await Pages().openRating();

        textBox = element(by.id("textBoxRatingValue"));
        await expect(textBox).toBeVisible();
    });

    it("should test clicks on rating widget", async () => {
        const rating = element(by.id("containerRatingNormal"));
        await expect(rating).toBeVisible();
        await rating.tapAtPoint({ x: 100, y: 15 });
        await expect(textBox).toHaveText("2.00");
        await rating.tapAtPoint({ x: 180, y: 15 });
        await expect(textBox).toHaveText("3.00");
    });

    it("should test clicks on disable rating widget", async () => {
        const rating = element(by.id("containerRatingDisabled"));
        await expect(rating).toBeVisible();
        await rating.tapAtPoint({ x: 15, y: 15 });
        await expect(textBox).toHaveText("3.00");
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
