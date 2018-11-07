class HomePage {
    public get canvases() { return browser.elements(".widget-signature-wrapper canvas"); }
    public get canvas() { return browser.element(".widget-signature-wrapper canvas.widget-Signature.signature-canvas"); }
    public get saveButton() { return browser.element(".mx-dataview .mx-dataview-controls .mx-button:last-child"); }
    public get dialogBox() { return browser.element(".mx-dialog-content"); }

    public open(): void {
        browser.url("/");
    }
}

const page = new HomePage();

export default page;
