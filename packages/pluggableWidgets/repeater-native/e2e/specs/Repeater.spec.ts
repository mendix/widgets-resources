import { expectToMatchScreenshot, launchApp, sessionLogout, tapMenuItem } from "../../../../../detox/src/helpers";

describe("Repeater", () => {
    beforeAll(async () => {
        await launchApp();
        await tapMenuItem("Repeater");
    });

    afterAll(async () => {
        await sessionLogout();
    });

    it("renders the default repeater", async () => {
        await expectToMatchScreenshot();
    });
});
