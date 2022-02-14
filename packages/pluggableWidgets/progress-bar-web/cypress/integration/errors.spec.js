describe("Progress Bar", () => {
    it("should render progress bar when there's no context", () => {
        cy.visit("p/noContext");
        cy.get(".widget-progress-bar.mx-name-noContext .progress-bar").should("have.text", "0%");
    });
});
