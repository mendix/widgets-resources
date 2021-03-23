import page from "../../../../../../configs/e2e/src/pages/page";
import ProgressCircle from "../objects/progressCircle.widget";

describe("Progress Circle", () => {
    it("renders with a value", () => {
        page.open("p/Home");

        const progressCircle = new ProgressCircle("progressCircleNegative");
        progressCircle.element.waitForDisplayed();

        expect(progressCircle.valueElement.getText()).toBe("20%");
    });

    it("updates the progress percentage when the value is changed", () => {
        page.open("p/Playground");

        const progressCirclePercentage = new ProgressCircle("progressCirclePercentage");

        const progress = page.getWidget("textBoxProgress");
        progress.$(".form-control").setValue("67");
        page.getWidget("textBoxMaximumValue").click();

        expect(progressCirclePercentage.valueElement.getText()).toBe("67%");

        const progressCircleValue = new ProgressCircle("progressCircleValue");
        const progressCircleNoValue = new ProgressCircle("progressCircleNoValue");
        const progressCircleAttribute = new ProgressCircle("progressCircleAttribute");
        const progressCircleStaticText = new ProgressCircle("progressCircleStaticText");
        const progressCircleStaticTextAttributeDefined = new ProgressCircle("progressCircleStaticTextAttributeDefined");

        expect(progressCircleValue.valueElement.getText()).toBe("67");
        expect(progressCircleNoValue.valueElement.getText()).toBe("");
        expect(progressCircleAttribute.valueElement.getText()).toBe("Working with an attribute");
        expect(progressCircleStaticText.valueElement.getText()).toBe("Static text");
        expect(progressCircleStaticTextAttributeDefined.valueElement.getText()).toBe("Static text");
    });
});
