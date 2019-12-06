import page from "../pages/page";
import badgeWidget from "../Objects/badge.widget";

describe("badge-web", () => {
    beforeEach(() => {
        page.open("p/callNanoflow"); // resets page
    });

    it("should call nanoflow on click badge", () => {
        const badge = new badgeWidget("badgeCallNanoflow");
        badge.element.waitForDisplayed();
        badge.element.click();

        const dialog = page.getElement(".modal-body");
        dialog.waitForDisplayed();

        expect(dialog.isDisplayed()).toBeTruthy();

        // Verify it passes a parameter
        const data = page.getElement(".form-control-static").getText();
        expect(data).toBe("NewSuccess");
    });

    it("should call nanoflow on click label", () => {
        const badge = new badgeWidget("labelCallNanoflow");
        badge.element.waitForDisplayed();
        badge.element.click();

        const dialog = page.getElement(".modal-body");
        dialog.waitForDisplayed();

        expect(dialog.isDisplayed()).toBeTruthy();

        // Verify it passes a parameter
        const data = page.getElement(".form-control-static").getText();
        expect(data).toBe("NewSuccess");
    });
});
