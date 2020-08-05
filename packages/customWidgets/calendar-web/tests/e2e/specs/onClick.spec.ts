import page from "../../../../../../configs/e2e/src/pages/page";
import Calendar from "../objects/calendar.widget";

describe("Calendar", () => {
    beforeEach(() => {
        page.open("p/onClick");
    });

    it("on click microflow triggered", () => {
        const calendar = new Calendar("calendar1");

        calendar.element.waitForExist();
        calendar.event.waitForExist();
        calendar.event.click();
        page.modalDialog.waitForExist();
        expect(page.modalDialogHeader.getText()).toContain("Microflow");
    });

    it("on click nanoflow triggered", () => {
        page.getWidget("tabPage2").click();
        const calendar = new Calendar("calendar2");

        calendar.element.waitForExist();
        calendar.event.waitForExist();
        calendar.event.click();
        page.modalDialog.waitForExist();
        expect(page.modalDialogHeader.getText()).toContain("Nanoflow");
    });
});
