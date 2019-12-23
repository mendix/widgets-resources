import { by, element } from "detox";
export function ActivityIndicator(testID: string, matcher = by.id(testID)) {
    return element(matcher);
}
