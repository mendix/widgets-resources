class HomePage {
    public get canvas() {
        return browser.element(".mx-name-dataView1 .widget-Signature.signature-unset canvas");
    }

    public get Signature() {
        return browser.element(".mx-name-dataView1 .widget-Signature.signature-set img");
    }

    public get button() {
        return browser.element(".mx-name-dataView1 .widget-Signature.signature-set button");
    }

    public open(): void {
        browser.url("/");
    }
}

const page = new HomePage();

export default page;
