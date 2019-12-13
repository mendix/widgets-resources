import { element, by, expect, waitFor } from "detox";

describe("A simple test", () => {
    it("should click on badge button", async () => {
        const badgeButton = element(by.id("actionButton18"));
        await waitFor(badgeButton).toBeVisible();
        await badgeButton.tap();
        const inputText = await element(by.id("textBox1"));
        const badgeStyleText = await element(by.id("text2"));
        await inputText.tap();
        await inputText.clearText();
        await inputText.typeText("123");
        await badgeStyleText.tap();
        expect(inputText).toHaveText("123");
    });
});
