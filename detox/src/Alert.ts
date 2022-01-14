import { by, element, device } from "detox";

export function Alert() {
    const iosRootMatcher = by.type("_UIAlertControllerView");
    const androidRootMatcher = by.type("com.android.internal.widget.AlertDialogLayout");
    const iosTextMatcher = by
        .type("UILabel")
        .withAncestor(by.type("_UIInterfaceActionGroupHeaderScrollView"))
        .withAncestor(iosRootMatcher);
    const iosOkButton = by
        .text("OK")
        .withAncestor(by.type("_UIAlertControllerActionView"))
        .withAncestor(iosRootMatcher);
    const androidTitleMatcher = by.type("com.android.internal.widget.DialogTitle").withAncestor(androidRootMatcher);
    const androidTextMatcher = by.type("androidx.appcompat.widget.AppCompatTextView").withAncestor(androidRootMatcher);
    const androidOkButton = by
        .text("OK")
        .withAncestor(by.type("com.android.internal.widget.ButtonBarLayout"))
        .withAncestor(androidRootMatcher);

    return {
        get typeElement(): Detox.NativeElement {
            if (device.getPlatform() === "ios") {
                return element(iosTextMatcher).atIndex(0);
            } else {
                return element(androidTitleMatcher).atIndex(0);
            }
        },

        get messageElement(): Detox.NativeElement {
            if (device.getPlatform() === "ios") {
                return element(iosTextMatcher).atIndex(1);
            } else {
                return element(androidTextMatcher).atIndex(0);
            }
        },

        async confirm(): Promise<void> {
            if (device.getPlatform() === "ios") {
                await element(iosOkButton).atIndex(0).tap();
            } else {
                await element(androidOkButton).atIndex(0).tap();
            }
        }
    };
}
