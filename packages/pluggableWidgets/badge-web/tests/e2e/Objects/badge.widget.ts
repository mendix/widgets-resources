import page from "../../../../../../configs/e2e/src/pages/page";

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
    DefaultBackground: "#dddddd",
    PrimaryBackground: "#0595db",
    SuccessBackground: "#76ca02",
    InfoBackground: "#48b0f7",
    WarningBackground: "#f99b1d",
    DangerBackground: "#ed1c24",
    InverseBackground: "#252c36"
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
        return this.element.getCSSProperty("background-color").parsed.hex;
    }
}

export default BadgeWidget;
