class HomePage {
    public get radioButton() { return browser.element(".mx-name-radioButtons6"); }
    public get switch1() { return browser.element(".mx-name-switch1"); }
    public get switch2() {
        return browser.element(".mx-name-switch2");
    }
    public get switch3() { return browser.element(".mx-name-switch4"); }
    public get popupWindow() { return browser.element(".mx-name-text1"); }
    public get radioInput() { return browser.element(".mx-name-radioButtons6 input"); }
    public get switchValue() {
        return browser.element(".widget-switch-btn-wrapper-default.checked");
    }

    public open(): void {
        browser.url("/");
    }
}
const page = new HomePage();
export default page;
