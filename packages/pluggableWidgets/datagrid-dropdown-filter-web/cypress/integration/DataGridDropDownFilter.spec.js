describe("datagrid-dropdown-filter-web", () => {
    const browserName = Cypress.browser.name;

    beforeEach(() => {
        cy.visit("/");
    });

    describe("visual testing:", () => {
        it("compares with a screenshot baseline and checks if all datagrid and filter elements are rendered as expected", () => {
            cy.wait(3000);
            cy.get(".mx-name-datagrid1").should("be.visible");
            cy.get(".mx-name-datagrid1").compareSnapshot(`dataGridDropDownFilter-${browserName}`, 0.1);
        });
    });

    describe("using enumeration as attribute", () => {
        it("shows the expected result", () => {
            cy.get(".mx-name-datagrid1").find(".dropdown-container").first().click();
            cy.get(".dropdown-list > li:nth-child(1)").click();
            cy.wait(1000);
            cy.get(".mx-name-datagrid1 .td").should("have.text", "10testtestYes");
        });

        it("shows the expected result with multiple selected items", () => {
            cy.get(".mx-name-datagrid1").find(".dropdown-container").first().click();
            cy.get(".dropdown-list > li:nth-child(1)").click();
            cy.get(".dropdown-list > li:nth-child(2)").click();
            cy.wait(1000);
            cy.get(".mx-name-datagrid1 .td").should("have.text", "10testtestYes20test2test2Yes");
        });
    });

    describe("using boolean as attribute", () => {
        it("shows the expected result", () => {
            cy.get(".mx-name-datagrid1").find(".dropdown-container").last().click();
            cy.get(".dropdown-list > li:nth-child(3)").should("have.text", "No");
            cy.get(".dropdown-list > li:nth-child(3)").click();
            cy.wait(1000);
            cy.get(".mx-name-datagrid1 .td").should("have.length", 0);
        });
    });
});
