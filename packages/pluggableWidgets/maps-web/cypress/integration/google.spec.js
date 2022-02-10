describe("Google Maps", () => {
    const browserName = Cypress.browser.name;
    const cleanMendixSession = () => {
        cy.window().then(window => {
            // Cypress opens a new session for every test, so it exceeds mendix license limit of 5 sessions, we need to logout after each test.
            window.mx.session.logout();
        });
    };

    afterEach(() => cleanMendixSession());

    describe("rendering", () => {
        beforeEach(() => {
            cy.visit("p/google-static");
        });

        it("compares with a screenshot baseline and checks if basemap is correct", () => {
            cy.get(".widget-maps").should("be.visible");
            cy.get(".widget-maps").wait(3000).compareSnapshot(`googleMaps-${browserName}`, 0.5);
        });
    });

    describe("mixed rendering", () => {
        beforeEach(() => {
            cy.visit("p/google");
        });

        it("checks the rendering", () => {
            cy.get(".widget-google-maps").should("be.visible");
        });

        it("check the number of locations", () => {
            cy.get(".widget-google-maps").should("be.visible");
            cy.wait(1000);
            cy.get("img[src*='gstatic.com/mapfiles'][src*='poi']").should("have.length", 3);
        });
    });

    describe("static locations", () => {
        beforeEach(() => {
            cy.visit("p/google-static");
        });

        it("checks the rendering", () => {
            cy.get(".widget-google-maps").should("be.visible");
        });

        it("check the number of locations", () => {
            cy.get(".widget-google-maps").should("be.visible");
            cy.wait(1000);
            cy.get("img[src*='gstatic.com/mapfiles'][src*='poi']").should("have.length", 1);
        });
    });

    describe("datasource locations", () => {
        beforeEach(() => {
            cy.visit("p/google-datasource");
        });

        it("checks the rendering", () => {
            cy.get(".widget-google-maps").should("be.visible");
        });

        it("check the number of locations", () => {
            cy.get(".widget-google-maps").should("be.visible");
            cy.wait(1000);
            cy.get("img[src*='gstatic.com/mapfiles'][src*='poi']").should("have.length", 2);
        });
    });
});
