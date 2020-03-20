import { by, element } from "detox";

export function BackgroundImage(testID: string, matcher = by.id(testID)) {
    return {
        getbackgroundImage(): Detox.Element {
            return element(matcher);
        },
        getImage(): Detox.Element {
            return element(by.id(`${testID}$image`).withAncestor(matcher));
        }
    };
}
