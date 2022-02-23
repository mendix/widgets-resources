describe("Progress Bar", () => {
    const cleanMendixSession = () => {
        cy.window().then(window => {
            // Cypress opens a new session for every test, so it exceeds mendix license limit of 5 sessions, we need to logout after each test.
            window.mx.session.logout();
        });
    };

    afterEach(() => cleanMendixSession());
    it("should render attribute text", () => {
        cy.visit("p/displayAttributeText");

        cy.get(".mx-name-displayText .form-control").then(element => {
            const value = element.val();
            cy.get(".mx-name-maximumValueAttribute").should("have.text", value);
            cy.get(".mx-name-progressBarStatic").should("have.text", value);
            cy.get(".mx-name-progressAttribute").should("have.text", value);
        });
    });

    it("should render no text", () => {
        cy.visit("p/displayNone");

        cy.get(".mx-name-progressBar1").should("have.text", "");
        cy.get(".mx-name-progressBar2").should("have.text", "");
        cy.get(".mx-name-progressBar3").should("have.text", "");
    });

    it("should display static value", () => {
        cy.visit("p/displayStaticText");

        cy.get(".mx-name-progressBar1").should("have.text", "Static text 1");
        cy.get(".mx-name-progressBar2").should("have.text", "Static text 2");
        cy.get(".mx-name-progressBar3").should("have.text", "Static text 3");
    });

    it("should display percentage", () => {
        cy.visit("p/displayPercentage");

        cy.get(".mx-name-progressBar1").should("have.text", "45%");
        cy.get(".mx-name-progressBar2").should("have.text", "67%");
        cy.get(".mx-name-progressBar3").should("have.text", "0%");
    });

    it("should display value", () => {
        cy.visit("p/displayValue");

        cy.get(".mx-name-progressBar1").should("have.text", "45");
        cy.get(".mx-name-progressBar2").should("have.text", "67");
        cy.get(".mx-name-progressBar3").should("have.text", "0");
    });
});
