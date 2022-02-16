import { expectToMatchScreenshot, resetDevice, tapMenuItem } from "../../../../../detox/src/helpers";

describe("Repeater", () => {
    beforeAll(async () => {
        await tapMenuItem("Repeater");
    });

    afterAll(async () => {
        await resetDevice();
    });

    it("renders the default repeater", async () => {
        await expectToMatchScreenshot();
    });
});
