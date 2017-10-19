import homepage from "./pages/home.page";

const caption = "New";
const testValue = "Test";
describe("Badge", () => {
    it("should render a badge with a caption", () => {
        homepage.open();
        homepage.badge.waitForVisible();

        const badge = homepage.badge.getHTML();
        expect(badge).toContain(caption);
    });

    it("renders with Bootstrap style success when style is sucess", () => {
        homepage.open();
        homepage.badgeSuccess.waitForVisible();

        const classname = browser.getCssProperty("#mxui_widget_ReactCustomWidgetWrapper_2", "background-color").value;
        expect(classname).toContain("rgba(140,193,82,1)");
    });

    it("renders with Bootstrap style danger when style is danger", () => {
        homepage.open();
        homepage.badgeDanger.waitForVisible();

        const classname = browser.getCssProperty("#mxui_widget_ReactCustomWidgetWrapper_8", "background-color").value;
        expect(classname).toContain("rgba(217,83,79,1)");
    });

    it("caption should change when updated", () => {
        homepage.open();
        homepage.input.waitForVisible();
        homepage.badge.waitForVisible();
        homepage.input.setValue(testValue);
        homepage.badge.click();

        const badge = homepage.badge.getHTML();
        expect(badge).toContain(testValue);
    });
});

describe("label", () => {
    it("should render a label with a caption", () => {
        homepage.open();
        homepage.label.waitForVisible();

        const label = homepage.label.getHTML();
        expect(label).toContain(caption);
    });

    it("renders with Bootstrap style success when style is sucess", () => {
        homepage.open();
        homepage.labelSuccess.waitForVisible();

        const classname = browser.getCssProperty("#mxui_widget_ReactCustomWidgetWrapper_3", "background-color").value;
        expect(classname).toContain("rgba(140,193,82,1)");
    });

    it("renders with Bootstrap style danger when style is danger", () => {
        homepage.open();
        homepage.labelDanger.waitForVisible();

        const classname = browser.getCssProperty("#mxui_widget_ReactCustomWidgetWrapper_9", "background-color").value;
        expect(classname).toContain("rgba(217,83,79,1)");
    });

    it("caption should change when updated", () => {
        homepage.open();
        homepage.input.waitForVisible();
        homepage.label.waitForVisible();
        homepage.input.setValue(testValue);
        homepage.label.click();

        const label = homepage.label.getHTML();
        expect(label).toContain(testValue);
    });
});
