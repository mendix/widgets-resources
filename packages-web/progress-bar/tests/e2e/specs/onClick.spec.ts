import page from "../pages/page";
import progressBarWidget from "../objects/progressBar.widget";

describe("BadgeButton on click", () => {
    describe("call microflow", () => {
        beforeAll(() => {
            page.open("p/click-events");
        });

        it("should display a dialog", () => {
            const progressBar = new progressBarWidget("progressBarCallMicroflow");

            progressBar.element.waitForDisplayed();
            progressBar.element.click();

            const dialog = page.getElement(".mx-dialog-body");
            dialog.waitForDisplayed();
            expect(dialog.getText()).toEqual("Microflow Successfully Called from progress bar at 50%");
        });
    });
});

//     describe("call nanoflow", () => {
//         beforeAll(() => {
//             page.open("p/callNanoflow");
//         });

//         it("should display a dialog", () => {
//             const progressBar = new progressBarWidget("progressBarCallNanoflow");

//             progressBar.element.waitForDisplayed();
//             progressBar.element.click();

//             const dialog = page.getElement(".modal-body");
//             dialog.waitForDisplayed();

//             expect(dialog.isDisplayed()).toBeTruthy();

//             // Verify it passes a parameter
//             const data = page.getElement(".form-control-static").getText();
//             expect(data).toBe("New");
//         });
//     });

//     describe("open page", () => {
//         beforeEach(() => {
//             page.open("p/openPage");
//         });

//         it("should open a page", () => {
//             const progressBar = new progressBarWidget("progressBarShowFullPage");

//             progressBar.element.waitForDisplayed();
//             progressBar.element.click();

//             const header = page.header;
//             expect(header).toBe("ClickedPage");
//         });

//         it("should open a popup page", () => {
//             const progressBar = new progressBarWidget("progressBarShowPopupPage");

//             progressBar.element.waitForDisplayed();
//             progressBar.element.click();

//             const header = page.header;
//             expect(header).toBe("ClickedPagePopup");
//         });

//         it("should open modal popup page", () => {
//             const progressBar = new progressBarWidget("progressBarShowBlockedPopupPage");

//             progressBar.element.waitForDisplayed();
//             progressBar.element.click();

//             const header = page.header;
//             expect(header).toBe("ModalPopupPage");
//         });
//     });

//     describe("close page", () => {
//         beforeEach(() => {
//             page.open("p/closePage");
//         });

//         it("should close a page", () => {
//             page.getWidget("openClosePage").click();
//             const progressBar = new progressBarWidget("progressBarClosePage");

//             progressBar.element.waitForDisplayed();
//             progressBar.element.click();

//             const header = page.header;
//             expect(header).toBe("OnClickClosePage");
//         });

//         it("should close a popup page", () => {
//             page.getWidget("openClosePopup").click();
//             const progressBar = new progressBarWidget("progressBarClosePopup");

//             progressBar.element.waitForDisplayed();
//             progressBar.element.click();

//             const header = page.header;
//             expect(header).toBe("OnClickClosePage");
//         });
//     });

//     describe("microflow error", () => {
//         beforeEach(() => {
//             page.open("p/onClickMFError");
//         });

//         it("handle a microflow error", () => {
//             const progressBar = new progressBarWidget("progressBarMFError");

//             progressBar.element.waitForDisplayed();
//             progressBar.element.click();

//             const dialog = page.getElement(".modal-body");
//             dialog.waitForDisplayed();

//             expect(dialog.isDisplayed()).toBeTruthy();
//             const text = page.getElement(".mx-dialog-body").getText();
//             expect(text).toContain("An error occured, please contact your system administrator");
//         });
//     });
//     // An error has occurred that might have been caused by fast reload. Refresh the page to fix it.
// });
