import { resetDevice, tapMenuItem } from "../../../../../detox/src/helpers";

describe("Gallery", () => {
    beforeEach(async () => {
        await tapMenuItem("Gallery");
    });

    afterEach(async () => {
        await resetDevice();
    });
});
