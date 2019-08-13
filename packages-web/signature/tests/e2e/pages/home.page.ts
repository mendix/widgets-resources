/* eslint-disable */
class HomePage {
    public get canvas() {
        return $(".widget-signature-canvas");
    }

    public open(): void {
        browser.url("/");
    }
}

const page = new HomePage();

export default page;
