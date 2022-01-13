class Page {
    get url(): Promise<string> {
        return browser.getUrl();
    }

    async open(url = ""): Promise<void> {
        await browser.url("/" + url);
    }

    getElement(selector: string, parent?: WebdriverIO.Element): Promise<WebdriverIO.Element> {
        return parent ? parent.$(selector) : $(selector);
    }

    getElements(selector: string, parent?: WebdriverIO.Element): Promise<WebdriverIO.ElementArray> {
        return parent ? parent.$$(selector) : $$(selector);
    }

    async existing(selector: string): Promise<boolean> {
        return (await this.getElement(selector)).isExisting();
    }

    async waitForElement(selector: string, parent?: WebdriverIO.Element): Promise<WebdriverIO.Element> {
        const element = await this.getElement(selector, parent);
        await element.waitForDisplayed();
        return element;
    }

    async waitForElements(selector: string, parent?: WebdriverIO.Element): Promise<WebdriverIO.Element[]> {
        await (await this.getElement(selector, parent)).waitForDisplayed();
        return this.getElements(selector, parent);
    }

    getWidget(widgetName: string): Promise<WebdriverIO.Element> {
        return this.waitForElement(`.mx-name-${widgetName}`);
    }

    getWidgets(widgetName: string): Promise<WebdriverIO.Element[]> {
        return this.waitForElements(`.mx-name-${widgetName}`);
    }

    async headerElement(pageTitle = "pageTitle1"): Promise<WebdriverIO.Element> {
        const title = await this.getWidget(pageTitle);
        await title.waitForDisplayed();
        return title;
    }

    async header(pageTitle = "pageTitle1"): Promise<string> {
        return (await this.headerElement(pageTitle)).getText();
    }

    get modalDialog(): Promise<WebdriverIO.Element> {
        return $(".modal-dialog");
    }

    async getModalDialogHeader(): Promise<WebdriverIO.Element> {
        return (await this.modalDialog).$("#mxui_widget_Window_0_caption");
    }
}

export default new Page();
