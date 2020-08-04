import page from "../../../../../../configs/e2e/src/pages/page";
import RichText from "../objects/richText.widget";

const testValue = "<strong>Hello World!</strong>";
const plainValue = "Hello my World";
const resultValue = "<p><strong>Hello World!</strong></p>";

describe("RichText", () => {
    const richTextBubbleBasic = new RichText("rich_text_bubble_basic");

    beforeEach(() => {
        page.open();
    });

    it("content is updated by attribute", () => {
        const textAreaBubbleBasic = page.waitForElement(".mx-name-text_area_bubble_basic");

        textAreaBubbleBasic.$(".form-control").setValue(testValue);
        richTextBubbleBasic.element.click();

        const content = richTextBubbleBasic.element.getHTML(false);
        expect(content).toContain(resultValue);
    });

    it("change value should update the attribute", () => {
        const textAreaBubbleBasic = page.waitForElement(".mx-name-text_area_bubble_basic");

        richTextBubbleBasic.element.$(".form-control").setValue(plainValue);

        const updatedValue = richTextBubbleBasic.element.$(".form-control").getHTML(false);
        textAreaBubbleBasic.click();

        const content = textAreaBubbleBasic.getText();
        expect(content).toContain(updatedValue);
    });
});
