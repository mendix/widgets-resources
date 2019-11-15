import page from "../pages/page";

interface DefaultStyle {
    DefaultBackground: string;
    PrimaryBackground: string;
    SuccessBackground: string;
    InfoBackground: string;
    InverseBackground: string;
}

const DefaultStyles: DefaultStyle = {
    DefaultBackground: "rgba(255,255,255,1)",
    PrimaryBackground: "rgba(5,149,219,1)",
    SuccessBackground: "rgba(118,202,2,1)",
    InfoBackground: "rgba(72,176,247,1)",
    InverseBackground: "rgba(37,44,54,1)"
};

class BadgeButtonWidget {
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
        const BadgeButtonTextElement = this.element.$(".widget-badge-button-text");
        return BadgeButtonTextElement.getText();
    }

    getBadgeText(): string {
        const BadgeTextElement = this.element.$(".badge");
        return BadgeTextElement.getText();
    }

    getColors(): any {
        return this.element.getCSSProperty("background-color").value;
    }
}

export default BadgeButtonWidget;
