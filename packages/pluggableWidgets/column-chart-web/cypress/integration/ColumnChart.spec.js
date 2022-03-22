describe("column-chart-web", () => {
    const browserName = Cypress.browser.name;

    before(() => {
        cy.visit("/");
    });

    describe("column color", () => {
        it("renders column chart with default color and compares with a screenshot baseline", { retries: 3 }, () => {
            cy.get(".mx-name-containerDefaultColor", { timeout: 10000 }).should("be.visible");
            cy.get(".mx-name-containerDefaultColor")
                .scrollIntoView()
                .compareSnapshot(`columnChartDefaultColor-${browserName}`, 0.5);
        });

        it("renders column chart with custom color and compares with a screenshot baseline", () => {
            cy.get(".mx-name-containerCustomColor")
                .scrollIntoView()
                .compareSnapshot(`columnChartCustomColor-${browserName}`, 0.1);
        });
    });

    describe("column format", () => {
        it("renders column chart with grouped format and compares with a screenshot baseline", { retries: 3 }, () => {
            cy.get(".mx-name-containerGroup", { timeout: 10000 }).should("be.visible");
            cy.get(".mx-name-containerGroup")
                .scrollIntoView()
                .compareSnapshot(`columnChartGrouped-${browserName}`, 0.5);
        });

        it("renders column chart with stacked format and compares with a screenshot baseline", () => {
            cy.get(".mx-name-containerStack")
                .scrollIntoView()
                .compareSnapshot(`columnChartStacked-${browserName}`, 0.1);
        });
    });
});
