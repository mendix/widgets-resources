import { by, element } from "detox";

export function IntroScreen(testID: string, matcher = by.type("RCTModalHostView")) {
    return {
        getIntroScreen() {
            return element(matcher); //RCTModalView
        },
        getButtonPrevious() {
            return element(by.id(`${testID}$buttonPrevious`).withAncestor(matcher));
        },
        getButtonNext() {
            return element(by.id(`${testID}$buttonNext`).withAncestor(matcher));
        },
        getButtonSkip() {
            return element(by.id(`${testID}$buttonSkip`).withAncestor(matcher));
        },
        getButtonDone() {
            return element(by.id(`${testID}$buttonDone`).withAncestor(matcher));
        },
        getDot(index: number) {
            return element(by.id(`${testID}$dot${index}`).withAncestor(matcher));
        },
        getPaginationText() {
            return element(by.id(`${testID}$paginationText`).withAncestor(matcher));
        }
    };
}
