import { device, element, by, expect } from "detox";

describe("A simple test", () => {
    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it("should click on badge button", async () => {
        await element(by.id("actionButton18")).tap();
        const inputText = await element(by.id("textBox1"));
        const badgeStyleText = await element(by.id("text2"));
        await inputText.tap();
        await inputText.clearText();
        await inputText.typeText("123");
        await badgeStyleText.tap();
        expect(inputText).toHaveText("123");
    });
});
