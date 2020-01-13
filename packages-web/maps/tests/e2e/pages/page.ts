export class Page {
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

    get input(): WebdriverIO.Element {
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
