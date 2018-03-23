class HomePage {
    public get canvas() {
        return browser.element(".widget-Signature.signature-unset canvas");
    }

    public get renderSave() {
        return browser.element(".widget-Signature.signature-unset .btn-primary");
    }

    public get resetButton() {
        return browser.element(".widget-Signature.signature-unset .btn-default");
    }

    public open(): void {
        browser.url("/");
    }
}

const page = new HomePage();

export default page;
