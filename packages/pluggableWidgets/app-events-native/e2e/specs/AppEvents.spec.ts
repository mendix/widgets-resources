import { launchApp, sessionLogout, tapMenuItem } from "../../../../../detox/src/helpers";
import { waitFor, element, by } from "detox";

describe("App events", () => {
    beforeAll(async () => {
        await launchApp();
        await tapMenuItem("App events");
    });

    afterAll(async () => {
        await sessionLogout();
    });

    it("should generate onPageLoad event", async () => {
        await waitFor(element(by.text("Event: Load")))
            .toBeVisible()
            .withTimeout(10000);
    });

    it("should generate sinlge onTimeout event", async () => {
        await waitFor(element(by.text("Event: Timer 2s")))
            .toExist()
            .withTimeout(10000);
    });

    it("should generate looping onTimeout event", async () => {
        await waitFor(element(by.text("Event: Interval 10s")).atIndex(0))
            .toBeVisible()
            .withTimeout(20000);
    });
});
