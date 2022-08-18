import { expectToMatchScreenshot, tapMenuItem } from "../../../../../detox/src/helpers";

describe("Repeater", () => {
    beforeAll(async () => {
        await tapMenuItem("Repeater");
    });

    it("renders the default repeater", async () => {
        await expectToMatchScreenshot();
    });
});
