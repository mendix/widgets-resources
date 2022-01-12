import { expectToMatchScreenshot, tapMenuItem } from "../../../../../detox/src/helpers";

describe("Rating", () => {
    beforeAll(async () => {
        await tapMenuItem("Rating");

        const textBox = element(by.id("textBoxRating"));
        await textBox.clearText();
        await textBox.typeText("3\n");
    });

    it("renders correctly", async () => {
        await expectToMatchScreenshot();
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
