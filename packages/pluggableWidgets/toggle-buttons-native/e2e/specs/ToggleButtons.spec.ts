import { expectToMatchScreenshot, resetDevice, tapMenuItem } from "../../../../../detox/src/helpers";
import { Alert } from "../../../../../detox/src/Alert";
import { expect, by, element } from "detox";

describe("Toggle Buttons", () => {
    beforeEach(async () => {
        await tapMenuItem("Toggle buttons");
    });

    afterEach(async () => {
        await resetDevice();
    });

    it("renders default state correctly", async () => {
        const toggleBtnsNormal = by.id("toggleButtonsNormal");
        const secondToggleBtn = element(toggleBtnsNormal.withDescendant(by.label("Satellite")));

        await expectToMatchScreenshot(element(toggleBtnsNormal));

        await secondToggleBtn.tap();

        await expectToMatchScreenshot(element(toggleBtnsNormal));
    });

    it("renders disabled state correctly", async () => {
        const toggleBtnsDisabled = by.id("toggleButtonsDisabled");
        const secondToggleBtn = element(toggleBtnsDisabled.withDescendant(by.label("Satellite")));

        await secondToggleBtn.tap();

        await expectToMatchScreenshot(element(toggleBtnsDisabled));
    });

    it("renders custom style", async () => {
        const toggleBtnsCustomStyle = element(by.id("toggleButtonsCustomStyle"));

        await expectToMatchScreenshot(toggleBtnsCustomStyle);
    });

    it("triggers configured event", async () => {
        const toggleBtnsOnChange = element(by.id("toggleButtonsOnChange").withDescendant(by.label("Satellite")));
        const alert = Alert();

        await toggleBtnsOnChange.tap();
        await expect(alert.messageElement).toHaveText("Changed!");
    });
});
