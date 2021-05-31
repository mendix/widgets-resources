import page from "../../../../../../configs/e2e/src/pages/page";
import Calendar from "../objects/calendar.widget";

describe("Calendar", () => {
    const calendar = new Calendar("calendar1");

    beforeEach(() => {
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
    it("renders start date attribute correctly", () => {
        page.open("p/startPosition");
        const calendar = new Calendar("calendar2");
        calendar.element.waitForExist();
        expect(calendar.label.getText()).toBe("Tuesday 02/02/2021");
    });
    it("renders correct start date after switching the object", () => {
        page.open("p/startPosition");
        page.getWidget("switchObjectButton").click();
        const calendar = new Calendar("calendar2");
        calendar.element.waitForExist();
        expect(calendar.label.getText()).toBe("Saturday 01/05/2021");
    });
});
