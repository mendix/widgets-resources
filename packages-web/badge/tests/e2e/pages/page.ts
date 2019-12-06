class Page {
    open(url = ""): void {
        browser.url("/" + url);
    }

    getElement(name: string): WebdriverIO.Element {
        const element = $(name);
        element.waitForDisplayed();
        return element;
    }

    getElements(name: string): WebdriverIO.Element[] {
        $(name).waitForDisplayed();
        const elements = $$(name);
        return elements;
    }

    getWidget(widgetName: string): WebdriverIO.Element {
        return this.getElement(`.mx-name-${widgetName}`);
    }

    getWidgets(widgetName: string): WebdriverIO.Element[] {
        return this.getElements(`.mx-name-${widgetName}`);
    }

    public get input() {
        const inputWidget = this.getWidget("dataInput");
        const inputElement = inputWidget.$("input");
        inputElement.waitForDisplayed();
        return inputElement;
    }

    get header(): string {
        return this.getWidget("pageTitle1").getText();
    }
}

const page = new Page();
export default page;

// public get badgeSuccess() {
//     return this.getWidget("badgeStaticSuccess");
// }
//
// public get badgeInfo() {
//     return this.getWidget("badgeInfo");
// }
// public get badgeDefault() {
//     return this.getWidget("badgeDefault");
// }
// public get badgeInverse() {
//     return this.getWidget("badgeInverse");
// }
// public get badgeWarning() {
//     return this.getWidget("badgeWarning");
// }
//
// public get badgeDanger() {
//     return this.getWidget("badgeDanger");
// }
//
// public get labelSuccess() {
//     return this.getWidget("labelStaticSuccess");
// }
//
// public get labelInfo() {
//     return this.getWidget("labelInfo");
// }
// public get labelDefault() {
//     return this.getWidget("labelDefault");
// }
// public get labelInverse() {
//     return this.getWidget("labelInverse");
// }
// public get labelWarning() {
//     return this.getWidget("labelWarning");
// }
//
// public get labelDanger() {
//     return this.getWidget("labelDanger");
