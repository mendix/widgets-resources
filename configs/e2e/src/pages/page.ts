class Page {
    open(url = ""): void {
        browser.url("/" + url);
    }

    getElement(name: string): WebdriverIO.Element {
        return $(name);
    }

    waitForElement(name: string): WebdriverIO.Element {
        const element = $(name);
        element.waitForDisplayed();
        return element;
    }

    waitForElements(name: string): WebdriverIO.Element[] {
        $(name).waitForDisplayed();
        const elements = $$(name);
        return elements;
    }

    getWidget(widgetName: string): WebdriverIO.Element {
        return this.waitForElement(`.mx-name-${widgetName}`);
    }

    getWidgets(widgetName: string): WebdriverIO.Element[] {
        return this.waitForElements(`.mx-name-${widgetName}`);
    }

    get header(): string {
        return this.getWidget("pageTitle1").getText();
    }

    get modalDialog(): WebdriverIO.Element {
        return $(".modal-dialog");
    }

    get modalDialogHeader(): WebdriverIO.Element {
        return this.modalDialog.$("#mxui_widget_Window_0_caption");
    }
}

export default new Page();
