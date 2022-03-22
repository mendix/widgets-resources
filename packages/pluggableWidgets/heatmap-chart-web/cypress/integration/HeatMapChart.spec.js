describe("heatmap-chart-web", () => {
    const browserName = Cypress.browser.name;

    before(() => {
        cy.visit("/");
    });

    describe("heatmap color", () => {
        it("renders heatmap chart with custom color and compares with a screenshot baseline", { retries: 3 }, () => {
            cy.get(".mx-name-containerCustomltColor", { timeout: 10000 }).should("be.visible");
            cy.get(".mx-name-containerCustomltColor")
                .scrollIntoView()
                .compareSnapshot(`heatmapChartCustomColor-${browserName}`, 0.5);
        });
    });

    describe("heatmap sort order", () => {
        it("renders heatmap chart with ascending order and compares with a screenshot baseline", { retries: 3 }, () => {
            cy.get(".mx-name-containerAscending", { timeout: 10000 }).should("be.visible");
            cy.get(".mx-name-containerAscending")
                .scrollIntoView()
                .compareSnapshot(`heatmapChartAscending-${browserName}`, 0.5);
        });

        it("renders heatmap chart with descending order and compares with a screenshot baseline", () => {
            cy.get(".mx-name-containerDescending")
                .scrollIntoView()
                .compareSnapshot(`heatmapChartDescending-${browserName}`, 0.1);
        });
    });
});
