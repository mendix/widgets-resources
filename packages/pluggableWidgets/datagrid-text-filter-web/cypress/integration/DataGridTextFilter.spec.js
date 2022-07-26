describe("datagrid-text-filter-web", () => {
    const browserName = Cypress.browser.name;

    beforeEach(() => {
        cy.visit("/"); // resets page
    });

    describe("visual testing:", () => {
        it("compares with a screenshot baseline and checks if all datagrid and filter elements are rendered as expected", () => {
            cy.wait(3000);
            cy.get(".mx-name-datagrid1").should("be.visible");
            cy.get(".mx-name-datagrid1").compareSnapshot(`dataGridTextFilter-${browserName}`, 0.1);
        });
    });

    describe("text filtering", () => {
        it("shows correct result", () => {
            cy.get(".mx-name-datagrid1").find(".filter-input").type("test3", { force: true });
            cy.wait(1000);
            cy.get(".mx-name-datagrid1 .td").should("have.text", "12test3test3");
        });

        it("check the context", () => {
            cy.get(".mx-name-datagrid1").find(".filter-input").type("test3", { force: true });
            cy.wait(1000);
            cy.get(".mx-name-datagrid1 .td").first().should("have.text", "12");
            cy.get(".mx-name-datagrid1 .td").first().click();
            cy.wait(1000);
            cy.get(".mx-name-AgeTextBox input").should("have.value", "12");
        });
    });
});
