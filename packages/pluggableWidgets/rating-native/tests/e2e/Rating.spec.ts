import { device, waitFor } from "detox";
import { Widget, expectToMatchImageSnapshot } from "../../../../../tests/e2e";

describe("Rating", () => {
    beforeAll(async () => {
        const ratingWidgetHome = Widget("btnRating").getElement();
        await ratingWidgetHome.tap();

        const labelNormal = Widget("textNormal").getElement();
        const textBox = Widget("textBoxRating").getElement();
        await waitFor(textBox).toBeVisible().withTimeout(10000);
        await textBox.tap();
        await textBox.clearText();
        await textBox.typeText("3");
        await labelNormal.tap();
    });

    it("renders correctly", async () => {
        await expectToMatchImageSnapshot({
            ios: { removeScrollbar: true },
            android: { removeScrollbar: true }
        });
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
