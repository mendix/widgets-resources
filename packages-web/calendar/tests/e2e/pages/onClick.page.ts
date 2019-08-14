class OnClickEventPage {
    get calendar(): WebdriverIO.Element {
        return $(".mx-name-calendar1");
    }

    get calendarEvent(): WebdriverIO.Element {
        return $(".mx-name-calendar1 .rbc-event-content");
    }

    get eventEditPage(): WebdriverIO.Element {
        return $(".modal-content");
    }

    open(): void {
        browser.url("/p/onClick");
    }
}

const page = new OnClickEventPage();

export default page;
