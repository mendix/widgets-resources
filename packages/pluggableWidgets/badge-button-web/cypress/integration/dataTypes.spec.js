describe("BadgeButton different data types", () => {
    const cleanMendixSession = () => {
        cy.window().then(window => {
            // Cypress opens a new session for every test, so it exceeds mendix license limit of 5 sessions, we need to logout after each test.
            window.mx.session.logout();
        });
    };

    beforeEach(() => {
        cy.visit("p/dataTypes");
    });

    afterEach(() => cleanMendixSession());

    it("displays correctly string data", () => {
        cy.get(".mx-name-badgeButtonString").should("be.visible");
        cy.get(".mx-name-badgeButtonString").find(".widget-badge-button-text").should("contain.text", "Button");
        cy.get(".mx-name-badgeButtonString").find(".badge").should("contain.text", "New");
    });

    it("displays correctly integer data", () => {
        cy.get(".mx-name-badgeButtonInteger").should("be.visible");
        cy.get(".mx-name-badgeButtonInteger").find(".widget-badge-button-text").should("contain.text", "Caption");
        cy.get(".mx-name-badgeButtonInteger").find(".badge").should("contain.text", "10");
    });

    it("displays correctly long data", () => {
        cy.get(".mx-name-badgeButtonLong").should("be.visible");
        cy.get(".mx-name-badgeButtonLong").find(".widget-badge-button-text").should("contain.text", "Caption");
        cy.get(".mx-name-badgeButtonLong").find(".badge").should("contain.text", "2,147,483,647");
    });

    it("displays correctly decimal data", () => {
        cy.get(".mx-name-badgeButtonDecimal").should("be.visible");
        cy.get(".mx-name-badgeButtonDecimal").find(".widget-badge-button-text").should("contain.text", "Caption");
        cy.get(".mx-name-badgeButtonDecimal").find(".badge").should("contain.text", "2.5");
    });
});
