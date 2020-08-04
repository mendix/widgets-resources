import page from "../../../../../../configs/e2e/src/pages/page";
import ProgressBar from "../objects/progressBar.widget";

describe("Progress Bar", () => {
    it("should render attribute text", () => {
        page.open("p/displayAttributeText");
        const progressBarMaxValue = new ProgressBar("maximumValueAttribute");

        progressBarMaxValue.element.waitForDisplayed();
        const value1 = progressBarMaxValue.value;
        const value2 = new ProgressBar("progressBarStatic").value;
        const value3 = new ProgressBar("progressAttribute").value;

        const displayText = page.getWidget("displayText").$(".form-control");
        expect(value1).toContain(displayText.getText());
        expect(value2).toContain(displayText.getText());
        expect(value3).toContain(displayText.getText());
    });

    it("should render no text", () => {
        page.open("p/displayNone");
        const progressBarMaxValue = new ProgressBar("progressBar1");

        progressBarMaxValue.element.waitForDisplayed();
        const value1 = progressBarMaxValue.value;
        const value2 = new ProgressBar("progressBar2").value;
        const value3 = new ProgressBar("progressBar3").value;

        expect(value1).toBe("");
        expect(value2).toBe("");
        expect(value3).toBe("");
    });

    it("should display static value", () => {
        page.open("p/displayStaticText");
        const progressBarMaxValue = new ProgressBar("progressBar1");

        progressBarMaxValue.element.waitForDisplayed();
        const value1 = progressBarMaxValue.value;
        const value2 = new ProgressBar("progressBar2").value;
        const value3 = new ProgressBar("progressBar3").value;

        expect(value1).toBe("Static text 1");
        expect(value2).toBe("Static text 2");
        expect(value3).toBe("Static text 3");
    });

    it("should display percentage", () => {
        page.open("p/displayPercentage");
        const progressBarMaxValue = new ProgressBar("progressBar1");

        progressBarMaxValue.element.waitForDisplayed();
        const value1 = progressBarMaxValue.value;
        const value2 = new ProgressBar("progressBar2").value;
        const value3 = new ProgressBar("progressBar3").value;

        expect(value1).toBe("45%");
        expect(value2).toBe("67%");
        expect(value3).toBe("0%");
    });

    it("should display value", () => {
        page.open("p/displayValue");
        const progressBarMaxValue = new ProgressBar("progressBar1");

        progressBarMaxValue.element.waitForDisplayed();
        const value1 = progressBarMaxValue.value;
        const value2 = new ProgressBar("progressBar2").value;
        const value3 = new ProgressBar("progressBar3").value;

        expect(value1).toBe("45");
        expect(value2).toBe("67");
        expect(value3).toBe("0");
    });
});
