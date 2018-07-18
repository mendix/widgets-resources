import HomePage from "./pages/home.page";
import OnClickEventPage from "./pages/onClick.page";
import OnCreateEventPage from "./pages/onCreate.page";

describe("Calendar", () => {
    it("renders month view", () => {
        HomePage.open();
        HomePage.calendar.waitForExist();
        HomePage.monthView.waitForExist();
        const doesExist = HomePage.monthView.isExisting();

        expect(doesExist).toBeTruthy();
    });

    it("renders day view", () => {
        HomePage.dayViewButton.click();
        HomePage.dayView.waitForExist();
        const doesExist = HomePage.dayView.isExisting();

        expect(doesExist).toBeTruthy();
    });

    it("should excecute an action on clicking an event", () => {
        OnClickEventPage.open();
        OnClickEventPage.calendar.waitForVisible();
        OnClickEventPage.calendarEvent.waitForVisible();
        OnClickEventPage.calendarEvent.click();
        OnClickEventPage.eventEditPage.waitForVisible();
        const doesExist = OnClickEventPage.eventEditPage.isExisting();

        expect(doesExist).toBeTruthy();
    });

    it("should excecute an action on clicking a slot", () => {
        OnCreateEventPage.open();
        OnCreateEventPage.calendarSlot.waitForVisible();
        OnCreateEventPage.calendarSlot.click();
        OnCreateEventPage.newEventPage.waitForVisible();
        const doesExist = OnCreateEventPage.newEventPage.isExisting();

        expect(doesExist).toBeTruthy();
    });
});
