import page from "../../../../../../configs/e2e/src/pages/page";
import badgeButtonWidget from "../objects/badgeButton.widget";
describe("BadgeButton on click", () => {
    describe("call microflow", () => {
        beforeAll(() => {
            page.open("p/callMicroflow");
        });

        it("should display a dialog", () => {
            const badgeButton = new badgeButtonWidget("badgeButtonCallMicroflow");

            badgeButton.element.waitForDisplayed();
            badgeButton.element.click();

            const dialog = page.waitForElement(".mx-dialog-body");
            expect(dialog.getText()).toEqual("Microflow Successfully Called With badge New");
        });
    });

    describe("call nanoflow", () => {
        beforeAll(() => {
            page.open("p/callNanoflow");
        });

        it("should display a dialog", () => {
            const badgeButton = new badgeButtonWidget("badgeButtonCallNanoflow");

            badgeButton.element.waitForDisplayed();
            badgeButton.element.click();

            browser.waitUntil(() => page.getWidget("text1").getText() === "Nanoflow called", { timeout: 3000 });
        });
    });

    describe("open page", () => {
        beforeEach(() => {
            page.open("p/openPage");
        });

        it("should open a page", () => {
            const badgeButton = new badgeButtonWidget("badgeButtonShowFullPage");

            badgeButton.element.waitForDisplayed();
            badgeButton.element.click();

            const header = page.header();
            expect(header).toBe("ClickedPage");

            // Verify it passes a parameter
            const data = page.waitForElement(".form-control-static").getText();
            expect(data).toBe("New");
        });

        it("should open a popup page", () => {
            const badgeButton = new badgeButtonWidget("badgeButtonShowPopupPage");

            badgeButton.element.waitForDisplayed();
            badgeButton.element.click();

            const header = page.header();
            expect(header).toBe("ClickedPagePopup");

            // Verify it passes a parameter
            const data = page.waitForElement(".form-control-static").getText();
            expect(data).toBe("New");
        });

        it("should open modal popup page", () => {
            const badgeButton = new badgeButtonWidget("badgeButtonShowBlockedPopupPage");

            badgeButton.element.waitForDisplayed();
            badgeButton.element.click();

            const header = page.header();
            expect(header).toBe("ModalPopupPage");

            // Verify it passes a parameter
            const data = page.waitForElement(".form-control-static").getText();
            expect(data).toBe("New");
        });
    });

    describe("close page", () => {
        beforeEach(() => {
            page.open("p/closePage");
        });

        it("should close a page", () => {
            page.getWidget("openClosePage").click();
            const badgeButton = new badgeButtonWidget("badgeButtonClosePage");

            badgeButton.element.waitForDisplayed();
            badgeButton.element.click();

            browser.waitUntil(() => page.header() === "OnClickClosePage", { timeout: 3000 });
        });

        it("should close a popup page", () => {
            page.getWidget("openClosePopup").click();
            const badgeButton = new badgeButtonWidget("badgeButtonClosePopup");

            badgeButton.element.waitForDisplayed();
            badgeButton.element.click();

            browser.waitUntil(() => page.header() === "OnClickClosePage", { timeout: 3000 });
        });
    });

    describe("microflow error", () => {
        beforeEach(() => {
            page.open("p/onClickMFError");
        });

        it("handle a microflow error", () => {
            const badgeButton = new badgeButtonWidget("badgeButtonMFError");

            badgeButton.element.waitForDisplayed();
            badgeButton.element.click();

            const dialog = page.waitForElement(".modal-body");

            expect(dialog.isDisplayed()).toBeTruthy();
            const text = page.waitForElement(".mx-dialog-body").getText();
            expect(text).toContain("An error occured, please contact your system administrator");
        });
    });
    // An error has occurred that might have been caused by fast reload. Refresh the page to fix it.
});
