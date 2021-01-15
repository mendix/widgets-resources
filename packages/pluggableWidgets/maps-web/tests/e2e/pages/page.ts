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
        $(name).waitForDisplayed({ timeout: 5000 });
        return $$(name);
    }

    getWidget(widgetName: string): WebdriverIO.Element {
        return this.getElement(`.mx-name-${widgetName}`);
    }

    getWidgets(widgetName: string): WebdriverIO.Element[] {
        return this.getElements(`.mx-name-${widgetName}`);
    }

    waitTitleToBeDisplayed(): boolean {
        return this.getWidget("pageTitle1").waitForDisplayed();
    }

    get title(): string {
        return this.getWidget("pageTitle1").getText();
    }

    get input(): WebdriverIO.Element {
        const inputWidget = this.getWidget("dataInput");
        const inputElement = inputWidget.$("input");
        inputElement.waitForDisplayed();
        return inputElement;
    }

    tab(index: number): WebdriverIO.Element {
        return this.getWidget(`tabPage${index}`);
    }

    wait(ms: number): void {
        browser.pause(ms);
    }
}

const page = new Page();
export default page;
