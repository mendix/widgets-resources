import page from "../../../../../configs/e2e/src/pages/page";

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
    DefaultBackground: "rgba(221,221,221,1)",
    PrimaryBackground: "rgba(5,149,219,1)",
    SuccessBackground: "rgba(118,202,2,1)",
    InfoBackground: "rgba(72,176,247,1)",
    WarningBackground: "rgba(249,155,29,1)",
    DangerBackground: "rgba(237,28,36,1)",
    InverseBackground: "rgba(37,44,54,1)"
};

class BadgeWidget {
    name: string;
    element: WebdriverIO.Element;
    defaultStyles: DefaultStyle;

    constructor(name: string) {
        this.name = name;
        this.element = page.getWidget(this.name);
        this.defaultStyles = DefaultStyles;
    }

    getAllBadges(): any {
        return page.getWidgets(this.name);
    }

    getText(): string {
        const BadgeTextElement = this.element;
        return BadgeTextElement.getText();
    }

    getBadgeText(): string {
        const BadgeTextElement = this.element;
        return BadgeTextElement.getText();
    }

    getColors(): any {
        return this.element.getCSSProperty("background-color").value;
    }
}

export default BadgeWidget;
