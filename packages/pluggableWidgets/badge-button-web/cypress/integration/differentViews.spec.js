describe("BadgeButton different views", () => {
    const cleanMendixSession = () => {
        cy.window().then(window => {
            // Cypress opens a new session for every test, so it exceeds mendix license limit of 5 sessions, we need to logout after each test.
            window.mx.session.logout();
        });
    };

    describe("listen to grid", () => {
        beforeEach(() => {
            cy.visit("p/listenToGrid");
        });

        afterEach(() => cleanMendixSession());

        it("displays correctly when listening a data grid", () => {
            cy.get(".mx-name-badgeButtonListenToGrid").should("be.visible");
            cy.get(".mx-name-index-1").click();
            cy.get(".mx-name-badgeButtonListenToGrid")
                .find(".widget-badge-button-text")
                .should("contain.text", "Button");
        });
    });

    describe("listview", () => {
        beforeEach(() => {
            cy.visit("p/listView");
        });

        afterEach(() => cleanMendixSession());

        it("displays correctly in a list view", () => {
            cy.get(".mx-name-badgeButtonListView").should("be.visible");
            cy.get(".mx-name-badgeButtonListView")
                .first()
                .find(".widget-badge-button-text")
                .should("contain.text", "Button");
            cy.get(".mx-name-badgeButtonListView").first().find(".badge").should("contain.text", "New");
        });

        it("displays multiple widgets", () => {
            cy.get(".mx-name-badgeButtonListView").should("be.visible");
            cy.get(".mx-name-badgeButtonListView").should("have.length.above", 1);
        });
    });

    describe("template grid", () => {
        beforeEach(() => {
            cy.visit("p/templateGrid");
        });

        afterEach(() => cleanMendixSession());

        it("displays correctly in a template grid", () => {
            cy.get(".mx-name-badgeButtonTemplateGrid").should("be.visible");
            cy.get(".mx-name-badgeButtonTemplateGrid")
                .first()
                .find(".widget-badge-button-text")
                .should("contain.text", "Button");
            cy.get(".mx-name-badgeButtonTemplateGrid").first().find(".badge").should("contain.text", "New");
        });

        it("displays multiple widgets", () => {
            cy.get(".mx-name-badgeButtonTemplateGrid").should("be.visible");
            cy.get(".mx-name-badgeButtonTemplateGrid").should("have.length.above", 1);
            cy.get(".mx-templategrid-row").should("have.length", 2);
        });
    });

    describe("tab container", () => {
        beforeEach(() => {
            cy.visit("p/tabContainer");
        });

        afterEach(() => cleanMendixSession());

        it("displays correctly in default tab", () => {
            cy.get(".mx-name-badgeButtonTabContainer").should("be.visible");
            cy.get(".mx-name-badgeButtonTabContainer")
                .find(".widget-badge-button-text")
                .should("contain.text", "Button");
            cy.get(".mx-name-badgeButtonTabContainer").find(".badge").should("contain.text", "New");
        });

        it("displays correctly in second tab", () => {
            cy.get(".mx-name-tabPage2").click();
            cy.wait(1000);
            cy.get(".mx-name-badgeButtonTabContainer2").should("be.visible");
            cy.get(".mx-name-badgeButtonTabContainer2")
                .find(".widget-badge-button-text")
                .should("contain.text", "Button");
            cy.get(".mx-name-badgeButtonTabContainer2").find(".badge").should("contain.text", "New");
        });
    });
});
