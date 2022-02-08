describe("Signature", () => {
    it("renders canvas", () => {
        cy.visit("/");
        cy.get(".widget-signature-canvas").should("be.visible");
    });

    it("renders grid", () => {
        cy.visit("/p/GridSize");
        cy.get(".widget-signature-grid").get("svg").should("be.visible");
    });
});
