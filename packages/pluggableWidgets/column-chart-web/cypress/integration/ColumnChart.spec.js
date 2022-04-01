describe("column-chart-web", () => {
    const browserName = Cypress.browser.name;

    before(() => {
        cy.visit("/");
    });

    describe(
        "column color",
        {
            viewportHeight: 720,
            viewportWidth: 1280
        },
        () => {
            it(
                "renders column chart with default color and compares with a screenshot baseline",
                { retries: 3 },
                () => {
                    cy.wait(6000);
                    cy.get(".mx-name-containerDefaultColor", { timeout: 10000 }).scrollIntoView().should("be.visible");
                    cy.get(".mx-name-containerDefaultColor").compareSnapshot(
                        `columnChartDefaultColor-${browserName}`,
                        0.5
                    );
                }
            );

            it("renders column chart with custom color and compares with a screenshot baseline", () => {
                cy.get(".mx-name-containerCustomColor", { timeout: 10000 }).scrollIntoView().should("be.visible");
                cy.get(".mx-name-containerCustomColor").compareSnapshot(`columnChartCustomColor-${browserName}`, 0.5);
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
            it(
                "renders column chart with grouped format and compares with a screenshot baseline",
                { retries: 3 },
                () => {
                    cy.get(".mx-name-containerGroup", { timeout: 10000 }).scrollIntoView().should("be.visible");
                    cy.get(".mx-name-containerGroup").compareSnapshot(`columnChartGrouped-${browserName}`, 0.5);
                }
            );

            it("renders column chart with stacked format and compares with a screenshot baseline", () => {
                cy.get(".mx-name-containerStack", { timeout: 10000 }).scrollIntoView().should("be.visible");
                cy.get(".mx-name-containerStack").compareSnapshot(`columnChartStacked-${browserName}`, 0.5);
            });
        }
    );
});
