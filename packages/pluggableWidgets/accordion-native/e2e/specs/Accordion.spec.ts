import { expectToMatchScreenshot, resetDevice, tapMenuItem } from "../../../../../detox/src/helpers";
import { expect, element, by } from "detox";
import { Alert } from "../../../../../detox/src/Alert";

describe("Accordion", () => {
    beforeEach(async () => {
        await tapMenuItem("Accordion");
    });

    afterEach(async () => {
        await resetDevice();
    });

    it("should render custom icons correctly", async () => {
        await element(by.text("Single")).tap();

        await element(by.text("Header 2")).tap();

        await expectToMatchScreenshot(element(by.id("accordionSingle")));
    });

    it("can only have 1 group open when in single mode", async () => {
        await element(by.text("Single")).tap();

        await expect(element(by.text("Header 1 - Text 1"))).toBeVisible();
        await expect(element(by.text("Header 1 - Text 2"))).toBeVisible();
        await expect(element(by.text("Header 3 - Text 1"))).not.toBeVisible();

        await element(by.text("Header 3")).tap();

        await expect(element(by.text("Header 1 - Text 1"))).not.toBeVisible();
        await expect(element(by.text("Header 1 - Text 2"))).not.toBeVisible();
        await expect(element(by.text("Header 3 - Text 1"))).toBeVisible();
    });

    it("can have more than 1 group open when in multiple mode", async () => {
        await element(by.text("Multiple")).tap();

        await expect(element(by.text("Header 1 - Text 1"))).toBeVisible();
        await expect(element(by.text("Header 1 - Text 2"))).toBeVisible();
        await expect(element(by.id("staticImage"))).toBeVisible();
        await expect(element(by.text("Header 3 - Text 1"))).not.toBeVisible();

        await element(by.text("Header 3")).tap();

        await expect(element(by.text("Header 1 - Text 1"))).toBeVisible();
        await expect(element(by.text("Header 1 - Text 2"))).toBeVisible();
        await expect(element(by.id("staticImage"))).toBeVisible();
        await expect(element(by.text("Header 3 - Text 1"))).toBeVisible();
    });

    it("should allow custom items as group headers", async () => {
        await element(by.text("Custom")).tap();

        await expectToMatchScreenshot(element(by.id("accordionCustom")));
    });

    it("should have all groups expanded in non-collapsible mode", async () => {
        await element(by.text("NonCollapsible")).tap();

        await expect(element(by.text("Header 1 - Text 1"))).toBeVisible();
        await expect(element(by.id("staticImage"))).toBeVisible();
        await expect(element(by.text("Header 3 - Text 1"))).toBeVisible();
        await expect(element(by.text("Header 4 - Text 1"))).toBeVisible();

        await element(by.text("Header 1")).tap();

        await expect(element(by.text("Header 1 - Text 1"))).toBeVisible();
    });

    it("should correctly expand/close groups based on expression & attribute", async () => {
        await element(by.text("Dynamic")).tap();

        await expect(element(by.text("Header 1 - Text 1"))).toBeVisible();
        await expect(element(by.id("staticImage"))).not.toBeVisible();
        await expect(element(by.text("Header 3 - Text 1"))).not.toBeVisible();

        await element(by.id("switcher")).tap();

        await expect(element(by.text("Header 1 - Text 1"))).toBeVisible();
        await expect(element(by.id("staticImage"))).toBeVisible();
        await expect(element(by.text("Header 3 - Text 1"))).toBeVisible();
    });

    it("should trigger action when opening and closing group", async () => {
        await element(by.text("OnChange")).tap();

        await element(by.text("Header 1")).tap();

        await expect(Alert().messageElement).toHaveText("Change detected!");
    });
});
