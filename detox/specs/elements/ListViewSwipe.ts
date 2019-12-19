import { by, element } from "detox";

export function ListViewSwipe(testID: string, matcher = by.id(testID)) {
    return {
        getListViewSwipe() {
            return element(matcher);
        },
        getLeftAction() {
            return element(by.id(`${testID}$leftAction`));
        },
        getLeftButtons() {
            return element(by.id(`${testID}$leftButtons`));
        },
        getRightAction() {
            return element(by.id(`${testID}$rightAction`));
        },
        getRightButtons() {
            return element(by.id(`${testID}$rightButtons`));
        }
    };
}
