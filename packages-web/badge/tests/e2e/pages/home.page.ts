class HomePage {

    public get badge() { return browser.element("#mxui_widget_ReactCustomWidgetWrapper_4"); }

    public get badgeSuccess() { return browser.element(".mx-name-badge6"); }

    public get badgeDanger() { return browser.element("#mxui_widget_ReactCustomWidgetWrapper_8"); }

    public get labelSuccess() { return browser.element("#mxui_widget_ReactCustomWidgetWrapper_3"); }

    public get labelDanger() { return browser.element("#mxui_widget_ReactCustomWidgetWrapper_9"); }

    public get input() { return browser.element("#mxui_widget_TextInput_0_input"); }

    public get label() { return browser.element("#mxui_widget_ReactCustomWidgetWrapper_1"); }

    public get saveButton() { return browser.element("##mxui_widget_ActionButton_0"); }

    public open(): void {
        browser.url("/");
    }
}
const homepage = new HomePage();
export default homepage;
