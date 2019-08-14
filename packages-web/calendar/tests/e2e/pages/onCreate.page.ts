class OnCreateEventPage {
    get calendar(): WebdriverIO.Element {
        return $(".mx-name-calendar1");
    }

    get calendarSlot(): WebdriverIO.Element {
        return $(".mx-name-calendar1 .rbc-day-bg");
    }

    get newEventPage(): WebdriverIO.Element {
        return $(".mx-window-content");
    }

    open(): void {
        browser.url("/p/onCreate");
    }
}

const page = new OnCreateEventPage();

export default page;
