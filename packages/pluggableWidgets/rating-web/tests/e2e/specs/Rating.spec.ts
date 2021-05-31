describe("Rating", () => {
    beforeAll(() => {
        browser.url("/p/home");
    });

    it("compares with a screenshot baseline and checks if all rating elements are rendered as expected", () => {
        browser.setWindowRect(0, 0, 1200, 900);
        const screenshotElem = $(".mx-name-mainLayoutGrid");
        screenshotElem.waitForDisplayed({ timeout: 5000 });
        browser.pause(2000);
        browser.saveElement(screenshotElem, "ratingPageContent");
        expect(browser.checkElement(screenshotElem, "ratingPageContent")).toBeLessThan(0.4);
    });
});
