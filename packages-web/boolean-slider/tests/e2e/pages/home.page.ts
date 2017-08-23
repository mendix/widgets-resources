class HomePage {
    public get radioButton() { return browser.element(".mx-name-radioButtons5"); }
    public get switch1() { return browser.element(".mx-name-switch1"); }
    public get switch2() { return browser.element(".mx-name-switch2"); }
    public get switch3() { return browser.element(".mx-name-switch3"); }
    public get popupWindow() { return browser.element(".mx-name-text1"); }
    public get switch1Value() {
        return browser.element(".widget-switch-btn-wrapper");
    }

    public open(): void {
        browser.url("/");
    }
}
const page = new HomePage();
export default page;
