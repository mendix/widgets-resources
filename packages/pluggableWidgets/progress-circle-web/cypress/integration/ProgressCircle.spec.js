describe("Progress Circle", () => {
    it("renders with a value", () => {
        cy.visit("p/Home");
        cy.get(".mx-name-progressCircleNegative").should("be.visible");
        cy.get(".mx-name-progressCircleNegative .progressbar-text").should("have.text", "20%");
    });

    it("updates the progress percentage when the value is changed", () => {
        cy.visit("p/Playground");
        cy.get(".mx-name-progressCirclePercentage").should("be.visible");
        cy.get(".mx-name-textBoxProgress input").type("67", { force: true });
        cy.get(".mx-name-textBoxMaximumValue").click();
        cy.get(".mx-name-progressCirclePercentage .progressbar-text").should("have.text", "67%");
        cy.get(".mx-name-progressCircleValue .progressbar-text").should("have.text", "67");
        cy.get(".mx-name-progressCircleNoValue .progressbar-text").should("have.text", "");
        cy.get(".mx-name-progressCircleAttribute .progressbar-text").should("have.text", "Working with an attribute");
        cy.get(".mx-name-progressCircleStaticText .progressbar-text").should("have.text", "Static text");
        cy.get(".mx-name-progressCircleStaticTextAttributeDefined .progressbar-text").should(
            "have.text",
            "Static text"
        );
    });
});
