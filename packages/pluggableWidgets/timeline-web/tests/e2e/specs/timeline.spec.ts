import page from "../../../../../../configs/e2e/src/pages/page";

describe("timeline-web", () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    beforeAll(() => {
        page.open();
    });

    describe("option: basic", () => {
        it("compares with a screenshot baseline and checks if all timeline elements are rendered as expected", () => {
            browser.setWindowRect(0, 0, 1290, 900);
            const button = page.getWidget("basicTimelinePage");
            button.waitForDisplayed();
            button.click();
            const timeline = page.getWidget("timelineGrids");
            browser.saveElement(timeline, "timelineBasic");

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
            browser.setWindowRect(0, 0, 1290, 1200);
            const timeline = page.getWidget("customTimelineLayoutGrid");
            timeline.waitForDisplayed();
            browser.saveElement(timeline, "timelineCustom");

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
