/* eslint-disable */
class HomePage {
    public get badge() {
        return $("#mxui_widget_ReactCustomWidgetWrapper_4");
    }

    public get badgeSuccess() {
        return $(".mx-name-badge6");
    }

    public get badgeDanger() {
        return $("#mxui_widget_ReactCustomWidgetWrapper_8");
    }

    public get labelSuccess() {
        return $("#mxui_widget_ReactCustomWidgetWrapper_3");
    }

    public get labelDanger() {
        return $("#mxui_widget_ReactCustomWidgetWrapper_9");
    }

    public get input() {
        return $("#mxui_widget_TextInput_0_input");
    }

    public get label() {
        return $("#mxui_widget_ReactCustomWidgetWrapper_1");
    }

    public get saveButton() {
        return $("##mxui_widget_ActionButton_0");
    }

    public open(): void {
        browser.url("/");
    }
}

const homepage = new HomePage();
export default homepage;
