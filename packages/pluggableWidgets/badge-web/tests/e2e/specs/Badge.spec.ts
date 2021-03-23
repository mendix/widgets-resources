import page from "../../../../../../configs/e2e/src/pages/page";
import badgeWidget from "../Objects/badge.widget";
import input from "../Objects/input.widget";

describe("badge-web", () => {
    beforeAll(() => {
        page.open(); // resets page
    });

    describe("type: badge", () => {
        it("compares with a screenshot baseline and checks if all badges elements are rendered as expected", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const screenshotElem = $(".mx-name-table1");
            screenshotElem.waitForDisplayed({ timeout: 5000 });
            browser.saveElement(screenshotElem, "badgePageContent");
            expect(browser.checkElement(screenshotElem, "badgePageContent")).toEqual(0);
        });
        it("changes caption when attribute value is changed", () => {
            const newAttributeValue = "Test";
            const badge = new badgeWidget("badgeDanger");
            expect(badge.getText()).not.toContain(newAttributeValue);

            input.inputElement.setValue(newAttributeValue); // setValue isn't working correctly with inputs in the Mendix Client, therefore, newAttributeValue gets appended to existing value
            browser.keys("\uE007");
            expect(badge.getText()).toContain(newAttributeValue); // Badge text: NewSuccessTest
        });
    });
    describe("type: label", () => {
        it("changes caption when attribute value is changed", () => {
            const newAttributeValue = "Test";
            const badge = new badgeWidget("labelDanger");

            input.inputElement.setValue(newAttributeValue); // setValue isn't working correctly with inputs in the Mendix Client, therefore, newAttributeValue gets appended to existing value
            browser.keys("\uE007");
            expect(badge.getText()).toContain(newAttributeValue); // Badge text: NewSuccessTest
        });
    });
});
