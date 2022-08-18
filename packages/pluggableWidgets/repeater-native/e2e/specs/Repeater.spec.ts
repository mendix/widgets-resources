import { expectToMatchScreenshot, launchApp, tapMenuItem } from "../../../../../detox/src/helpers";

describe("Repeater", () => {
    beforeAll(async () => {
        await launchApp();
        await tapMenuItem("Repeater");
    });

    it("renders the default repeater", async () => {
        await expectToMatchScreenshot();
    });
});
