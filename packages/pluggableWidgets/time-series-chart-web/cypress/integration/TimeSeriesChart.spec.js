describe(
    "time-series-chart-web",
    {
        viewportHeight: 720,
        viewportWidth: 1280
    },
    () => {
        const browserName = Cypress.browser.name;

        before(() => {
            cy.visit("/");
        });

        it(
            "renders time series chart with multiple series and compares with a screenshot baseline",
            { retries: 3 },
            () => {
                cy.get(".mx-name-containerMultipleSeries", { timeout: 10000 }).should("be.visible");
                cy.get(".mx-name-containerMultipleSeries")
                    .scrollIntoView()
                    .compareSnapshot(`timeSeriesChartMultipleSeries-${browserName}`, 0.5);
            }
        );

        it(
            "renders time series chart without range slider and compares with a screenshot baseline",
            { retries: 3 },
            () => {
                cy.get(".mx-name-containerWithoutRangeSlider", { timeout: 10000 }).should("be.visible");
                cy.get(".mx-name-containerWithoutRangeSlider")
                    .scrollIntoView()
                    .compareSnapshot(`timeSeriesChartWithoutRangeSlider-${browserName}`, 0.5);
            }
        );

        describe(
            "fill area",
            {
                viewportHeight: 720,
                viewportWidth: 1280
            },
            () => {
                it(
                    "renders time series chart without fill area and compares with a screenshot baseline",
                    { retries: 3 },
                    () => {
                        cy.get(".mx-name-containerWithoutFillArea")
                            .scrollIntoView()
                            .compareSnapshot(`timeSeriesChartWithoutFillArea-${browserName}`, 0.5);
                    }
                );

                it("renders time series chart with custom fill area color and compares with a screenshot baseline", () => {
                    cy.get(".mx-name-containerCustomFillAreaColor")
                        .scrollIntoView()
                        .compareSnapshot(`timeSeriesChartCustomFillAreaColor-${browserName}`, 0.5);
                });
            }
        );

        describe(
            "y axis range",
            {
                viewportHeight: 720,
                viewportWidth: 1280
            },
            () => {
                it(
                    "renders time series chart with non negative values and compares with a screenshot baseline",
                    { retries: 3 },
                    () => {
                        cy.get(".mx-name-containerYRangeNonNegative", { timeout: 10000 }).should("be.visible");
                        cy.get(".mx-name-containerYRangeNonNegative")
                            .scrollIntoView()
                            .compareSnapshot(`timeSeriesChartYRangeNonNegative-${browserName}`, 0.5);
                    }
                );

                it("renders column chart with auto values and compares with a screenshot baseline", () => {
                    cy.get(".mx-name-containerYRangeAuto")
                        .scrollIntoView()
                        .compareSnapshot(`timeSeriesChartYRangeAuto-${browserName}`, 0.5);
                });
            }
        );
    }
);
