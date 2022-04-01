describe("pie-doughnut-chart-web", () => {
    const browserName = Cypress.browser.name;

    before(() => {
        cy.visit("/");
    });

    describe(
        "pie color",
        {
            viewportHeight: 720,
            viewportWidth: 1280
        },
        () => {
            it("renders pie chart with custom color and compares with a screenshot baseline", { retries: 3 }, () => {
                cy.wait(6000);
                cy.get(".mx-name-containerSliceColor", { timeout: 10000 }).should("be.visible");
                cy.get(".mx-name-containerSliceColor")
                    .scrollIntoView()
                    .compareSnapshot(`pieChartDefaultColor-${browserName}`, 0.5);
            });
        }
    );

    describe(
        "column format",
        {
            viewportHeight: 720,
            viewportWidth: 1280
        },
        () => {
            it("renders pie chart with pie format and compares with a screenshot baseline", { retries: 3 }, () => {
                cy.get(".mx-name-containerPieFormat")
                    .scrollIntoView()
                    .compareSnapshot(`pieChartPieFormat-${browserName}`, 0.5);
            });

            it("renders pie chart with doughnut format and compares with a screenshot baseline", () => {
                cy.get(".mx-name-containerDoughnutFormat")
                    .scrollIntoView()
                    .compareSnapshot(`pieChartDoughnutFormat-${browserName}`, 0.5);
            });
        }
    );
});
