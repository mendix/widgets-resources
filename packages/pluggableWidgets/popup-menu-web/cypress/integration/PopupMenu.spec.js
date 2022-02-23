describe("Popup-menu-web", () => {
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

    describe("using basic option", () => {
        it("compares with a screenshot baseline and checks if popupmenu is rendered in the top left position", () => {
            cy.get(".mx-name-actionButton10").click();
            cy.wait(1000);
            cy.get(".mx-name-container15").compareSnapshot(`popUpMenuTopLeft-${browserName}`, 0.1);
        });
        it("compares with a screenshot baseline and checks if popupmenu is rendered in the left position", () => {
            cy.get(".mx-name-actionButton12").click();
            cy.wait(1000);
            cy.get(".mx-name-container15").compareSnapshot(`popUpMenuLeft-${browserName}`, 0.1);
        });

        it("compares with a screenshot baseline and checks if popupmenu is rendered in the top position", () => {
            cy.get(".mx-name-actionButton15").click();
            cy.wait(1000);
            cy.get(".mx-name-container15").compareSnapshot(`popUpMenuTop-${browserName}`, 0.1);
        });
        it("compares with a screenshot baseline and checks if popupmenu is rendered in the top right position", () => {
            cy.get(".mx-name-actionButton13").click();
            cy.wait(1000);
            cy.get(".mx-name-container15").compareSnapshot(`popUpMenuTopRight-${browserName}`, 0.1);
        });
        it("compares with a screenshot baseline and checks if popupmenu is rendered in the right position", () => {
            cy.get(".mx-name-actionButton14").click();
            cy.wait(1000);
            cy.get(".mx-name-container15").compareSnapshot(`popUpMenuRight-${browserName}`, 0.1);
        });
        it("compares with a screenshot baseline and checks if popupmenu is rendered in the bottom right position", () => {
            cy.get(".mx-name-actionButton20").click();
            cy.wait(1000);
            cy.get(".mx-name-container15").compareSnapshot(`popUpMenuBottomRight-${browserName}`, 0.1);
        });
        it("compares with a screenshot baseline and checks if popupmenu is rendered in the bottom left position", () => {
            cy.get(".mx-name-actionButton18").click();
            cy.wait(1000);
            cy.get(".mx-name-container15").compareSnapshot(`popUpMenuBottomLeft-${browserName}`, 0.1);
        });
        it("compares with a screenshot baseline and checks if popupmenu is rendered in the bottom position", () => {
            cy.get(".mx-name-actionButton19").click();
            cy.wait(1000);
            cy.get(".mx-name-container15").compareSnapshot(`popUpMenuBottom-${browserName}`, 0.1);
        });
        it("shows a new menu list when on hover is triggered", () => {
            cy.get(".mx-name-actionButton1").click();
            cy.wait(1000);
            cy.get(".mx-name-actionButton25").should("be.visible");
            cy.get(".mx-name-actionButton25").trigger("mouseover");
            cy.get(".mx-name-text42").trigger("mouseover");
            cy.get(".mx-name-text42").should("contain.text", "Gooooooo");
        });
        it("shows a message when one item is clicked", () => {
            cy.get(".mx-name-pop_upMenu18").should("be.visible");
            cy.get(".mx-name-actionButton10").click();
            cy.get(".mx-name-pop_upMenu18 .popupmenu-basic-item").first().click();
            cy.get(".modal-dialog").should("be.visible").should("contain.text", "hello");
        });
    });
    describe("using custom option", () => {
        it("compares with a screenshot baseline and checks if custom popupmenu is rendered in the top left position", () => {
            cy.get(".mx-name-actionButton11").click();
            cy.wait(1000);
            cy.get(".mx-name-container15").compareSnapshot(`customPopUpMenuTopLeft-${browserName}`, 0.1);
        });
        it("compares with a screenshot baseline and checks if custom popupmenu is rendered in the left position", () => {
            cy.get(".mx-name-actionButton17").click();
            cy.wait(1000);
            cy.get(".mx-name-container15").compareSnapshot(`CustomPopUpMenuLeft-${browserName}`, 0.1);
        });

        it("compares with a screenshot baseline and checks if custom popupmenu is rendered in the top position", () => {
            cy.get(".mx-name-actionButton24").click();
            cy.wait(1000);
            cy.get(".mx-name-container15").compareSnapshot(`customPopUpMenuTop-${browserName}`, 0.1);
        });
        it("compares with a screenshot baseline and checks if custom popupmenu is rendered in the top right position", () => {
            cy.get(".mx-name-actionButton23").click();
            cy.wait(1000);
            cy.get(".mx-name-container15").compareSnapshot(`customPopUpMenuTopRight-${browserName}`, 0.1);
        });
        it("compares with a screenshot baseline and checks if custom popupmenu is rendered in the right position", () => {
            cy.get(".mx-name-actionButton26").click();
            cy.wait(1000);
            cy.get(".mx-name-container15").compareSnapshot(`customPopUpMenuRight-${browserName}`, 0.1);
        });
        it("compares with a screenshot baseline and checks if custom popupmenu is rendered in the bottom position", () => {
            cy.get(".mx-name-actionButton29").click();
            cy.wait(1000);
            cy.get(".mx-name-container15").compareSnapshot(`customPopUpMenuBottom-${browserName}`, 0.1);
        });
        it("shows a message when one item is clicked", () => {
            cy.get(".mx-name-pop_upMenu13").should("be.visible");
            cy.get(".mx-name-actionButton11").click();
            cy.get(".mx-name-pop_upMenu13 .mx-name-text35").first().click();
            cy.get(".modal-dialog").should("be.visible").should("contain.text", "hello");
        });
    });
});
