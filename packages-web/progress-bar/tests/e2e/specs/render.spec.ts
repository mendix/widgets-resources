import page from "../pages/page";
import progressBarWidget from "../objects/progressBar.widget";

describe("Progress Bar rendering", () => {
    beforeAll(() => {
        page.open();
    });

    it("should display correctly dynamic data", () => {
        const progressBar = new progressBarWidget("progressBarPlayground");
        progressBar.element.waitForDisplayed();

        expect(progressBar.getText()).toEqual("50%");
    });

    // it("should display correctly dynamic data", () => {
    //     const progressBar = new progressBarWidget("progressBarDynamic");

    //     progressBar.element.waitForDisplayed();
    //     expect(progressBar.getText()).toEqual("Button");
    //     expect(progressBar.getBadgeText()).toEqual("New");
    // });

    // it("should display correctly fallback data", () => {
    //     const progressBar = new progressBarWidget("progressBarFallback");

    //     progressBar.element.waitForDisplayed();
    //     expect(progressBar.getText()).toEqual("Button");
    //     expect(progressBar.getBadgeText()).toEqual("");
    // });

    // it("should display correctly static data", () => {
    //     const progressBar = new progressBarWidget("progressBarStatic");

    //     progressBar.element.waitForDisplayed();
    //     expect(progressBar.getText()).toEqual("Button");
    //     expect(progressBar.getBadgeText()).toEqual("Static");
    // });

    it("should display correctly primary style", () => {
        const progressBar = new progressBarWidget("progressBarPrimary");

        progressBar.element.waitForDisplayed();
        expect(progressBar.getColors()).toEqual(progressBar.defaultStyles.PrimaryBackground);
    });

    // it("should display correctly default style", () => {
    //     const progressBar = new progressBarWidget("progressBarDynamic");

    //     progressBar.element.waitForDisplayed();
    //     expect(progressBar.getColors()).toEqual(progressBar.defaultStyles.DefaultBackground);
    // });

    // it("should display correctly success style", () => {
    //     const progressBar = new progressBarWidget("progressBarSuccess");

    //     progressBar.element.waitForDisplayed();
    //     expect(progressBar.getColors()).toEqual(progressBar.defaultStyles.SuccessBackground);
    // });

    // it("should display correctly info style", () => {
    //     const progressBar = new progressBarWidget("progressBarInfo");

    //     progressBar.element.waitForDisplayed();
    //     expect(progressBar.getColors()).toEqual(progressBar.defaultStyles.InfoBackground);
    // });

    // it("should display correctly warning style", () => {
    //     const progressBar = new progressBarWidget("progressBarWarning");

    //     progressBar.element.waitForDisplayed();
    //     expect(progressBar.getColors()).toEqual(progressBar.defaultStyles.WarningBackground);
    // });

    // it("should display correctly danger style", () => {
    //     const progressBar = new progressBarWidget("progressBarDanger");

    //     progressBar.element.waitForDisplayed();
    //     expect(progressBar.getColors()).toEqual(progressBar.defaultStyles.DangerBackground);
    // });

    // it("should display correctly inverse style", () => {
    //     const progressBar = new progressBarWidget("progressBarInverse");

    //     progressBar.element.waitForDisplayed();
    //     expect(progressBar.getColors()).toEqual(progressBar.defaultStyles.InverseBackground);
    // });
});
