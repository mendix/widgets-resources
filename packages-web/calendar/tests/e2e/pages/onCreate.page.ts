class OnCreateEventPage {
    public get calendar() {
        return browser.element(".mx-name-calendar1");
    }

    public get calendarSlot() {
        return browser.element(".mx-name-calendar1 .rbc-day-bg");
    }

    public get newEventPage() {
        return browser.element(".mx-window-content");
    }

    public open(): void {
        browser.url("/p/onCreate");
    }
}

const page = new OnCreateEventPage();

export default page;
