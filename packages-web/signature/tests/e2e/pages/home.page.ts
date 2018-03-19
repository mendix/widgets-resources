class HomePage {
    public get canvas() {
        return browser.element(".mx-name-dataView1 .widget-Signature.signature-unset canvas");
    }

    public open(): void {
        browser.url("/");
    }
}

const page = new HomePage();

export default page;
