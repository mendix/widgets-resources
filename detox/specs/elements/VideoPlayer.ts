import { by, element } from "detox";
export function VideoPlayer(testID: string, matcher = by.id(testID)) {
    return element(matcher);
}
