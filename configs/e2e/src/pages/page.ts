class Page {
    get url(): string {
        return browser.getUrl();
    }

    open(url = ""): void {
        browser.url("/" + url);
    }

    getElement(selector: string, parent?: WebdriverIO.Element): WebdriverIO.Element {
        return parent ? parent.$(selector) : $(selector);
    }

    getElements(selector: string, parent?: WebdriverIO.Element): WebdriverIO.ElementArray {
        return parent ? parent.$$(selector) : $$(selector);
    }

    existing(selector: string): boolean {
        return this.getElement(selector).isExisting();
    }

    waitForElement(selector: string, parent?: WebdriverIO.Element): WebdriverIO.Element {
        const element = this.getElement(selector, parent);
        element.waitForDisplayed();
        return element;
    }

    waitForElements(selector: string, parent?: WebdriverIO.Element): WebdriverIO.Element[] {
        this.getElement(selector, parent).waitForDisplayed();
        return this.getElements(selector, parent);
    }

    getWidget(widgetName: string): WebdriverIO.Element {
        return this.waitForElement(`.mx-name-${widgetName}`);
    }

    getWidgets(widgetName: string): WebdriverIO.Element[] {
        return this.waitForElements(`.mx-name-${widgetName}`);
    }

    headerElement(pageTitle = "pageTitle1"): WebdriverIO.Element {
        const title = this.getWidget(pageTitle);
        title.waitForDisplayed();
        return title;
    }

    header(pageTitle = "pageTitle1"): string {
        return this.headerElement(pageTitle).getText();
    }

    get modalDialog(): WebdriverIO.Element {
        return $(".modal-dialog");
    }

    get modalDialogHeader(): WebdriverIO.Element {
        return this.modalDialog.$("#mxui_widget_Window_0_caption");
    }
}

export default new Page();
