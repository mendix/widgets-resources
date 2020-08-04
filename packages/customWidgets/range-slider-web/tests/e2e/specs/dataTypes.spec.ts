import page from "../../../../../../configs/e2e/src/pages/page";
import RangeSlider from "../objects/rangeSlider.widget";

describe("Range Slider", () => {
    const rangeSlider = new RangeSlider("rangeSlider1");

    beforeAll(() => {
        page.open();
        rangeSlider.element.waitForDisplayed();
    });

    it("renders slider with interval context", () => {
        expect(rangeSlider.firstTrack.isDisplayed()).toBeTruthy();
    });
    it("renders slider min value text", () => {
        expect(rangeSlider.minValueText).toBe("0");
    });
    it("renders slider max value text", () => {
        expect(rangeSlider.maxValueText).toBe("100");
    });
    // TODO: Values returned in pixels, so couldn't text precisely
    it("upper bound value is higher than lower bound value", () => {
        expect(rangeSlider.upperBound).toBeGreaterThan(rangeSlider.lowerBound);
    });
});
