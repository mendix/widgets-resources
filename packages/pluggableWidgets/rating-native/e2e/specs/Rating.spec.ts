import { expectToMatchScreenshot, setText, tapMenuItem } from "../../../../../detox/src/helpers";
import { element, by, device } from "detox";

describe("Rating", () => {
    beforeAll(async () => {
        await tapMenuItem("Rating");
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });

    it("renders correctly after change", async () => {
        const textBox = element(by.id("textBoxRating"));
        await setText(textBox, "3");

        await expectToMatchScreenshot();
    });
});
