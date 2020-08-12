import page from "../../../../../../configs/e2e/src/pages/page";
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

    it("should update text value", () => {
        const textInput = page.getWidget("textBox1");
        textInput.$(".form-control").setValue("\uE003\uE003\uE003"); // Chrome is not clearing value before set new value (https://github.com/webdriverio/webdriverio/issues/3024)
        textInput.$(".form-control").setValue("Newer");
        textInput.$(".control-label").click();

        const badgeButton = new badgeButtonWidget("badgeButtonDynamic");

        badgeButton.element.waitForDisplayed();
        expect(badgeButton.getText()).toEqual("Button");
        expect(badgeButton.getBadgeText()).toEqual("Newer");
    });

    it("should update number value", () => {
        const textInput = page.getWidget("textBox2");
        textInput.$(".form-control").setValue("0987654");
        textInput.$(".control-label").click();

        const badgeButton = new badgeButtonWidget("badgeButtonFallback");

        badgeButton.element.waitForDisplayed();
        expect(badgeButton.getText()).toEqual("Button");
        expect(badgeButton.getBadgeText()).toEqual("987654");
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

    it("should display correctly default style", () => {
        const badgeButton = new badgeButtonWidget("badgeButtonDynamic");

        badgeButton.element.waitForDisplayed();
        expect(badgeButton.getColors()).toEqual(badgeButton.defaultStyles.DefaultBackground);
    });

    it("should display correctly success style", () => {
        const badgeButton = new badgeButtonWidget("badgeButtonSuccess");

        badgeButton.element.waitForDisplayed();
        expect(badgeButton.getColors()).toEqual(badgeButton.defaultStyles.SuccessBackground);
    });

    it("should display correctly info style", () => {
        const badgeButton = new badgeButtonWidget("badgeButtonInfo");

        badgeButton.element.waitForDisplayed();
        expect(badgeButton.getColors()).toEqual(badgeButton.defaultStyles.InfoBackground);
    });

    it("should display correctly warning style", () => {
        const badgeButton = new badgeButtonWidget("badgeButtonWarning");

        badgeButton.element.waitForDisplayed();
        expect(badgeButton.getColors()).toEqual(badgeButton.defaultStyles.WarningBackground);
    });

    it("should display correctly danger style", () => {
        const badgeButton = new badgeButtonWidget("badgeButtonDanger");

        badgeButton.element.waitForDisplayed();
        expect(badgeButton.getColors()).toEqual(badgeButton.defaultStyles.DangerBackground);
    });

    it("should display correctly inverse style", () => {
        const badgeButton = new badgeButtonWidget("badgeButtonInverse");

        badgeButton.element.waitForDisplayed();
        expect(badgeButton.getColors()).toEqual(badgeButton.defaultStyles.InverseBackground);
    });
});
