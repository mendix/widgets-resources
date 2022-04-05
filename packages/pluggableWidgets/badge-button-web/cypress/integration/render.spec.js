describe("BadgeButton", () => {
    const browserName = Cypress.browser.name;
    const cleanMendixSession = () => {
        cy.window().then(window => {
            // Cypress opens a new session for every test, so it exceeds mendix license limit of 5 sessions, we need to logout after each test.
            window.mx.session.logout();
        });
    };

    beforeEach(() => {
        cy.visit("/");
    });

    afterEach(() => cleanMendixSession());

    it("displays correctly dynamic data", () => {
        cy.get(".mx-name-badgeButtonDynamic").should("be.visible");
        cy.get(".mx-name-badgeButtonDynamic").find(".widget-badge-button-text").should("contain.text", "Button");
        cy.get(".mx-name-badgeButtonDynamic").find(".badge").should("contain.text", "New");
    });

    it("updates text value", { browser: "!firefox" }, () => {
        cy.get(".mx-name-textBox1 input").type("\uE003\uE003\uE003", { force: true }); // Chrome is not clearing value before set new value
        cy.get(".mx-name-textBox1 input").type("Newer", { force: true });
        cy.get(".mx-name-textBox1").find(".control-label").click();
        cy.get(".mx-name-badgeButtonDynamic").should("be.visible");
        cy.get(".mx-name-badgeButtonDynamic").find(".widget-badge-button-text").should("contain.text", "Button");
        cy.get(".mx-name-badgeButtonDynamic").find(".badge").should("contain.text", "Newer");
    });

    it("compares with a screenshot baseline and checks if all badge buttons elements are rendered as expected", () => {
        cy.get(".mx-name-badgeButtonDynamic").should("be.visible");
        cy.compareSnapshot(`badgeButtonPageContent-${browserName}`, 0.1);
    });
});
