import page from "../../../../../../configs/e2e/src/pages/page";

describe("Rating", () => {
    beforeAll(() => {
        page.open();
        browser.pause(1000);
    });

    it("compares with a screenshot baseline and checks if all rating elements are rendered as expected", () => {
        const screenshotElem = $(".mx-name-ratingContent");
        const ratingWidget = $(".mx-name-rating1");
        screenshotElem.waitForDisplayed({ timeout: 5000 });
        ratingWidget.waitForDisplayed({ timeout: 5000 });
        browser.pause(2000);

        expect(browser.checkElement(screenshotElem, "ratingPageContent")).toBeLessThan(0.4);
    });
});
