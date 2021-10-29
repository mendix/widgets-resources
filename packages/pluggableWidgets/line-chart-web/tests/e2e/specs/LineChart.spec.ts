import page from "../../../../../../configs/e2e/src/pages/page";

describe("line-chart-web", () => {
    beforeAll(() => {
        page.open();
    });

    describe("line style", () => {
        it("renders basic line chart and compares with a screenshot baseline", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const screenshotElem = $(".mx-name-containerBasic");
            screenshotElem.waitForDisplayed({ timeout: 10000 });

            browser.saveElement(screenshotElem, "lineChartLineBasic");
            expect(browser.checkElement(screenshotElem, "lineChartLineBasic")).toEqual(0);
        });

        it("renders line with markers and compares with a screenshot baseline", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const screenshotElem = $(".mx-name-containerMarkers");
            screenshotElem.waitForDisplayed({ timeout: 5000 });

            browser.saveElement(screenshotElem, "lineChartLineMarkers");
            expect(browser.checkElement(screenshotElem, "lineChartLineMarkers")).toEqual(0);
        });

        it("renders colored line with colored markers and compares with a screenshot baseline", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const screenshotElem = $(".mx-name-containerColoredMarkerLine");
            screenshotElem.waitForDisplayed({ timeout: 5000 });
            screenshotElem.scrollIntoView();

            browser.saveElement(screenshotElem, "lineChartColoredLineMarkers");
            expect(browser.checkElement(screenshotElem, "lineChartColoredLineMarkers")).toEqual(0);
        });
    });

    describe("interpolation", () => {
        it("renders linear and compares with a screenshot baseline", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const screenshotElem = $(".mx-name-containerLinear");
            screenshotElem.waitForDisplayed({ timeout: 5000 });
            screenshotElem.scrollIntoView();

            browser.saveElement(screenshotElem, "lineChartLinear");
            expect(browser.checkElement(screenshotElem, "lineChartLinear")).toEqual(0);
        });

        it("renders curved and compares with a screenshot baseline", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const screenshotElem = $(".mx-name-containerCurved");
            screenshotElem.waitForDisplayed({ timeout: 5000 });
            screenshotElem.scrollIntoView();

            browser.saveElement(screenshotElem, "lineChartCurved");
            expect(browser.checkElement(screenshotElem, "lineChartCurved")).toEqual(0);
        });
    });

    describe("grid lines", () => {
        it("renders horizontal grid lines and compares with a screenshot baseline", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const screenshotElem = $(".mx-name-containerVertical");
            screenshotElem.waitForDisplayed({ timeout: 5000 });
            screenshotElem.scrollIntoView();

            browser.saveElement(screenshotElem, "lineChartGridLinesVertical");
            expect(browser.checkElement(screenshotElem, "lineChartGridLinesVertical")).toEqual(0);
        });

        it("renders vertical grid lines and compares with a screenshot baseline", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const screenshotElem = $(".mx-name-containerHorizontal");
            screenshotElem.waitForDisplayed({ timeout: 5000 });
            screenshotElem.scrollIntoView();

            browser.saveElement(screenshotElem, "lineChartGridLinesHorizontal");
            expect(browser.checkElement(screenshotElem, "lineChartGridLinesHorizontal")).toEqual(0);
        });

        it("renders both grid lines and compares with a screenshot baseline", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const screenshotElem = $(".mx-name-containerBoth");
            screenshotElem.waitForDisplayed({ timeout: 5000 });
            screenshotElem.scrollIntoView();

            browser.saveElement(screenshotElem, "lineChartGridLinesBoth");
            expect(browser.checkElement(screenshotElem, "lineChartGridLinesBoth")).toEqual(0);
        });
    });

    describe("legend", () => {
        it("renders with legend and compares with a screenshot baseline", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const screenshotElem = $(".mx-name-containerLegend");
            screenshotElem.waitForDisplayed({ timeout: 5000 });
            screenshotElem.scrollIntoView();

            browser.saveElement(screenshotElem, "lineChartLegend");
            expect(browser.checkElement(screenshotElem, "lineChartLegend")).toEqual(0);
        });

        it("renders without legend and compares with a screenshot baseline", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const screenshotElem = $(".mx-name-containerNoLegend");
            screenshotElem.waitForDisplayed({ timeout: 5000 });
            screenshotElem.scrollIntoView();

            browser.saveElement(screenshotElem, "lineChartNoLegend");
            expect(browser.checkElement(screenshotElem, "lineChartNoLegend")).toEqual(0);
        });
    });

    describe("axis label", () => {
        it("renders x axis label and compares with a screenshot baseline", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const screenshotElem = $(".mx-name-containerXLabel");
            screenshotElem.waitForDisplayed({ timeout: 5000 });
            screenshotElem.scrollIntoView();

            browser.saveElement(screenshotElem, "lineChartXLabel");
            expect(browser.checkElement(screenshotElem, "lineChartXLabel")).toEqual(0);
        });

        it("renders y axis label legend and compares with a screenshot baseline", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const screenshotElem = $(".mx-name-containerYLabel");
            screenshotElem.waitForDisplayed({ timeout: 5000 });
            screenshotElem.scrollIntoView();

            browser.saveElement(screenshotElem, "lineChartYLabel");
            expect(browser.checkElement(screenshotElem, "lineChartYLabel")).toEqual(0);
        });

        it("renders x+y axis label legend and compares with a screenshot baseline", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const screenshotElem = $(".mx-name-containerXYLabels");
            screenshotElem.waitForDisplayed({ timeout: 5000 });
            screenshotElem.scrollIntoView();

            browser.saveElement(screenshotElem, "lineChartXYLabels");
            expect(browser.checkElement(screenshotElem, "lineChartXYLabels")).toEqual(0);
        });
    });

    describe("dimensions", () => {
        it("renders with width: percentage (100%) height: percentage of width (75%) and compares with a screenshot baseline", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const screenshotElem = $(".mx-name-containerDimensionPercentage");
            screenshotElem.waitForDisplayed({ timeout: 5000 });
            screenshotElem.scrollIntoView();

            browser.saveElement(screenshotElem, "lineChartDimensionPercentage");
            expect(browser.checkElement(screenshotElem, "lineChartDimensionPercentage")).toEqual(0);
        });

        it("renders with width: pixels (500px) height: pixels (300px) and compares with a screenshot baseline", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const screenshotElem = $(".mx-name-containerDimensionPixels");
            screenshotElem.waitForDisplayed({ timeout: 5000 });
            screenshotElem.scrollIntoView();

            browser.saveElement(screenshotElem, "lineChartDimensionPixels");
            expect(browser.checkElement(screenshotElem, "lineChartDimensionPixels")).toEqual(0);
        });

        it("renders with width: percentage (100%) height: percentage of parent (50%) and compares with a screenshot baseline", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const screenshotElem = $(".mx-name-containerPercentageOfParent");
            screenshotElem.waitForDisplayed({ timeout: 5000 });
            screenshotElem.scrollIntoView();

            browser.saveElement(screenshotElem, "lineChartDimensionPercentageOfParent");
            expect(browser.checkElement(screenshotElem, "lineChartDimensionPercentageOfParent")).toEqual(0);
        });
    });
});
