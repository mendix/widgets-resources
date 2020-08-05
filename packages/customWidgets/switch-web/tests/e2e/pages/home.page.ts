/* eslint-disable */
class HomePage {
    public get radioButton() {
        return $(".mx-name-radioButtons6 label");
    }
    public get switch1() {
        return $(".mx-name-switch1");
    }
    public get switch2() {
        return $(".mx-name-switch2");
    }
    public get switch3() {
        return $(".mx-name-switch3");
    }
    public get popup() {
        return $("#mxui_widget_Window_0");
    }
    public get switchValue() {
        return $(".widget-switch-btn-wrapper");
    }

    public open(): void {
        browser.url("/");
    }
}
const page = new HomePage();
export default page;
