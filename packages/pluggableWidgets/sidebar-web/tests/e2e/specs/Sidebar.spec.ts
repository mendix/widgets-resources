import page from "../../../../../../configs/e2e/src/pages/page";

describe("sidebar-web", () => {
    beforeEach(() => {
        page.open(); // resets page
        browser.setWindowRect(0, 0, 1200, 900);
    });

    describe("toggle mode: none", () => {
        it("compares with a screenshot baseline and checks if it's rendered as expected", () => {
            const button = $(".mx-name-navigationTree3-1 > span");
            button.click();
            const screenshotElem = $(".mx-page");
            screenshotElem.waitForDisplayed({ timeout: 5000 });
            browser.saveElement(screenshotElem, "sidebarNone");
            expect(browser.checkElement(screenshotElem, "sidebarNone")).toEqual(0);
        });
    });

    describe("toggle mode: push aside", () => {
        it("compares with a screenshot baseline and checks if it's rendered as expected", () => {
            const button = $(".mx-name-navigationTree3-2 > span");
            button.click();
            const screenshotElem = $(".mx-page");
            screenshotElem.waitForDisplayed({ timeout: 5000 });
            browser.saveElement(screenshotElem, "sidebarPushAside");
            expect(browser.checkElement(screenshotElem, "sidebarPushAside")).toEqual(0);
        });
    });

    describe("toggle mode: shrink collapsed", () => {
        it("compares with a screenshot baseline and checks if it's rendered as expected", () => {
            const button = $(".mx-name-navigationTree3-3 > span");
            button.click();
            const screenshotElem = $(".mx-page");
            screenshotElem.waitForDisplayed({ timeout: 5000 });
            browser.saveElement(screenshotElem, "sidebarShrinkCollapsed");
            expect(browser.checkElement(screenshotElem, "sidebarShrinkCollapsed")).toEqual(0);
        });
    });

    describe("toggle mode: shrink expanded", () => {
        it("compares with a screenshot baseline and checks if it's rendered as expected", () => {
            const button = $(".mx-name-navigationTree3-4 > span");
            button.click();
            const screenshotElem = $(".mx-page");
            screenshotElem.waitForDisplayed({ timeout: 5000 });
            browser.saveElement(screenshotElem, "sidebarShrinkExpanded");
            expect(browser.checkElement(screenshotElem, "sidebarShrinkExpanded")).toEqual(0);
        });
    });

    describe("toggle mode: slider over", () => {
        it("compares with a screenshot baseline and checks if it's rendered as expected", () => {
            const button = $(".mx-name-navigationTree3-5 > span");
            button.click();
            const toggle = $(".mx-name-sidebarToggle1 > span");
            toggle.click();
            const screenshotElem = $(".mx-page");
            screenshotElem.waitForDisplayed({ timeout: 5000 });
            browser.saveElement(screenshotElem, "sidebarSlideOver");
            expect(browser.checkElement(screenshotElem, "sidebarSlideOver")).toEqual(0);
        });
    });
    describe("multiple sidebars", () => {
        it("compares with a screenshot baseline and checks if it's rendered as expected", () => {
            const button = $(".mx-name-navigationTree3-6 > span");
            button.click();
            const toggle = $(".mx-name-sidebarToggle1 > span");
            toggle.click();
            const screenshotElem = $(".mx-page");
            screenshotElem.waitForDisplayed({ timeout: 5000 });
            browser.saveElement(screenshotElem, "sidebarMultiple");
            expect(browser.checkElement(screenshotElem, "sidebarMultiple")).toEqual(0);
        });
    });
    describe("targeted sidebar", () => {
        it("compares with a screenshot baseline and checks if it's rendered as expected", () => {
            const button = $(".mx-name-navigationTree3-7 > span");
            button.click();
            const toggle = $(".mx-name-actionButton1");
            toggle.waitForDisplayed({ timeout: 5000 });
            toggle.click();
            const screenshotElem = $(".mx-page");
            screenshotElem.waitForDisplayed({ timeout: 5000 });
            browser.saveElement(screenshotElem, "sidebarTargeted");
            expect(browser.checkElement(screenshotElem, "sidebarTargeted")).toEqual(0);
        });
    });
});
