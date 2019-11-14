/* eslint-disable */
class Page {
    open(url = ""): void {
        browser.url("/" + url);
    }

    public getElement(name: string): WebdriverIO.Element {
        const element = $(name);
        element.waitForDisplayed();
        return element;
    }

    public getElements(name: string): WebdriverIO.Element[] {
        $(name).waitForDisplayed();
        const elements = $$(name);
        return elements;
    }

    public getWidget(widgetName: string): WebdriverIO.Element {
        return this.getElement(`.mx-name-${widgetName}`);
    }

    public getWidgets(widgetName: string): WebdriverIO.Element[] {
        return this.getElements(`.mx-name-${widgetName}`);
    }

    public get header(): string {
        return this.getWidget("pageTitle1").getText();
    }
}

const page = new Page();
export default page;
