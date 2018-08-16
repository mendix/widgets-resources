class HomePage {
    public get calendar() {
        return browser.element(".mx-name-calendar1");
    }

    public get monthView() {
        return browser.element(".mx-name-calendar1 .rbc-month-view");
    }

    public get dayViewButton() {
        return browser.element(".mx-name-calendar1 .mx-grid-controlbar .mx-grid-toolbar.calendar-messages button:nth-child(3)");
    }

    public get dayView() {
        return browser.element(".mx-name-calendar1 .rbc-time-view");
    }

    public open(): void {
        browser.url("/");
    }
}

const page = new HomePage();

export default page;
