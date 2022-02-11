describe("Switch", () => {
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

    it("changes color when checked", () => {
        cy.get(".mx-name-switch1").should("be.visible");
        cy.get(".mx-name-switch1 .widget-switch-btn-wrapper").should(
            "have.css",
            "background-color",
            "rgb(100, 189, 99)"
        );
    });

    it("is updated by an attribute", () => {
        cy.get(".mx-name-radioButtons6 label").first().click();
        cy.get(".mx-name-switch2").should("be.visible");
        cy.get(".mx-name-switch2 .widget-switch-btn-wrapper").invoke("attr", "class").should("contain", "checked");
        cy.get(".mx-name-switch2 .widget-switch-btn-wrapper").invoke("attr", "aria-checked").should("eq", "true");
    });

    it("updates attribute when clicked", () => {
        cy.get(".mx-name-switch2").should("be.visible");
        cy.get(".mx-name-switch2 .widget-switch-btn-wrapper").first().click();
        cy.get(".mx-name-radioButtons6 input:checked").should("have.value", "true");
    });

    it("opens popup when clicked", () => {
        cy.get(".mx-name-switch3").should("be.visible");
        cy.get(".mx-name-switch3 .widget-switch-btn-wrapper").first().click();
        cy.get(".mx-name-radioButtons7 input:checked").should("have.value", "true");
        cy.wait(1000);
        cy.get(".modal-dialog .modal-body").should("be.visible").and("contain.text", "IT WORKS");
    });
});
