import { by, element } from "detox";
export function Badge(testID: string, matcher = by.id(testID)) {
    return {
        getBadge() {
            return element(matcher);
        },
        getCaption() {
            return element(by.id(`${testID}$caption`).withAncestor(matcher));
        }
    };
}
