import { Alert, JSActionsPages, Pages } from "./elements";
import { by, device, element, expect } from "detox";

describe("JS Actions", () => {
    beforeAll(async () => {
        await Pages().openJSActions();
    });

    it("should test authentication", async () => {
        await JSActionsPages().openAuthentication();
        const isSupported = await element(by.text("Is biometric authentication supported?"));
        const biometricAuthentication = await element(by.text("Biometric authentication"));

        await isSupported.tap();
        await expect(Alert().getMessage("Yes")).toBeVisible();
        await Alert().confirm();

        await biometricAuthentication.tap();
        await device.matchFace();
        await expect(Alert().getMessage("Success")).toBeVisible();
        await Alert().confirm();
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
