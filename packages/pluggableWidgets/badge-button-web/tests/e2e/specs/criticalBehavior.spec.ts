import page from "../../../../../../configs/e2e/src/pages/page";
import badgeButtonWidget from "../objects/badgeButton.widget";

describe("BadgeButton different data types", () => {
    beforeAll(() => {
        page.open("p/criticalBehavior");
    });

    it("should display correctly Data, Caption, Primary Style", () => {
        const badgeButton = new badgeButtonWidget("badgeButtonDataCaptionStyle");
        badgeButton.element.waitForDisplayed();

        expect(badgeButton.getText()).toEqual("Button");
        expect(badgeButton.getBadgeText()).toEqual("140");
        expect(badgeButton.getColors()).toBe(badgeButton.defaultStyles.PrimaryBackground);
    });

    it("should display correctly Data, Caption, Default Style", () => {
        const badgeButton = new badgeButtonWidget("badgeButtonDataCaptionDefaultStyle");
        badgeButton.element.waitForDisplayed();

        expect(badgeButton.getText()).toEqual("Button");
        expect(badgeButton.getBadgeText()).toEqual("New");
        expect(badgeButton.getColors()).toBe(badgeButton.defaultStyles.DefaultBackground);
    });

    it("should display correctly Data, No Caption, Default Style", () => {
        const badgeButton = new badgeButtonWidget("badgeButtonDataNoCaptionDefaultStyle");
        badgeButton.element.waitForDisplayed();

        expect(badgeButton.getText()).toEqual("");
        expect(badgeButton.getBadgeText()).toEqual("New");
        expect(badgeButton.getColors()).toBe(badgeButton.defaultStyles.DefaultBackground);
    });

    it("should display correctly Data, No Caption, Success Style", () => {
        const badgeButton = new badgeButtonWidget("badgeButtonDataNoCaptionStyle");
        badgeButton.element.waitForDisplayed();

        expect(badgeButton.getText()).toEqual("");
        expect(badgeButton.getBadgeText()).toEqual("140");
        expect(badgeButton.getColors()).toBe(badgeButton.defaultStyles.SuccessBackground);
    });

    it("should display correctly No Data, Info Style", () => {
        const badgeButton = new badgeButtonWidget("badgeButtonNoData");
        badgeButton.element.waitForDisplayed();

        expect(badgeButton.getText()).toEqual("");
        expect(badgeButton.getBadgeText()).toEqual("");
        expect(badgeButton.getColors()).toBe(badgeButton.defaultStyles.InfoBackground);
    });

    it("should display correctly Static Data", () => {
        const badgeButton = new badgeButtonWidget("badgeButtonStatic");
        badgeButton.element.waitForDisplayed();

        expect(badgeButton.getText()).toEqual("");
        expect(badgeButton.getBadgeText()).toEqual("Static");
        expect(badgeButton.getColors()).toBe(badgeButton.defaultStyles.DefaultBackground);
    });
});
