import { expectToMatchScreenshot, resetDevice, tapMenuItem } from "../../../../../detox/src/helpers";
import { expect, element, by, device, waitFor } from "detox";
import { Alert } from "../../../../../detox/src/Alert";

const timeout = 5000;

describe("Web view", () => {
    beforeEach(async () => {
        await tapMenuItem("Web view");
    });

    afterEach(async () => {
        await resetDevice();
    });

    it("should render messge if no content is provided", async () => {
        await element(by.text("NoContent")).tap();

        await expect(element(by.text("No URL or content was provided."))).toExist();
    });

    it("should open URL inline", async () => {
        await element(by.text("URL")).tap();

        await waitForAndCloseOnLoadAlert();

        await expectToMatchScreenshot(element(by.id("webViewURL")));
    });

    it("should show HTML content inline", async () => {
        await element(by.text("HTML")).tap();

        await waitForAndCloseOnLoadAlert();

        await expectToMatchScreenshot(element(by.id("webViewHTML")));
    });

    it("should trigger events on load and on error", async () => {
        await element(by.text("Events")).tap();

        await waitForAndCloseOnLoadAlert();

        await element(by.text("Invalid URL")).tap();
        await waitFor(Alert().messageElement).toHaveText("Something went wrong").withTimeout(timeout);
    });

    it("should show custom styling", async () => {
        await element(by.text("Custom")).tap();

        await waitForAndCloseOnLoadAlert();

        await expectToMatchScreenshot(element(by.id("webViewCustom")));
    });

    it("should send along custom user agent", async () => {
        await element(by.text("UserAgent")).tap();

        await waitForAndCloseOnLoadAlert();

        await expectToMatchScreenshot(element(by.id("webViewUserAgent")));
    });

    it("should open URL externally", async () => {
        // Skipping this test for Android because link is not clickable in web view
        if (device.getPlatform() !== "android") {
            await element(by.text("External")).tap();

            await waitForAndCloseOnLoadAlert();

            await element(by.id("webViewExternal")).tap({ x: 3, y: 3 });
            await new Promise(res => setTimeout(res, timeout));
            await expectToMatchScreenshot();
        }
    });
});

async function waitForAndCloseOnLoadAlert(): Promise<void> {
    const alert = Alert();
    await waitFor(alert.messageElement).toHaveText("URL loaded").withTimeout(timeout);
    await alert.confirm();
}
