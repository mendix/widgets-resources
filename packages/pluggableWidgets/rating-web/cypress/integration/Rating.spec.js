describe("Rating", () => {
    const browserName = Cypress.browser.name;

    beforeEach(() => {
        cy.visit("/");
    });

    it("compares with a screenshot baseline and checks if all rating elements are rendered as expected", () => {
        cy.get(".mx-name-rating1").should("be.visible");
        cy.get(".mx-name-ratingContent").compareSnapshot(`ratingPageContent-${browserName}`, 0.4);
    });
});
