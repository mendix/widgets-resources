describe("Image viewer", () => {
    const staticUrl = "https://picsum.photos/200/300";
    const cleanMendixSession = () => {
        cy.window().then(window => {
            // Cypress opens a new session for every test, so it exceeds mendix license limit of 5 sessions, we need to logout after each test.
            window.mx.session.logout();
        });
    };

    afterEach(() => cleanMendixSession());

    it("renders when listens to data grid", () => {
        cy.visit("/p/listenToGrid");
        cy.get(".mx-name-index-0").click();
        cy.get(".mx-name-image1").find("img").should("have.attr", "src", staticUrl);
    });

    it("renders in a list view", () => {
        cy.visit("/p/listView");
        cy.get(".mx-name-image1").find("img").should("have.attr", "src", staticUrl);
    });

    it("renders in a template grid", () => {
        cy.visit("/p/templateGrid");
        cy.get(".mx-name-image1").find("img").should("have.attr", "src", staticUrl);
    });

    it("renders in a tab container", () => {
        cy.visit("/p/tabContainer");
        cy.get(".mx-name-tabPage2").click();
        cy.get(".mx-name-imageTabPage2").find("img").should("have.attr", "src", staticUrl);
    });
});
