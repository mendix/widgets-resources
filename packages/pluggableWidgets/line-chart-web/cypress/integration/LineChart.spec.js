describe("line-chart-web", () => {
    const browserName = Cypress.browser.name;

    before(() => {
        cy.visit("/");
    });

    describe("line style", () => {
        it("renders basic line chart and compares with a screenshot baseline", { retries: 3 }, () => {
            cy.wait(5000);
            cy.get(".mx-name-containerBasic", { timeout: 10000 }).should("be.visible");
            cy.get(".mx-name-containerBasic").compareSnapshot(`lineChartLineBasic-${browserName}`, 0.5);
        });

        it("renders line with markers and compares with a screenshot baseline", () => {
            cy.get(".mx-name-containerMarkers", { timeout: 10000 }).should("be.visible");
            cy.get(".mx-name-containerMarkers")
                .scrollIntoView()
                .compareSnapshot(`lineChartLineMarkers-${browserName}`, 0.1);
        });

        it("renders colored line with colored markers and compares with a screenshot baseline", () => {
            cy.get(".mx-name-containerColoredMarkerLine")
                .scrollIntoView()
                .compareSnapshot(`lineChartColoredLineMarkers-${browserName}`, 0.1);
        });
    });

    describe("interpolation", () => {
        it("renders linear and compares with a screenshot baseline", () => {
            cy.get(".mx-name-containerLinear").scrollIntoView().compareSnapshot(`lineChartLinear-${browserName}`, 0.1);
        });

        it("renders curved and compares with a screenshot baseline", () => {
            cy.get(".mx-name-containerCurved").scrollIntoView().compareSnapshot(`lineChartCurved-${browserName}`, 0.1);
        });
    });

    describe("grid lines", () => {
        it("renders horizontal grid lines and compares with a screenshot baseline", () => {
            cy.get(".mx-name-containerVertical")
                .scrollIntoView()
                .compareSnapshot(`lineChartGridLinesVertical-${browserName}`, 0.1);
        });

        it("renders vertical grid lines and compares with a screenshot baseline", () => {
            cy.get(".mx-name-containerHorizontal")
                .scrollIntoView()
                .compareSnapshot(`lineChartGridLinesHorizontal-${browserName}`, 0.1);
        });

        it("renders both grid lines and compares with a screenshot baseline", () => {
            cy.get(".mx-name-containerBoth")
                .scrollIntoView()
                .compareSnapshot(`lineChartGridLinesBoth-${browserName}`, 0.1);
        });
    });

    describe("legend", () => {
        it("renders with legend and compares with a screenshot baseline", () => {
            cy.get(".mx-name-containerLegend").scrollIntoView().compareSnapshot(`lineChartLegend-${browserName}`, 0.1);
        });

        it("renders without legend and compares with a screenshot baseline", () => {
            cy.get(".mx-name-containerNoLegend")
                .scrollIntoView()
                .compareSnapshot(`lineChartNoLegend-${browserName}`, 0.1);
        });
    });

    describe("axis label", () => {
        it("renders x axis label and compares with a screenshot baseline", () => {
            cy.get(".mx-name-containerXLabel").scrollIntoView().compareSnapshot(`lineChartXLabel-${browserName}`, 0.1);
        });

        it("renders y axis label legend and compares with a screenshot baseline", () => {
            cy.get(".mx-name-containerYLabel").scrollIntoView().compareSnapshot(`lineChartYLabel-${browserName}`, 0.1);
        });

        it("renders x+y axis label legend and compares with a screenshot baseline", () => {
            cy.get(".mx-name-containerXYLabels")
                .scrollIntoView()
                .compareSnapshot(`lineChartXYLabels-${browserName}`, 0.1);
        });
    });

    describe("dimensions", () => {
        it("renders with width: pixels (500px) height: pixels (300px) and compares with a screenshot baseline", () => {
            cy.get(".mx-name-containerDimensionPixels")
                .scrollIntoView()
                .compareSnapshot(`lineChartDimensionPixels-${browserName}`, 0.1);
        });

        it("renders with width: pixels (500px) height: percentage of width (50%) and compares with a screenshot baseline", () => {
            cy.get(".mx-name-containerPercentageOfWidth")
                .scrollIntoView()
                .compareSnapshot(`lineChartDimensionPercentageOfWidth-${browserName}`, 0.1);
        });

        it("renders with width: pixels (500px) height: percentage of parent (50%) and compares with a screenshot baseline", () => {
            cy.get(".mx-name-containerPixelsPercentageOfParent")
                .scrollIntoView()
                .compareSnapshot(`lineChartDimensionPixelsPercentageOfParent-${browserName}`, 0.1);
        });

        it("renders with width: percentage (80%) height: pixels (300px) and compares with a screenshot baseline", () => {
            cy.get(".mx-name-containerPercentagePixels")
                .scrollIntoView()
                .compareSnapshot(`lineChartDimensionPercentagePixels-${browserName}`, 0.1);
        });

        it("renders with width: percentage (100%) height: percentage of parent (50%) and compares with a screenshot baseline", () => {
            cy.get(".mx-name-containerPercentageOfParent")
                .scrollIntoView()
                .compareSnapshot(`lineChartDimensionPercentageOfParent-${browserName}`, 0.1);
        });

        it("renders with width: percentage (100%) height: percentage of width (75%) and compares with a screenshot baseline", () => {
            cy.get(".mx-name-containerDimensionPercentage")
                .scrollIntoView()
                .compareSnapshot(`lineChartDimensionPercentage-${browserName}`, 0.1);
        });
    });
});
