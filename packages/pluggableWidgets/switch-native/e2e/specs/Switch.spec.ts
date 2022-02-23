import { expectToMatchScreenshot, resetDevice, tapMenuItem } from "../../../../../detox/src/helpers";
import { Alert } from "../../../../../detox/src/Alert";
import { expect, by, element } from "detox";

describe("Switch", () => {
    beforeAll(async () => {
        await tapMenuItem("Switch");
    });

    afterAll(async () => {
        await resetDevice();
    });

    it("renders correctly when false", async () => {
        const switchElement = element(by.id("switch1"));
        await expectToMatchScreenshot(switchElement);
    });

    it("renders correctly when true", async () => {
        const switchElement = element(by.id("switch1"));
        await switchElement.tap();
        await expectToMatchScreenshot(switchElement);
    });

    it("renders custom style", async () => {
        const switchElement = element(by.id("switch2"));
        await expectToMatchScreenshot(switchElement);
    });

    it("triggers configured event", async () => {
        await element(by.id("switch2")).tap();
        const alert = Alert();
        await expect(alert.messageElement).toHaveText("Action has been triggered!");
    });
});
