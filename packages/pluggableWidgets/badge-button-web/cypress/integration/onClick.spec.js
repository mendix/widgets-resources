import page from "../../../../../../configs/e2e/src/pages/page";
import badgeButtonWidget from "../objects/badgeButton.widget";
describe("BadgeButton on click", () => {
    describe("call microflow", () => {
        beforeAll(() => {
            page.open("p/events");
        });

        it("displays a dialog", () => {
            const badgeButton = new badgeButtonWidget("badgeButtonCallMicroflow");

            badgeButton.element.waitForDisplayed();
            badgeButton.element.click();

            const dialog = page.waitForElement(".mx-dialog-body");
            expect(dialog.getText()).toEqual("Microflow Successfully Called With badge New");
        });
    });

    describe("call nanoflow", () => {
        beforeAll(() => {
            page.open("p/events");
        });

        it("displays a dialog", () => {
            const badgeButton = new badgeButtonWidget("badgeButtonCallNanoflow");

            badgeButton.element.waitForDisplayed();
            badgeButton.element.click();

            const dialog = page.waitForElement(".mx-dialog-body");
            expect(dialog.getText()).toEqual("Nanoflow called");
        });
    });

    describe("open page", () => {
        beforeEach(() => {
            page.open("p/events");
        });

        it("opens a page", () => {
            const badgeButton = new badgeButtonWidget("badgeButtonShowPage");

            badgeButton.element.waitForDisplayed();
            badgeButton.element.click();

            const header = page.header();
            expect(header).toBe("ClickedPage");
        });

        it("opens modal popup page", () => {
            const badgeButton = new badgeButtonWidget("badgeButtonShowPopupPage");

            badgeButton.element.waitForDisplayed();
            badgeButton.element.click();

            const header = page.header();
            expect(header).toBe("Events");

        });
    });

    describe("close page", () => {
        beforeEach(() => {
            page.open("p/events");
        });

        it("closes a page", () => {
            page.getWidget("openClosePage").click();
            const badgeButton = new badgeButtonWidget("badgeButtonClosePage");

            badgeButton.element.waitForDisplayed();
            badgeButton.element.click();

            browser.waitUntil(() => page.header() === "Events", { timeout: 3000 });
        });
    });
});
