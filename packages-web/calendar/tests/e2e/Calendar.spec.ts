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
    }, 30000);

    it("should execute an action when a calendar event is clicked", () => {
        OnClickEventPage.open();
        OnClickEventPage.calendar.waitForDisplayed();
        OnClickEventPage.calendarEvent.waitForDisplayed();
        OnClickEventPage.calendarEvent.click();
        OnClickEventPage.eventEditPage.waitForDisplayed();
        const doesExist = OnClickEventPage.eventEditPage.isExisting();

        expect(doesExist).toBeTruthy();
    });

    it("should execute an action when a slot is clicked", () => {
        OnCreateEventPage.open();
        OnCreateEventPage.calendarSlot.waitForDisplayed();
        OnCreateEventPage.calendarSlot.click();
        OnCreateEventPage.newEventPage.waitForDisplayed();
        const doesExist = OnCreateEventPage.newEventPage.isExisting();

        expect(doesExist).toBeTruthy();
    });
});
