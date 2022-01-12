class Alert {
    private typeMatcher: Detox.NativeMatcher;
    private messageMatcher: Detox.NativeMatcher;
    private okButtonMatcher: Detox.NativeMatcher;

    constructor() {
        let rootMatcher: Detox.NativeMatcher;
        if (device.getPlatform() === "ios") {
            rootMatcher = by.type("_UIAlertControllerView");
            this.typeMatcher = rootMatcher.withDescendant(by.type(""));
            this.messageMatcher = rootMatcher.withDescendant(by.type(""));
        } else {
            rootMatcher = by.type("com.android.internal.widget.AlertDialogLayout");
            this.typeMatcher = rootMatcher.withDescendant(by.type("com.android.internal.widget.DialogTitle"));
            this.messageMatcher = rootMatcher.withDescendant(by.type("com.android.internal.widget.AppCompatTextView"));
        }
        this.okButtonMatcher = rootMatcher.withDescendant(by.text("OK"));
    }

    get typeElement(): Detox.IndexableNativeElement {
        return element(this.typeMatcher);
    }

    get messageElement(): Detox.IndexableNativeElement {
        return element(this.messageMatcher);
    }

    async confirm(): Promise<void> {
        await element(this.okButtonMatcher).tap();
    }
}

export const alert = new Alert();
