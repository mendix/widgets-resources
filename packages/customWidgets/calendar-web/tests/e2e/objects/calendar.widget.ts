import page from "../../../../../../configs/e2e/src/pages/page";

class Calendar {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    getElement(): Promise<WebdriverIO.Element> {
        return page.getWidget(this.name);
    }

    getMonthView(): Promise<WebdriverIO.Element> {
        return $(`.mx-name-${this.name} .rbc-month-view`);
    }
    getLabel(): Promise<WebdriverIO.Element> {
        return $(`.mx-name-${this.name} .calendar-label`);
    }

    async getDayViewButton(): Promise<WebdriverIO.Element> {
        return (await this.getElement()).$(".btn.btn-default.toolbar-btn-day");
    }

    async getWeekViewButton(): Promise<WebdriverIO.Element> {
        return (await this.getElement()).$(".btn.btn-default.toolbar-btn-week");
    }

    async getDaysDisplayed(): Promise<number> {
        return (await (await this.getElement()).$$(".rbc-header")).length;
    }

    getEvent(): Promise<WebdriverIO.Element> {
        return $(`.mx-name-${this.name} .rbc-event-content`);
    }

    getCalendarSlot(): Promise<WebdriverIO.Element> {
        return $(`.mx-name-${this.name} .rbc-day-bg`);
    }

    static getErrorAlert(): Promise<WebdriverIO.Element> {
        return $(".alert.alert-danger.widget-calendar-alert");
    }
}

export default Calendar;
