import page from "../../../../../../configs/e2e/src/pages/page";

describe("timeline-web", () => {
    beforeAll(() => {
        page.open();
        const button = page.getWidget("actionButton1");
        button.click();
        const buttonNew = page.getWidget("newButton1");
        buttonNew.click();
        const date = page.getWidget("datePicker1");
        date.$(".form-control").setValue("10/5/2020");
        const title = page.getWidget("textBox1");
        title.$(".form-control").setValue("Title");
        const content = page.getWidget("textBox2");
        content.$(".form-control").setValue("Content");
        const name = page.getWidget("textBox3");
        name.$(".form-control").setValue("Name");
        const buttonSave = page.getElement(".btn-success");
        buttonSave.click();
        buttonNew.click();
        date.$(".form-control").setValue("6/5/2020");
        title.$(".form-control").setValue("Title 1");
        content.$(".form-control").setValue("Content 1");
        name.$(".form-control").setValue("Name 1");
        buttonSave.click();
        page.open();
    });

    describe("option: basic", () => {
        it("compares with a screenshot baseline and checks if all timeline elements are rendered as expected", () => {
            browser.setWindowRect(0, 0, 1290, 900);
            const button = page.getWidget("actionButton3");
            button.waitForDisplayed();
            button.click();
            const timeline = page.getWidget("layoutGridBasic");
            browser.saveElement(timeline, "timelineBasic");

            expect(browser.checkElement(timeline, "timelineBasic")).toEqual(0);
        });
        it("shows a message when event onclick is called", () => {
            page.open();
            const button = page.getWidget("actionButton3");
            button.waitForDisplayed();
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
            page.open();
            browser.setWindowRect(0, 0, 1290, 900);
            const timeline = page.getWidget("layoutGridCustom");
            timeline.waitForDisplayed();
            browser.saveElement(timeline, "timelineCustom");

            expect(browser.checkElement(timeline, "timelineCustom")).toEqual(0);
        });
        it("shows a message when event onclick is called", () => {
            const timeline = page.getElement(".timeline1");
            const item = page.getElement(".mx-name-text6", timeline);
            item.waitForDisplayed();
            item.click();
            const dialog = page.modalDialog;
            dialog.waitForDisplayed();

            expect(dialog.getText()).toContain("Event called");
        });
    });
});
