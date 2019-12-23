import { by, device, element } from "detox";
export function ProgressCircle(testID: string, matcher = by.id(testID)) {
    const textType = device.getPlatform() === "ios" ? "RCTTextView" : "com.android.internal.widget.Text";
    return {
        getProgressCircle() {
            return element(matcher);
        },
        getText() {
            return element(by.type(textType).withAncestor(matcher));
        }
    };
}
