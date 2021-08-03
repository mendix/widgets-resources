import page from "../../../../../../configs/e2e/src/pages/page";

describe("timeline-web", () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    beforeAll(() => {
        page.open();
        browser.pause(1000);
    });

    describe("option: basic", () => {
        it("compares with a screenshot baseline and checks if all timeline elements are rendered as expected", () => {
            const button = page.getWidget("basicTimelinePage");
            button.waitForDisplayed({ timeout: 5000 });
            button.click();
            const timeline = page.getWidget("timelineGrids");
            timeline.waitForDisplayed({ timeout: 5000 });

            expect(browser.checkElement(timeline, "timelineBasic")).toEqual(0);
        });
        it("shows a message when event onclick is called", () => {
            page.open();
            const button = page.getWidget("basicTimelinePage");
            button.waitForDisplayed();
            button.click();
            const timeline = page.getElement(".timelineBasic");
            const item = page.getElement(".clickable", timeline);
            item.click();
            const dialog = page.modalDialog;
            dialog.waitForDisplayed();

            expect(dialog.getText()).toContain("Event called");
        });
    });
    describe("option: custom", () => {
        it("compares with a screenshot baseline and checks if all custom timeline elements are rendered as expected", () => {
            page.open();
            browser.pause(1000);
            const timeline = page.getWidget("customTimelineLayoutGrid");
            timeline.waitForDisplayed({ timeout: 5000 });

            expect(browser.checkElement(timeline, "timelineCustom")).toEqual(0);
        });
        it("shows a message when event onclick is called", () => {
            const timeline = page.getElement(".timelineCustom");
            const item = page.getElement(".mx-name-clickMeTitle", timeline);
            item.waitForDisplayed();
            item.click();
            const dialog = page.modalDialog;
            dialog.waitForDisplayed();

            expect(dialog.getText()).toContain("Event called");
        });
    });
});
