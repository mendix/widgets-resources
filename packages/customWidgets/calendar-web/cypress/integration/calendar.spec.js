// Variables being used along multiple test cases
const calendarSelector = ".mx-name-calendar";
const calendarMonthViewSelector = ".rbc-month-view";
const calendarSlotSelector = ".rbc-day-bg";
const modalHeader = ".modal-dialog";

describe("Calendar", () => {
    const cleanMendixSession = () => {
        cy.window().then(window => {
            // Cypress opens a new session for every test, so it exceeds mendix license limit of 5 sessions, we need to logout after each test.
            window.mx.session.logout();
        });
    };

    describe("with Datasource", () => {
        afterEach(() => cleanMendixSession());

        it("should render with a context datasource", () => {
            cy.visit("/p/datasourceContext");
            cy.get(`${calendarSelector}1 ${calendarMonthViewSelector}`).should("be.visible");
        });

        it("should render with a xpath datasource", () => {
            cy.visit("/");
            cy.get(`${calendarSelector}1 ${calendarMonthViewSelector}`).should("be.visible");
        });

        it("should render with a microflow datasource", () => {
            cy.visit("/p/datasourceMicroflow");
            cy.get(`${calendarSelector}1 ${calendarMonthViewSelector}`).should("be.visible");
        });

        it("should render with a nanoflow datasource", () => {
            cy.visit("/p/datasourceNanoflow");
            cy.get(`${calendarSelector}1 ${calendarMonthViewSelector}`).should("be.visible");
        });
    });

    describe("with errors", () => {
        const alertSelector = ".alert.alert-danger.widget-calendar-alert";

        afterEach(() => cleanMendixSession());

        it("should show error if no onClick microflow configured", () => {
            cy.visit("/p/noMicroflow");
            cy.get(alertSelector).contains("On click event is set to 'Call a microflow' but no microflow is selected");
        });

        it("should show error if no onClick nanoflow configured", () => {
            cy.visit("/p/noNanoflow");
            cy.get(alertSelector).contains("On click event is set to 'Call a nanoflow' but no nanoflow is selected");
        });

        it("should show error if no datasource microflow configured", () => {
            cy.visit("/p/noMicroflowDatasource");
            cy.get(alertSelector).contains("Datasource is set to 'microflow' but no microflow is selected");
        });

        it("should show error if no datasource nanoflow configured", () => {
            cy.visit("/p/noNanoflowDatasource");
            cy.get(alertSelector).contains("Datasource is set to 'nanoflow' but no nanoflow is selected");
        });
    });

    describe("with on click", () => {
        const calendarEventSelector = ".rbc-event-content";

        beforeEach(() => {
            cy.visit("/p/onClick");
        });

        afterEach(() => cleanMendixSession());

        it("on click microflow triggered", () => {
            cy.get(`${calendarSelector}1 ${calendarEventSelector}`).should("be.visible");
            cy.get(`${calendarSelector}1 ${calendarEventSelector}`).first().click();
            cy.get(modalHeader).find("#mxui_widget_Window_0_caption").contains("Microflow");
        });

        it("on click nanoflow triggered", () => {
            cy.get(".mx-name-tabPage2").click();
            cy.get(`${calendarSelector}2 ${calendarEventSelector}`).should("be.visible");
            cy.get(`${calendarSelector}2 ${calendarEventSelector}`).first().click();
            cy.get(modalHeader).find("#mxui_widget_Window_0_caption").contains("Nanoflow");
        });
    });

    describe("with on create", () => {
        beforeEach(() => {
            cy.visit("/p/onCreate");
        });

        afterEach(() => cleanMendixSession());

        it("should open create event page with Microflow", () => {
            cy.get(`${calendarSelector}1 ${calendarSlotSelector}`).should("be.visible");
            cy.get(`${calendarSelector}1 ${calendarSlotSelector}`).first().click();
            cy.get(modalHeader).find("#mxui_widget_Window_0_caption").contains("Edit Event (Microflow)");
        });

        it("should open create event page with Nanoflow", () => {
            cy.get(".mx-name-tabPage2").click();
            cy.get(`${calendarSelector}2 ${calendarSlotSelector}`).should("be.visible");
            cy.get(`${calendarSelector}2 ${calendarSlotSelector}`).first().click();
            cy.get(modalHeader).find("#mxui_widget_Window_0_caption").contains("Edit Event (Nanoflow)");
        });
    });

    describe("with different views", () => {
        const daysDisplayedSelector = ".rbc-header";
        const labelSelector = ".calendar-label";
        const weekViewButtonSelector = ".btn.btn-default.toolbar-btn-week";
        const dayViewButtonSelector = ".btn.btn-default.toolbar-btn-day";

        it("renders month view", () => {
            cy.visit("/");
            cy.get(`${calendarSelector}1 ${calendarMonthViewSelector}`).should("be.visible");
        });

        afterEach(() => cleanMendixSession());

        it("renders week view", () => {
            cy.visit("/");
            cy.get(weekViewButtonSelector).click();
            cy.get(`${calendarSelector}1 ${calendarSlotSelector}`).should("be.visible");
            cy.get(`${calendarSelector}1 ${daysDisplayedSelector}`).should("have.length", 7);
        });
        it("renders day view", () => {
            cy.visit("/");
            cy.get(dayViewButtonSelector).click();
            cy.get(`${calendarSelector}1 ${calendarSlotSelector}`).should("be.visible");
            cy.get(`${calendarSelector}1 ${daysDisplayedSelector}`).should("have.length", 1);
        });
        it("renders start date attribute correctly", () => {
            cy.visit("/p/startPosition");
            cy.get(`${calendarSelector}2 ${labelSelector}`).contains("Tuesday 02/02/2021");
        });
        it("renders correct start date after switching the object", () => {
            cy.visit("/p/startPosition");
            cy.get(".mx-name-switchObjectButton").click();
            cy.wait(1000);
            cy.get(`${calendarSelector}2 ${labelSelector}`).contains("Saturday 01/05/2021");
        });
    });
});
