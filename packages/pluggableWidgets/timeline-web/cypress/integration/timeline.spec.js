describe("timeline-web", () => {
    const browserName = Cypress.browser.name;
    const cleanMendixSession = () => {
        cy.window().then(window => {
            // Cypress opens a new session for every test, so it exceeds mendix license limit of 5 sessions, we need to logout after each test.
            window.mx.session.logout();
        });
    };

    beforeEach(() => {
        cy.visit("/"); // resets page
    });

    afterEach(() => cleanMendixSession());

    describe("option: basic", () => {
        it("compares with a screenshot baseline and checks if all timeline elements are rendered as expected", () => {
            cy.get(".mx-name-basicTimelinePage").click();
            cy.wait(1000);
            cy.get(".mx-name-timelineGrids").compareSnapshot(`timelineBasic-${browserName}`, 0.1);
        });
        it("shows a message when event onclick is called", () => {
            cy.get(".mx-name-basicTimelinePage").click();
            cy.wait(1000);
            cy.get(".mx-name-timelineBasic .clickable").first().click();
            cy.wait(1000);
            cy.get(".modal-dialog .modal-body").should("be.visible").and("contain.text", "Event called");
        });
    });
    describe("option: custom", () => {
        it("compares with a screenshot baseline and checks if all custom timeline elements are rendered as expected", () => {
            cy.get(".mx-name-customTimelineLayoutGrid").should("be.visible");
            cy.get(".mx-name-customTimelineLayoutGrid").compareSnapshot(`timelineCustom-${browserName}`, 0.1);
        });
        it("shows a message when event onclick is called", () => {
            cy.get(".mx-name-timelineCustom .mx-name-clickMeTitle").first().click();
            cy.wait(1000);
            cy.get(".modal-dialog .modal-body").should("be.visible").and("contain.text", "Event called");
        });
    });
});
