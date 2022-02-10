import page from "../../../../../../configs/e2e/src/pages/page";

describe("Rating", () => {
    beforeAll(() => {
        page.open();
    });

    it("compares with a screenshot baseline and checks if all rating elements are rendered as expected", () => {
        browser.setWindowRect(0, 0, 1200, 900);
        const screenshotElem = $(".mx-name-ratingContent");
        const ratingWidget = $(".mx-name-rating1");
        screenshotElem.waitForDisplayed({ timeout: 5000 });
        ratingWidget.waitForDisplayed({ timeout: 5000 });
        browser.pause(1000);
        browser.saveElement(screenshotElem, "ratingPageContent");

        expect(browser.checkElement(screenshotElem, "ratingPageContent")).toBeLessThan(0.4);
    });
});
