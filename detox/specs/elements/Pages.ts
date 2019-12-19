import { by, element, waitFor } from "detox";

export function Pages() {
    const clickOnButton = async (buttonName: string) => {
        const button = element(by.id(buttonName));
        await waitFor(button)
            .toExist()
            .withTimeout(2000);
        await button.tap();
    };
    const scrollAndClickOnButton = async (buttonName: string, step?: number) => {
        const button = element(by.id(buttonName));
        await waitFor(button)
            .toBeVisible()
            .whileElement(by.id("scrollContainer1"))
            .scroll(step || 250, "down");
        await button.tap();
    };
    return {
        async openActivityIndicator() {
            await clickOnButton("actionButton15");
        },
        async openAnimation() {
            await clickOnButton("actionButton3");
        },
        async openBadge() {
            await clickOnButton("actionButton18");
        },
        async openColorPicker() {
            await clickOnButton("actionButton21");
        },
        async openFeedback() {
            await clickOnButton("actionButton22");
        },
        async openFloatingActionButton() {
            await clickOnButton("actionButton23");
        },
        async openProgressBar() {
            await clickOnButton("actionButton14");
        },
        async openProgressCircle() {
            await clickOnButton("actionButton16");
        },
        async openVideoPlayer() {
            await scrollAndClickOnButton("actionButton24");
        },
        async openWebView() {
            await clickOnButton("actionButton28");
        },
        async openIntroScreen() {
            await scrollAndClickOnButton("actionButton4");
        },
        async openSafeAreaView() {
            await clickOnButton("actionButton5");
        }
    };
}
