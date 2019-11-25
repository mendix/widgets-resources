import page from "../pages/page";

interface DefaultStyle {
    DefaultBackground: string;
    PrimaryBackground: string;
    SuccessBackground: string;
    InfoBackground: string;
    WarningBackground: string;
    DangerBackground: string;
    InverseBackground: string;
}

const DefaultStyles: DefaultStyle = {
    DefaultBackground: "rgba(255,255,255,1)",
    PrimaryBackground: "rgba(5,149,219,1)",
    SuccessBackground: "rgba(118,202,2,1)",
    InfoBackground: "rgba(72,176,247,1)",
    WarningBackground: "rgba(249,155,29,1)",
    DangerBackground: "rgba(237,28,36,1)",
    InverseBackground: "rgba(37,44,54,1)"
};

export default class ProgressBarWidget {
    name: string;
    element: WebdriverIO.Element;
    defaultStyles: DefaultStyle;

    constructor(name) {
        this.name = name;
        this.element = page.getWidget(this.name);
        this.defaultStyles = DefaultStyles;
    }

    getAllBadges(): any {
        return page.getWidgets(this.name);
    }

    getText(): string {
        const ProgressBarTextElement = this.element.$(".progress-bar");
        return ProgressBarTextElement.getText();
    }

    getInnerBar(): WebdriverIO.Element {
        return this.element.$(".progress-bar");
    }

    getColors(): any {
        return this.getInnerBar().getCSSProperty("background-color").value;
    }
}
