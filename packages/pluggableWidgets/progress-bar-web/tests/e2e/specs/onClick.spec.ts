import page from "../../../../../../configs/e2e/src/pages/page";
import ProgressBar from "../objects/progressBar.widget";

describe("Progress Bar on click", () => {
    beforeEach(() => {
        page.open("p/eventOnClick");
    });
    it("should call Microflow", () => {
        const progressBar = new ProgressBar("onClickMicroflow");
        const value = progressBar.value;
        progressBar.element.waitForDisplayed();
        progressBar.clickableArea.click();

        const dialog = page.modalDialog;
        dialog.waitForDisplayed();
        expect(dialog.getText()).toContain(value);
    });
    it("should call Nanoflow", () => {
        const progressBar = new ProgressBar("onClickNanoflow");
        const value = progressBar.value;
        progressBar.clickableArea.click();

        const dialog = page.modalDialog;
        dialog.waitForDisplayed();
        const textBoxValue = page.getWidget("NewEditTextBox").$(".form-control-static").getText();
        expect(value).toContain(textBoxValue);
    });
    it("should Open Full Page", () => {
        const progressBar = new ProgressBar("onClickOpenFullPage");
        const value = progressBar.value;
        progressBar.clickableArea.click();

        const progressBarOpened = new ProgressBar("onClickOpened");
        progressBarOpened.element.waitForDisplayed();
        expect(value).toContain(progressBarOpened.value);
    });
    it("should Open Popup Page", () => {
        const progressBar = new ProgressBar("onClickOpenPopupPage");
        const value = progressBar.value;
        progressBar.clickableArea.click();

        const progressBarOpened = new ProgressBar("onClickOpened");
        progressBarOpened.element.waitForDisplayed();
        expect(value).toContain(progressBarOpened.value);
    });
    it("should Open Blocking Popup Page", () => {
        const progressBar = new ProgressBar("onClickOpenBlockingPopupPage");
        const value = progressBar.value;
        progressBar.clickableArea.click();

        const progressBarOpened = new ProgressBar("onClickOpened");
        progressBarOpened.element.waitForDisplayed();
        expect(value).toContain(progressBarOpened.value);
    });
});
