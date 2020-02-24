import { logErrors, runAxe, waitForTestPageToLoad } from "../lib/Test";

const badgesContainerSelector = ".mx-name-containerBadges";
const labelsContainerSelector = ".mx-name-containerLabels";

const options = {
    runOnly: ["wcag2a", "wcag2aa"]
};

describe("Test badge", () => {
    beforeAll(() => {
        waitForTestPageToLoad("/p/badge", badgesContainerSelector);
    });

    it("should have no violations", () => {
        const element = $(badgesContainerSelector);

        const result = runAxe(element, options);

        expect(result.violations.length).toBe(0);
        logErrors(result);
    });

    it("label should have no violations", () => {
        const element = $(labelsContainerSelector);

        const result = runAxe(element, options);

        expect(result.violations.length).toBe(0);
        logErrors(result);
    });
});
