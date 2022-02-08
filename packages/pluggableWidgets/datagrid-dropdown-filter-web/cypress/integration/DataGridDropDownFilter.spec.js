describe("datagrid-dropdown-filter-web", () => {
    beforeEach(() => {
        cy.visit("/");
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
