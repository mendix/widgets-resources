describe("datagrid-number-filter-web", () => {
    beforeEach(() => {
        cy.visit("/"); // resets page
    });

    describe("number filtering", () => {
        it("shows correct result", () => {
            cy.get(".mx-name-datagrid1").find(".filter-input").type("12", { force: true });

            cy.wait(1000);
            cy.get(".mx-name-datagrid1 .td").should("have.text", "12test3test3");
        });
    });
});
