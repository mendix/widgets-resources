import { by, element, device } from "detox";

export function Alert() {
    const type =
        device.getPlatform() === "ios" ? "_UIAlertControllerView" : "com.android.internal.widget.AlertDialogLayout";
    const wrapperMatcher = by.type(type);
    return {
        getAlert() {
            return element(wrapperMatcher);
        },
        getMessage(text: string) {
            return element(by.text(text).withAncestor(wrapperMatcher));
        },
        async confirm() {
            await element(by.text("OK").withAncestor(wrapperMatcher)).tap();
        }
    };
}
