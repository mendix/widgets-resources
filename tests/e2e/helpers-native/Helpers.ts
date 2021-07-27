import { by, element } from "detox";
export function Widget(testID: string, matcher = by.id(testID)) {
    return {
        getElement() {
            return element(matcher);
        },
        getCaption() {
            return element(by.id(`${testID}$caption`).withAncestor(matcher));
        }
    };
}
