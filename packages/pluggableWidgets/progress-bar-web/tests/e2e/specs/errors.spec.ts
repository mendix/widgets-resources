import page from "../../../../../../configs/e2e/src/pages/page";
import ProgressBar from "../objects/progressBar.widget";

describe("Progress Bar", () => {
    beforeAll(() => {
        page.open("p/noContext");
    });

    it("should render progress bar when there's no context", () => {
        const progressBar = new ProgressBar("noContext");
        progressBar.element.waitForDisplayed();

        expect(progressBar.value).toBe("0%");
    });
});
