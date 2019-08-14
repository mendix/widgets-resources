class HomePage {
    get calendar(): WebdriverIO.Element {
        return $(".mx-name-calendar1");
    }

    get monthView(): WebdriverIO.Element {
        return $(".mx-name-calendar1 .rbc-month-view");
    }

    get dayViewButton(): WebdriverIO.Element {
        return $(".mx-name-calendar1 .mx-grid-controlbar .mx-grid-toolbar.calendar-messages button:nth-child(3)");
    }

    get dayView(): WebdriverIO.Element {
        return $(".mx-name-calendar1 .rbc-time-view");
    }

    open(): void {
        browser.url("/");
    }
}

const page = new HomePage();

export default page;
