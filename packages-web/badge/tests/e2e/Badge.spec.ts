import homepage from "./pages/home.page";

const caption = "Static";
const testValue = "Test";

describe("Badge", () => {
    it("should render a badge with a caption", () => {
        homepage.open();
        homepage.badge.waitForDisplayed();

        const badge = homepage.badgeSuccess.getHTML();
        expect(badge).toContain(caption);
    });

    it("renders with Bootstrap style success when style is success", () => {
        homepage.open();
        homepage.badgeSuccess.waitForDisplayed();

        const classname = $("#mxui_widget_ReactCustomWidgetWrapper_2").getCSSProperty("background-color").value;
        expect(classname).toContain("rgba(140,193,82,1)");
    });

    it("renders with Bootstrap style danger when style is danger", () => {
        homepage.open();
        homepage.badgeDanger.waitForDisplayed();

        const classname = $("#mxui_widget_ReactCustomWidgetWrapper_8").getCSSProperty("background-color").value;
        expect(classname).toContain("rgba(217,83,79,1)");
    });

    it("caption should change when updated", () => {
        homepage.open();
        homepage.input.waitForDisplayed();
        homepage.badge.waitForDisplayed();
        homepage.input.setValue(testValue);
        homepage.badge.click();

        const badge = homepage.badge.getHTML();
        expect(badge).toContain(testValue);
    });
});

describe("label", () => {
    it("should render a label with a caption", () => {
        homepage.open();
        homepage.label.waitForDisplayed();

        const label = homepage.labelSuccess.getHTML();
        expect(label).toContain(caption);
    });

    it("renders with Bootstrap style success when style is sucess", () => {
        homepage.open();
        homepage.labelSuccess.waitForDisplayed();

        const classname = $("#mxui_widget_ReactCustomWidgetWrapper_3").getCSSProperty("background-color").value;
        expect(classname).toContain("rgba(140,193,82,1)");
    });

    it("renders with Bootstrap style danger when style is danger", () => {
        homepage.open();
        homepage.labelDanger.waitForDisplayed();

        const classname = $("#mxui_widget_ReactCustomWidgetWrapper_9").getCSSProperty("background-color").value;
        expect(classname).toContain("rgba(217,83,79,1)");
    });

    it("caption should change when updated", () => {
        homepage.open();
        homepage.input.waitForDisplayed();
        homepage.label.waitForDisplayed();
        homepage.input.setValue(testValue);
        homepage.label.click();

        const label = homepage.label.getHTML();
        expect(label).toContain(testValue);
    });
});
