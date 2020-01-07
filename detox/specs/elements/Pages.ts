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
            await scrollAndClickOnButton("actionButton15");
        },
        async openAnimation() {
            await scrollAndClickOnButton("actionButton3");
        },
        async openBadge() {
            await scrollAndClickOnButton("actionButton18");
        },
        async openColorPicker() {
            await scrollAndClickOnButton("actionButton21");
        },
        async openFeedback() {
            await scrollAndClickOnButton("actionButton22");
        },
        async openFloatingActionButton() {
            await scrollAndClickOnButton("actionButton23");
        },
        async openProgressBar() {
            await scrollAndClickOnButton("actionButton14");
        },
        async openProgressCircle() {
            await scrollAndClickOnButton("actionButton16");
        },
        async openVideoPlayer() {
            await scrollAndClickOnButton("actionButton24");
        },
        async openWebView() {
            await scrollAndClickOnButton("actionButton28");
        },
        async openIntroScreen() {
            await scrollAndClickOnButton("actionButton4");
        },
        async openSafeAreaView() {
            await scrollAndClickOnButton("actionButton5");
        },
        async openListViewSwipe() {
            await scrollAndClickOnButton("actionButton2");
        },
        async openJSActions() {
            await clickOnButton("bottomBarItem$Actions");
        },
        async openNanoflowCommons() {
            await clickOnButton("bottomBarItem$Commons");
        }
    };
}
