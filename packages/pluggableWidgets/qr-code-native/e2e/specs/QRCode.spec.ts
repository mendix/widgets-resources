import { element, by } from "detox";
import {
    expectToMatchScreenshot,
    launchApp,
    sessionLogout,
    setText,
    tapMenuItem
} from "../../../../../detox/src/helpers";

describe("QR code", () => {
    beforeEach(async () => {
        await launchApp();
        await tapMenuItem("QR code");
    });

    afterEach(async () => {
        await sessionLogout();
    });

    it("renders correctly", async () => {
        await expectToMatchScreenshot(element(by.id("qRCodeNormal")));
        await expectToMatchScreenshot(element(by.id("qRCodeCustomStyle")));
    });

    it("renders correctly after change", async () => {
        await setText(element(by.id("textBoxQRCode")), "https://www.mendix.com");

        await expectToMatchScreenshot(element(by.id("qRCodeNormal")));
    });
});
