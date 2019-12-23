import { by, element } from "detox";

export function ListViewSwipe(testID: string, listViewTestID: string, matcher = by.id(testID)) {
    return {
        getListViewSwipe(index: 0) {
            return element(matcher.withAncestor(by.id(`${listViewTestID}$item${index}`)));
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
