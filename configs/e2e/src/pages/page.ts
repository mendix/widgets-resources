class Page {
    open(url = ""): void {
        browser.url("/" + url);
    }

    getElement(selector: string): WebdriverIO.Element {
        return $(selector);
    }

    existing(selector: string): boolean {
        return this.getElement(selector).isExisting();
    }

    waitForElement(selector: string): WebdriverIO.Element {
        const element = this.getElement(selector);
        element.waitForDisplayed();
        return element;
    }

    waitForElements(selector: string): WebdriverIO.Element[] {
        this.getElement(selector).waitForDisplayed();
        const elements = $$(selector);
        return elements;
    }

    getWidget(widgetName: string): WebdriverIO.Element {
        return this.waitForElement(`.mx-name-${widgetName}`);
    }

    getWidgets(widgetName: string): WebdriverIO.Element[] {
        return this.waitForElements(`.mx-name-${widgetName}`);
    }

    headerElement(pageTitle = "pageTitle1"): WebdriverIO.Element {
        return this.getWidget(pageTitle);
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
