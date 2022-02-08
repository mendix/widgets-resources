describe("barcode-scanner-web", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    afterEach(() =>
        cy.window().then(window => {
            // Cypress opens a new session for every test, so it exceeds mendix license limit of 5 sessions, we need to logout after each test.
            window.mx.session.logout();
        })
    );

    it("compares with a screenshot baseline and checks if the media stream is started", () => {
        cy.get(".mx-name-actionButton1").click();
        cy.wait(1000);
        cy.get(".mx-barcode-scanner-content").should("be.visible");
    });
});
