import HomePage from "./pages/home.page";

const testValue = "<b>Hello World!</b>";
const plainValue = "Hello my World";
const resultValue = "<p><strong>Hello World!</strong></p>";

describe("RichText", () => {
    it("content is updated by attribute", () => {
        HomePage.open();
        HomePage.textArea2.waitForVisible();
        HomePage.textArea2.click();
        HomePage.textArea2.setValue(testValue);
        HomePage.textArea3.click();

        const content = HomePage.richText1.getHTML(false);
        expect(content).toBe(resultValue);
    });

    it("change value should update the attribute", () => {
        HomePage.open();
        HomePage.richText1.waitForVisible();
        HomePage.richText1.click();
        HomePage.richText1.keys(plainValue);
        HomePage.textArea2.click();

        const content = HomePage.textArea2.getValue();
        expect(content).toContain(plainValue);
    });
});
