import { by, element, waitFor } from "detox";

export function JSActionsPages() {
    const clickOnButton = async (buttonName: string) => {
        const button = element(by.id(buttonName));
        await waitFor(button)
            .toExist()
            .withTimeout(2000);
        await button.tap();
    };
    return {
        async openAuthentication() {
            await clickOnButton("btnAuthentication");
        },
        async openCamera() {
            await clickOnButton("btnCamera");
        },
        async openClipboard() {
            await clickOnButton("btnClipboard");
        },
        async openMobile() {
            await clickOnButton("btnMobile");
        },
        async openNetwork() {
            await clickOnButton("btnNetwork");
        }
    };
}
