class ValidateConfigs {
    public get validationFeedback() { return browser.element(".widget-Signature.signature-unset .alert-danger"); }

    public get canvas() {
        return browser.element(".widget-Signature.signature-unset canvas");
    }
    public get renderSave() {
        return browser.element(".widget-Signature.signature-unset .btn-primary");
    }

    public open(): void {
        browser.url("/p/validateConfigs");
    }
}

const configsPage = new ValidateConfigs();

export default configsPage;
