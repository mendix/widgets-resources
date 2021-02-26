import page from "../../../../../../configs/e2e/src/pages/page";
import FieldsetWidget from "../objects/Fieldset.widget";

describe("Fieldset", () => {
    beforeAll(() => {
        page.open("p/configuration-combinations");
    });

    it("renders content and legend", () => {
        const fieldset = new FieldsetWidget("fieldsetLegendYes");

        expect(fieldset.getLegendText()).toBe("Smith's personal info");

        const fieldsetContent = fieldset.getContent();
        expect(fieldsetContent.length).toBe(2);
        expect(fieldsetContent[0].getAttribute("class")).toContain("mx-name-LegendYesFirstNameTextBox");
        expect(fieldsetContent[1].getAttribute("class")).toContain("mx-name-LegendYesLastNameTextBox");
    });

    it("renders content without legend", () => {
        const fieldset = new FieldsetWidget("fieldsetLegendNo");

        expect(fieldset.hasLegend()).toBe(false);

        const fieldsetContent = fieldset.getContent();
        expect(fieldsetContent.length).toBe(2);
        expect(fieldsetContent[0].getAttribute("class")).toContain("mx-name-LegendNoFirstNameTextBox");
        expect(fieldsetContent[1].getAttribute("class")).toContain("mx-name-LegendNoLastNameTextBox");
    });

    it("renders when content is hidden by conditional visibility", () => {
        const checkBoxWidget = page.getWidget("checkBoxVisible");
        const fieldset = new FieldsetWidget("fieldsetConVis");

        expect(fieldset.hasLegend()).toBe(true);
        expect(fieldset.getContent().length).toBe(2);

        checkBoxWidget.click();
        expect(fieldset.hasLegend()).toBe(true);
        expect(fieldset.getContent().length).toBe(0);
    });

    it("updates legend when attribute value changes", () => {
        const fieldset = new FieldsetWidget("fieldsetLegendYes");

        expect(fieldset.getLegendText()).toBe("Smith's personal info");

        const fieldsetContent = fieldset.getContent();
        const lastNameTextBox = fieldsetContent[1];

        lastNameTextBox.$("input").setValue("\uE003\uE003\uE003\uE003\uE003"); // Chrome is not clearing value before set new value (https://github.com/webdriverio/webdriverio/issues/3024)
        lastNameTextBox.$("input").setValue("Smiths");
        browser.keys("\uE007");

        expect(fieldset.getLegendText()).toBe("Smiths's personal info");
    });
});
