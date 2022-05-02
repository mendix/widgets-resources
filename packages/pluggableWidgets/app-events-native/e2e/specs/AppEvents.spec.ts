import { resetDevice, tapMenuItem } from "../../../../../detox/src/helpers";
import { waitFor, element, by } from "detox";

describe("App events", () => {
    beforeAll(async () => {
        await tapMenuItem("App events");
    });

    afterAll(async () => {
        await resetDevice();
    });

    it("should generate onPageLoad event", async () => {
        await waitFor(element(by.text("Event: Load")))
            .toBeVisible()
            .withTimeout(1000);
    });

    it("should generate sinlge onTimeout event", async () => {
        await waitFor(element(by.text("Event: Timer 2s")))
            .toBeVisible()
            .withTimeout(3000);
    });

    it("should generate looping onTimeout event", async () => {
        await waitFor(element(by.text("Event: Interval 3s")))
            .toBeVisible()
            .withTimeout(4000);
    });
});
