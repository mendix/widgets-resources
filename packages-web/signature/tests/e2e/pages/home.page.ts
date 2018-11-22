class HomePage {
    public get canvas() { return browser.element(".widget-signature-canvas"); }

    public open(): void {
        browser.url("/");
    }
}

const page = new HomePage();

export default page;
