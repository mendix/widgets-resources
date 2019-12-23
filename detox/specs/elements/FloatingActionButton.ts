import { by, element } from "detox";
export function FloatingActionButton(testID: string, matcher = by.id(testID)) {
    return {
        getMainButton() {
            return element(matcher);
        },
        getFloatingButton(index: number) {
            return element(by.id(`${testID}$button${index}`));
        }
    };
}
