import page from "../../../../../../configs/e2e/src/pages/page";
import badgeButtonWidget from "../objects/badgeButton.widget";

describe("BadgeButton", () => {
    beforeAll(() => {
        page.open();
    });

    it("displays correctly dynamic data", () => {
        const badgeButton = new badgeButtonWidget("badgeButtonDynamic");

        badgeButton.element.waitForDisplayed();
        expect(badgeButton.getText()).toEqual("Button");
        expect(badgeButton.getBadgeText()).toEqual("New");
    });

    it("updates text value", () => {
        const textInput = page.getWidget("textBox1");
        textInput.$(".form-control").setValue("\uE003\uE003\uE003"); // Chrome is not clearing value before set new value (https://github.com/webdriverio/webdriverio/issues/3024)
        textInput.$(".form-control").setValue("Newer");
        textInput.$(".control-label").click();

        const badgeButton = new badgeButtonWidget("badgeButtonDynamic");

        badgeButton.element.waitForDisplayed();
        expect(badgeButton.getText()).toEqual("Button");
        expect(badgeButton.getBadgeText()).toEqual("Newer");
    });

    it("compares with a screenshot baseline and checks if all badge buttons elements are rendered as expected", () => {
        browser.setWindowRect(0, 0, 1200, 900);
        const screenshotElem = $(".mx-name-table1");
        screenshotElem.waitForDisplayed({ timeout: 5000 });
        browser.saveElement(screenshotElem, "badgeButtonPageContent");
        expect(browser.checkElement(screenshotElem, "badgeButtonPageContent")).toEqual(0);
    });
});
