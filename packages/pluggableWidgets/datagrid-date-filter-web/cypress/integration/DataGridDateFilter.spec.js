describe("datagrid-date-filter-web", () => {
    const browserName = Cypress.browser.name;

    beforeEach(() => {
        cy.visit("/");
    });

    describe("visual testing:", () => {
        it("compares with a screenshot baseline and checks if all datagrid and filter elements are rendered as expected", () => {
            cy.wait(3000);
            cy.get(".mx-name-datagrid1").should("be.visible");
            cy.get(".mx-name-datagrid1").compareSnapshot(`dataGridDateFilter-${browserName}`, 0.1);
        });
    });

    it("compares with a screenshot baseline and checks if date picker element is rendered as expected", () => {
        cy.get(".mx-name-datagrid1").find(".btn-calendar").first().click();
        cy.wait(1000);
        cy.get(".mx-name-datagrid1").compareSnapshot(`dataGridDateFilterDatePicker-${browserName}`, 1);
    });

    it("filters a typed date", () => {
        cy.get(".mx-name-datagrid1").find(".filter-input").type("10/5/2020", { force: true });
        cy.get(".mx-name-datagrid1 .td").should("contain.text", "10/5/2020");
    });

    it("filters between dates", () => {
        cy.get(".filter-selector").click();
        cy.get(".filter-selectors").find("li").first().click();
        cy.get(".mx-name-datagrid1").find(".btn-calendar").click();
        cy.get(".react-datepicker__month-select").select("October");
        cy.get(".react-datepicker__year-select").select("2020");
        cy.get(".react-datepicker__day--004").click();
        cy.get(".react-datepicker__day--005").click();
        cy.get(".mx-name-layoutGrid1").first().click();
        cy.get(".mx-name-datagrid1 .td").should("contain.text", "10/5/2020");
    });
});
