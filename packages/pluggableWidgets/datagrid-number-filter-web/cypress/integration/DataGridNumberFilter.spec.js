describe("datagrid-number-filter-web", () => {
    const browserName = Cypress.browser.name;

    beforeEach(() => {
        cy.visit("/"); // resets page
    });

    describe("visual testing:", () => {
        it("compares with a screenshot baseline and checks if all datagrid and filter elements are rendered as expected", () => {
            cy.wait(3000);
            cy.get(".mx-name-datagrid1").should("be.visible");
            cy.get(".mx-name-datagrid1").compareSnapshot(`dataGridNumberFilter-${browserName}`, 0.1);
        });
    });

    describe("number filtering", () => {
        it("shows correct result", () => {
            cy.get(".mx-name-datagrid1").find(".filter-input").type("12", { force: true });

            cy.wait(1000);
            cy.get(".mx-name-datagrid1 .td").should("have.text", "12test3test3");
        });
    });
});
