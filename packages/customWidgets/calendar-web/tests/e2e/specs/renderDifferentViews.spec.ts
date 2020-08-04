import page from "../../../../../../configs/e2e/src/pages/page";
import Calendar from "../objects/calendar.widget";

describe("Calendar", () => {
    const calendar = new Calendar("calendar1");

    beforeAll(() => {
        page.open();
    });

    it("renders month view", () => {
        calendar.element.waitForExist();
        calendar.monthView.waitForExist();
        expect(calendar.monthView.isExisting).toBeTruthy();
    });

    it("renders week view", () => {
        calendar.weekViewButton.click();
        calendar.calendarSlot.waitForExist();
        expect(calendar.daysDisplayed).toBe(7);
    });
    it("renders day view", () => {
        calendar.dayViewButton.click();
        calendar.calendarSlot.waitForExist();
        expect(calendar.daysDisplayed).toBe(1);
    });
});
