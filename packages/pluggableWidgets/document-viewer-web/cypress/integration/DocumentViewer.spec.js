describe("document-viewer-web", () => {
    const browserName = Cypress.browser.name;

    beforeEach(() => {
        cy.visit("/"); // resets page
    });

    it("compares with a screenshot baseline and checks if displays a PDF file from URL", () => {
        cy.wait(5000);
        cy.get(".mx-name-documentViewer1").should("be.visible");
        cy.get(".mx-name-documentViewer1").compareSnapshot(`documentViewerPDFUrl-${browserName}`, 0.1);
    });
});
