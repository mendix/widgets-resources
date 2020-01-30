import HomePage from "./pages/home.page";

const testValue = "<strong>Hello World!</strong>";
const plainValue = "Hello my World";
const resultValue = "<p><strong>Hello World!</strong></p>";

describe("RichText", () => {
    it("content is updated by attribute", () => {
        HomePage.open();
        HomePage.textAreaBubbleBasic.waitForDisplayed();
        HomePage.textAreaBubbleBasic.click();
        HomePage.textAreaBubbleBasic.setValue(testValue);
        HomePage.textArea3.waitForDisplayed();
        HomePage.textArea3.click();

        const content = HomePage.richTextBubbleBasic.getHTML(false);
        expect(content).toContain(resultValue);
    });

    it("change value should update the attribute", () => {
        HomePage.open();
        HomePage.richTextBubbleBasic.waitForDisplayed();
        HomePage.richTextBubbleBasic.click();
        HomePage.richTextBubbleBasic.setValue(plainValue);
        const updatedValue = HomePage.richTextBubbleBasic.getHTML(false);
        HomePage.textAreaBubbleBasic.click();

        const content = HomePage.textAreaBubbleBasic.getValue();
        expect(content).toContain(updatedValue);
    });
});
