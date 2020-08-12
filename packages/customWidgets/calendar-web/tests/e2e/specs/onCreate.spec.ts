import page from "../../../../../../configs/e2e/src/pages/page";
import Calendar from "../objects/calendar.widget";

describe("Calendar", () => {
    beforeEach(() => {
        page.open("p/onCreate");
    });

    it("should open create event page with Microflow", () => {
        const calendar = new Calendar("calendar1");

        calendar.element.waitForExist();
        calendar.calendarSlot.click();
        page.modalDialog.waitForExist();

        expect(page.modalDialogHeader.getText()).toContain("Edit Event (Microflow)");
    });

    it("should open create event page with Nanoflow", () => {
        page.getWidget("tabPage2").click();
        const calendar = new Calendar("calendar2");

        calendar.element.waitForExist();
        calendar.calendarSlot.click();
        page.modalDialog.waitForExist();

        expect(page.modalDialogHeader.getText()).toContain("Edit Event (Nanoflow)");
    });
});
