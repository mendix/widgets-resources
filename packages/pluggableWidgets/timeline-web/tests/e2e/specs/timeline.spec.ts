import page from "../../../../../../configs/e2e/src/pages/page";

describe("timeline-web", () => {
    beforeEach(() => {
        page.open(); // resets page
    });

    describe("option: basic", () => {
        it("compares with a screenshot baseline and checks if all timeline elements are rendered as expected", () => {
            browser.setWindowRect(0, 0, 1290, 900);
            const button = page.getWidget("actionButton3");
            button.click();
            const timeline = page.getWidget("layoutGridBasic");
            browser.saveElement(timeline, "timelineBasic");
            expect(browser.checkElement(timeline, "timelineBasic")).toEqual(0);
        });
        it("shows a message when event onclick is called", () => {
            const button = page.getWidget("actionButton3");
            button.click();
            const timeline = page.getElement(".timeline1");
            const item = page.getElement(".widget-eventTime", timeline);
            item.click();
            const dialog = page.modalDialog;
            dialog.waitForDisplayed();
            expect(dialog.getText()).toContain("Event called");
        });
    });
    describe("option: custom", () => {
        it("compares with a screenshot baseline and checks if all custom timeline elements are rendered as expected", () => {
            browser.setWindowRect(0, 0, 1290, 900);
            const timeline = page.getWidget("layoutGridCustom");
            browser.saveElement(timeline, "timelineCustom");
            expect(browser.checkElement(timeline, "timelineCustom")).toEqual(0);
        });
        it("shows a message when event onclick is called", () => {
            const timeline = page.getElement(".timeline1");
            const item = page.getElement(".mx-name-text6", timeline);
            item.click();
            const dialog = page.modalDialog;
            dialog.waitForDisplayed();
            expect(dialog.getText()).toContain("Event called");
        });
    });
});
