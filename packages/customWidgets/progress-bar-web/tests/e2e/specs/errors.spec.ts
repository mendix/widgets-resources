import page from "../../../../../../configs/e2e/src/pages/page";
import ProgressBar from "../objects/progressBar.widget";

describe("Progress Bar", () => {
    beforeAll(() => {
        page.open("p/configErrors");
    });

    it("should display error when onClick page is not configured", () => {
        expect(ProgressBar.alerts[0].getText()).toBe(
            "Error in progress bar configuration: on click page is required in the 'Events' tab, 'Page' property"
        );
    });

    it("should display error when onClick microflow is not configured", () => {
        expect(ProgressBar.alerts[1].getText()).toBe(
            "Error in progress bar configuration: on click microflow is required in the 'Events' tab, 'Microflow' property"
        );
    });

    it("should display error when onClick nanoflow is not configured", () => {
        expect(ProgressBar.alerts[2].getText()).toBe(
            "Error in progress bar configuration: on click nanoflow is required in the 'Events' tab, 'Nanoflow' property"
        );
    });

    it("should render progress bar when there's no context", () => {
        page.open("p/noContext");

        const progressBar = new ProgressBar("noContext");
        progressBar.element.waitForDisplayed();

        expect(progressBar.value).toBe("0%");
    });
});
