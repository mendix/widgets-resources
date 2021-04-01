import page from "../../../../../../configs/e2e/src/pages/page";

class Calendar {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    get element(): WebdriverIO.Element {
        return page.getWidget(this.name);
    }

    get monthView(): WebdriverIO.Element {
        return $(`.mx-name-${this.name} .rbc-month-view`);
    }
    get label(): WebdriverIO.Element {
        return $(`.mx-name-${this.name} .calendar-label`);
    }

    get dayViewButton(): WebdriverIO.Element {
        return this.element.$(".btn.btn-default.toolbar-btn-day");
    }

    get weekViewButton(): WebdriverIO.Element {
        return this.element.$(".btn.btn-default.toolbar-btn-week");
    }

    get daysDisplayed(): number {
        return this.element.$$(".rbc-header").length;
    }

    get event(): WebdriverIO.Element {
        return $(`.mx-name-${this.name} .rbc-event-content`);
    }

    static get errorAlert(): WebdriverIO.Element {
        return $(".alert.alert-danger.widget-calendar-alert");
    }

    get calendarSlot(): WebdriverIO.Element {
        return $(`.mx-name-${this.name} .rbc-day-bg`);
    }
}

export default Calendar;
