describe("badge-web", () => {
    const browserName = Cypress.browser.name;

    beforeEach(() => {
        cy.visit("/");
    });

    describe("type: badge", () => {
        it("compares with a screenshot baseline and checks if all badges elements are rendered as expected", () => {
            cy.wait(2000);
            cy.get(".mx-name-table1").compareSnapshot(`badgePageContent-${browserName}`, 0.1);
        });
        it("changes caption when attribute value is changed", () => {
            const newAttributeValue = "Test";
            const badge = ".mx-name-badgeDanger";

            cy.get(badge).should("not.contain.text", newAttributeValue);
            cy.get(".mx-name-dataInput").find("input").type(newAttributeValue).type("{enter}");
            cy.get(badge).should("contain.text", newAttributeValue);
        });
    });
    describe("type: label", () => {
        it("changes caption when attribute value is changed", () => {
            const newAttributeValue = "Test";
            const badge = ".mx-name-labelDanger";

            cy.get(badge).should("not.contain.text", newAttributeValue);
            cy.get(".mx-name-dataInput").find("input").type(newAttributeValue).type("{enter}");
            cy.get(badge).should("contain.text", newAttributeValue);
        });
    });
});
