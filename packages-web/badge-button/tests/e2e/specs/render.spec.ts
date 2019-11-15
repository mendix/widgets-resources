import page from "../pages/page";
import badgeButtonWidget from "../objects/badgeButton.widget";

describe("BadgeButton rendering", () => {
    beforeAll(() => {
        page.open();
    });

    it("should display correctly dynamic data", () => {
        const badgeButton = new badgeButtonWidget("badgeButtonDynamic");

        badgeButton.element.waitForDisplayed();
        expect(badgeButton.getText()).toEqual("Button");
        expect(badgeButton.getBadgeText()).toEqual("New");
    });

    it("should display correctly fallback data", () => {
        const badgeButton = new badgeButtonWidget("badgeButtonFallback");

        badgeButton.element.waitForDisplayed();
        expect(badgeButton.getText()).toEqual("Button");
        expect(badgeButton.getBadgeText()).toEqual("");
    });

    it("should display correctly static data", () => {
        const badgeButton = new badgeButtonWidget("badgeButtonStatic");

        badgeButton.element.waitForDisplayed();
        expect(badgeButton.getText()).toEqual("Button");
        expect(badgeButton.getBadgeText()).toEqual("Static");
    });

    it("should display correctly primary style", () => {
        const badgeButton = new badgeButtonWidget("badgeButtonStatic");

        badgeButton.element.waitForDisplayed();
        expect(badgeButton.getColors()).toEqual(badgeButton.defaultStyles.PrimaryBackground);
    });

    it("should display correctly success style", () => {
        const badgeButton = new badgeButtonWidget("badgeButtonSuccess");

        badgeButton.element.waitForDisplayed();
        console.log(badgeButton.getColors());
        expect(badgeButton.getColors()).toEqual(badgeButton.defaultStyles.SuccessBackground);
    });

    it("should display correctly inverse style", () => {
        const badgeButton = new badgeButtonWidget("badgeButtonInverse");

        badgeButton.element.waitForDisplayed();
        console.log(badgeButton.getColors());
        expect(badgeButton.getColors()).toEqual(badgeButton.defaultStyles.InverseBackground);
    });
});
