import { by, element, waitFor } from "detox";

export function Pages() {
    const clickOnButton = async (buttonName: string) => {
        const button = element(by.id(buttonName));
        await waitFor(button)
            .toExist()
            .withTimeout(2000);
        await button.tap();
    };
    return {
        async openActivityIndicator() {
            await clickOnButton("btnActivityIndicator");
        },
        async openAnimation() {
            await clickOnButton("btnAnimation");
        },
        async openBadge() {
            await clickOnButton("btnBadge");
        },
        async openColorPicker() {
            await clickOnButton("btnColorPicker");
        },
        async openFeedback() {
            await clickOnButton("btnFeedback");
        },
        async openFloatingActionButton() {
            await clickOnButton("btnFloatingActionButton");
        },
        async openProgressBar() {
            await clickOnButton("btnProgressBar");
        },
        async openProgressCircle() {
            await clickOnButton("btnProgressCircle");
        },
        async openVideoPlayer() {
            await clickOnButton("btnVideoPlayer");
        },
        async openWebView() {
            await clickOnButton("btnWebView");
        },
        async openIntroScreen() {
            await clickOnButton("btnIntroScreen");
        },
        async openSafeAreaView() {
            await clickOnButton("btnSafeAreaView");
        },
        async openRating() {
            await clickOnButton("btnRating");
        },
        async openToggleButtons() {
            await clickOnButton("btnToggleButtons");
        },
        async openListViewSwipe() {
            await clickOnButton("btnListViewSwipe");
        },
        async openJSActions() {
            await clickOnButton("bottomBarItem$Actions");
        },
        async openNanoflowCommons() {
            await clickOnButton("bottomBarItem$Commons");
        },
        async openCarousel() {
            await clickOnButton("btnCarousel");
        },
        async openBackgroundImage(imagesPage?: "static" | "staticSvg" | "dynamic") {
            await clickOnButton("btnBackgroundImage");
            switch (imagesPage) {
                case "static":
                    await clickOnButton("btnStaticImages");
                    break;
                case "staticSvg":
                    await clickOnButton("btnStaticSvgImages");
                    break;
                case "dynamic":
                    await clickOnButton("btnDynamicImages");
                    break;
            }
        }
    };
}
