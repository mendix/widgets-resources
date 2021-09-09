import { device, expect, waitFor } from "detox";
import { Widget, Alert } from "../../../../../tests/e2e";

describe("Rating", () => {
    let textBox: any;

    beforeAll(async () => {
        const ratingWidgetHome = Widget("btnRating").getElement();
        await ratingWidgetHome.tap();

        const labelNormal = Widget("textNormal").getElement();
        textBox = Widget("textBoxRating").getElement();
        await waitFor(textBox).toBeVisible().withTimeout(10000);
        await textBox.tap();
        await textBox.clearText();
        await textBox.typeText("3");
        await labelNormal.tap();
    });

    it("renders the normal rating and is interactable", async () => {
        const ratingNormal = Widget("ratingNormal");
        const rating = ratingNormal.getElement();

        await expect(rating).toBeVisible();
        await rating.tapAtPoint({ x: 100, y: 15 });

        await expect(textBox).toHaveText("5.00");
    });

    it("renders the custom static rating icons and is interactable", async () => {
        const ratingNormal = Widget("ratingCustom");
        const rating = ratingNormal.getElement();

        await expect(rating).toBeVisible();
        await rating.tapAtPoint({ x: 50, y: 15 });

        await expect(textBox).toHaveText("4.00");
    });

    it("does not render the rating with visibility set as false", async () => {
        const rating = Widget("ratingNoVisibility").getElement();

        await expect(rating).not.toBeVisible();
    });

    it("renders the rating with actions", async () => {
        const ratingAction = Widget("ratingAction");
        const rating = ratingAction.getElement();

        await expect(rating).toBeVisible();
        await rating.tap();

        await expect(Alert().getMessage("Action test: Rating clicked!")).toBeVisible();
        await Alert().confirm();
    });

    it("renders the disabled rating and is not interactable", async () => {
        await textBox.clearText();

        const ratingDisabled = Widget("ratingDisabled");
        const rating = ratingDisabled.getElement();

        await expect(rating).toBeVisible();
        await rating.tapAtPoint({ x: 100, y: 15 });

        await expect(textBox).toHaveText("");
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
