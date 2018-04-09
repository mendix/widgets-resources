class HomePage {
    public get canvases() { return browser.elements(".signature-unset canvas"); }
    public get canvas() { return browser.element(".signature-unset canvas"); }
    public get saveButton() { return browser.element(".signature-unset button.btn.btn-primary"); }
    public get dialogBox() { return browser.element(".mx-dialog-content"); }
    public get resetButton() { return browser.element(".signature-unset button.btn.btn-default"); }

    public open(): void {
        browser.url("/");
    }
}

const page = new HomePage();

export default page;
