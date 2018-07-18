class OnClickEventPage {
    public get calendar() {
        return browser.element(".mx-name-calendar1");
    }

    public get calendarEvent() {
        return browser.element(".mx-name-calendar1 .rbc-event-content");
    }

    public get eventEditPage() {
        return browser.element(".modal-content");
    }

    public open(): void {
        browser.url("/p/onClick");
    }
}

const page = new OnClickEventPage();

export default page;
