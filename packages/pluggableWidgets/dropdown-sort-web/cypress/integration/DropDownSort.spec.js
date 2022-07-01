describe("dropdown-sort-web", () => {
    beforeEach(() => {
        cy.visit("/");
    });
    it("shows the descending order", () => {
        cy.get(".mx-name-drop_downSort1").click();
        cy.get(".dropdown-list > li:nth-child(2)").click();
        cy.get(".mx-name-drop_downSort1").find(".btn").first().click();
        cy.wait(1000);
        cy.get(".mx-name-gallery1").find(".widget-gallery-item").first().should("have.text", "test3");
    });

    it("shows the ascending order", () => {
        cy.get(".mx-name-drop_downSort1").click();
        cy.get(".dropdown-list > li:nth-child(2)").click();
        cy.get(".mx-name-drop_downSort1").find(".btn").first().click();
        cy.get(".mx-name-drop_downSort1").find(".btn").first().click();
        cy.wait(1000);
        cy.get(".mx-name-gallery1").find(".widget-gallery-item").first().should("have.text", "test");
    });
});
