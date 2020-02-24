class Page {
    open(url = ""): void {
        browser.url("/" + url);
    }

    existing(selector: string): boolean {
        return $(selector).isExisting();
    }
    getElement(selector: string): WebdriverIO.Element {
        const element = $(selector);
        element.waitForDisplayed();
        return element;
    }

    getElements(selector: string): WebdriverIO.Element[] {
        $(selector).waitForDisplayed();
        const elements = $$(selector);
        return elements;
    }

    getWidget(widgetName: string): WebdriverIO.Element {
        return this.getElement(`.mx-name-${widgetName}`);
    }

    getWidgets(widgetName: string): WebdriverIO.Element[] {
        return this.getElements(`.mx-name-${widgetName}`);
    }

    get headerElement(): WebdriverIO.Element {
        return this.getWidget("pageTitle1");
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
