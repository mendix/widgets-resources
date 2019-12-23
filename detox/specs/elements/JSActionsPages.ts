import { by, element, waitFor } from "detox";

export function JSActionsPages() {
    const clickOnButton = async (buttonName: string) => {
        const button = element(by.id(buttonName).withAncestor(by.id("scrollContainer2")));
        await waitFor(button)
            .toExist()
            .withTimeout(2000);
        await button.tap();
    };
    // const scrollAndClickOnButton = async (buttonName: string, step?: number) => {
    //     const button = element(by.id(buttonName));
    //     await waitFor(button)
    //         .toBeVisible()
    //         .whileElement(by.id("scrollContainer1"))
    //         .scroll(step || 250, "down");
    //     await button.tap();
    // };
    return {
        async openAuthentication() {
            await clickOnButton("actionButton4");
        },
        async openCamera() {
            await clickOnButton("actionButton6");
        },
        async openClipboard() {
            await clickOnButton("actionButton7");
        },
        async openMobile() {
            await clickOnButton("actionButton40");
        },
        async openNetwork() {
            await clickOnButton("actionButton38");
        }
    };
}
