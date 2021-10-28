import page from "../../../../../../configs/e2e/src/pages/page";

describe("tooltip-web", () => {
    beforeAll(() => {
        page.open("p/arrow"); // resets page
    });

    describe("render method: text", () => {
        it("compares with a screenshot baseline and checks if tooltip arrow start is rendered as expected", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            $(".mx-name-actionButtonStart").moveTo();
            const screenshotElem = $(".mx-scrollcontainer-center");

            browser.saveElement(screenshotElem, "tooltipArrowStart");
            expect(browser.checkElement(screenshotElem, "tooltipArrowStart")).toEqual(0);
        });

        it("compares with a screenshot baseline and checks if tooltip arrow end is rendered as expected", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            $(".mx-name-actionButtonEnd").moveTo();
            const screenshotElem = $(".mx-scrollcontainer-center");

            browser.saveElement(screenshotElem, "tooltipArrowEnd");
            expect(browser.checkElement(screenshotElem, "tooltipArrowEnd")).toEqual(0);
        });

        it("compares with a screenshot baseline and checks if tooltip arrow center is rendered as expected", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            $(".mx-name-actionButtonCenter").moveTo();
            const screenshotElem = $(".mx-scrollcontainer-center");

            browser.saveElement(screenshotElem, "tooltipArrowCenter");
            expect(browser.checkElement(screenshotElem, "tooltipArrowCenter")).toEqual(0);
        });

        it("compares with a screenshot baseline and checks if tooltip position is rendered on top", () => {
            page.open("p/position");
            browser.setWindowRect(0, 0, 1200, 900);
            $(".mx-name-actionButtonTop").moveTo();
            const screenshotElem = $(".mx-scrollcontainer-center");

            browser.saveElement(screenshotElem, "tooltipPositionTop");
            expect(browser.checkElement(screenshotElem, "tooltipPositionTop")).toEqual(0);
        });

        it("compares with a screenshot baseline and checks if tooltip position is rendered on left", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            $(".mx-name-actionButtonLeft").moveTo();
            const screenshotElem = $(".mx-scrollcontainer-center");

            browser.saveElement(screenshotElem, "tooltipPositionLeft");
            expect(browser.checkElement(screenshotElem, "tooltipPositionLeft")).toEqual(0);
        });

        it("compares with a screenshot baseline and checks if tooltip position is rendered on right", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            $(".mx-name-actionButtonRight").moveTo();
            const screenshotElem = $(".mx-scrollcontainer-center");

            browser.saveElement(screenshotElem, "tooltipPositionRight");
            expect(browser.checkElement(screenshotElem, "tooltipPositionRight")).toEqual(0);
        });

        it("compares with a screenshot baseline and checks if tooltip position is rendered on bottom", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            $(".mx-name-actionButtonBottom").moveTo();
            const screenshotElem = $(".mx-scrollcontainer-center");

            browser.saveElement(screenshotElem, "tooltipPositionBottom");
            expect(browser.checkElement(screenshotElem, "tooltipPositionBottom")).toEqual(0);
        });
        it("compares with a screenshot baseline and checks if tooltip position is flipped when it doesn't have space on the left", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            $(".mx-name-actionButtonFlip").moveTo();
            const screenshotElem = $(".mx-scrollcontainer-center");

            browser.saveElement(screenshotElem, "tooltipPositionFlipped");
            expect(browser.checkElement(screenshotElem, "tooltipPositionFlipped")).toEqual(0);
        });
    });

    describe("render method: custom", () => {
        it("verifies tooltip shown custom content and compares with a screenshot baseline", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            $(".mx-name-navigationTree3-3").click();
            $(".mx-name-actionButtonCustom").moveTo();
            const screenshotElem = $(".mx-scrollcontainer-center");

            browser.saveElement(screenshotElem, "tooltipCustom");
            expect(browser.checkElement(screenshotElem, "tooltipCustom")).toEqual(0);
        });

        it("verifies if tooltip is opened on click", () => {
            page.open("p/click");
            $(".mx-name-actionButtonClick").click();
            const screenshotElem = $(".mx-scrollcontainer-center");

            browser.saveElement(screenshotElem, "tooltipClick");
            expect(browser.checkElement(screenshotElem, "tooltipClick")).toEqual(0);
        });
    });
});
