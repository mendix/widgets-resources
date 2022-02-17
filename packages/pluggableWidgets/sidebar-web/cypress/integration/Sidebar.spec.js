describe("sidebar-web", () => {
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

    describe("toggle mode: none", () => {
        it("compares with a screenshot baseline and checks if it's rendered as expected", () => {
            cy.get(".mx-page").should("be.visible");
            cy.get(".mx-name-navigationTree3-1 > span").click();
            cy.compareSnapshot(`sidebarNone-${browserName}`, 0.1);
        });
    });

    describe("toggle mode: push aside", () => {
        it("compares with a screenshot baseline and checks if it's rendered as expected", () => {
            cy.get(".mx-page").should("be.visible");
            cy.get(".mx-name-navigationTree3-2 > span").click();
            cy.compareSnapshot(`sidebarPushAside-${browserName}`, 0.1);
        });
    });

    describe("toggle mode: shrink collapsed", () => {
        it("compares with a screenshot baseline and checks if it's rendered as expected", () => {
            cy.get(".mx-page").should("be.visible");
            cy.get(".mx-name-navigationTree3-3 > span").click();
            cy.compareSnapshot(`sidebarShrinkCollapsed-${browserName}`, 0.1);
        });
    });

    describe("toggle mode: shrink expanded", () => {
        it("compares with a screenshot baseline and checks if it's rendered as expected", () => {
            cy.get(".mx-page").should("be.visible");
            cy.get(".mx-name-navigationTree3-4 > span").click();
            cy.compareSnapshot(`sidebarShrinkExpanded-${browserName}`, 0.1);
        });
    });

    describe("toggle mode: slider over", () => {
        it("compares with a screenshot baseline and checks if it's rendered as expected", () => {
            cy.get(".mx-page").should("be.visible");
            cy.get(".mx-name-navigationTree3-5 > span").click();
            cy.compareSnapshot(`sidebarSlideOver-${browserName}`, 0.1);
        });
    });
    describe("multiple sidebars", () => {
        it("compares with a screenshot baseline and checks if it's rendered as expected", () => {
            cy.get(".mx-page").should("be.visible");
            cy.get(".mx-name-navigationTree3-6 > span").click();
            cy.get(".mx-name-sidebarToggle1").click();
            cy.compareSnapshot(`sidebarMultiple-${browserName}`, 0.1);
        });
    });
    describe("targeted sidebar", () => {
        it("compares with a screenshot baseline and checks if it's rendered as expected", () => {
            cy.get(".mx-page").should("be.visible");
            cy.get(".mx-name-navigationTree3-7 > span").click();
            cy.get(".mx-name-actionButton1").click({force: true});
            cy.compareSnapshot(`sidebarTargeted-${browserName}`, 0.1);
        });
    });
});
