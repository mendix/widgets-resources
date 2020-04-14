import page from "../../../../../configs/e2e/src/pages/page";
import FieldsetWidget from "../objects/Fieldset.widget";

describe("Slider widget", () => {
    it("renders with context", () => {
        page.open("/");
    });
    it("renders without context");
    it("listens to a grid");
    // it("renders in a list view");
    // it("renders in a template grid");
    // it("renders in a tab container");
    it("triggers a microflow after slide");
    it("triggers a nanoflow after slide");

    describe("Alert message", () => {
        it("warns when the minimum value is higher than the maximum value");
        it("warns when the value is higher than the maximum value");
        it("warns when the value is lower than the minimum value");
        it("warns about an invalid step size value");
    });

    describe("Tooltip", () => {
        it("doesn't render when there's no title");
        it("renders a static title");
        it("renders the slider's value");
        it("renders without context the slider's value");
    });

    describe("Slider", () => {
        it("renders with a range that goes from negative to positive");
        it("renders multiple markers");
        it("renders decimal values");
        it("renders long values");
        it("slides with a step size");

        describe("Style", () => {
            it("renders with default style");
            it("renders with primary style");
            it("renders with info style");
            it("renders with inverse style");
            it("renders with success style");
            it("renders with warning style");
            it("renders with danger style");
        });
    });
});
