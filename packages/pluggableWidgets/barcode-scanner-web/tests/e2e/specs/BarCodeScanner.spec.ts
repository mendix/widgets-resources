import page from "../../../../../../configs/e2e/src/pages/page";

describe("barcode-scanner-web", () => {
    beforeAll(() => {
        page.open(); // resets page
    });

    it("compares with a screenshot baseline and checks if the media stream is started", () => {
        browser.setWindowRect(0, 0, 1200, 900);
        const button = $(".mx-name-actionButton1");
        button.click();
        const screenshotElem = $(".mx-barcode-scanner");
        browser.saveElement(screenshotElem, "barCodeScannerContent");
        expect(browser.checkElement(screenshotElem, "barCodeScannerContent")).toBeLessThan(0.5);
    });
});
