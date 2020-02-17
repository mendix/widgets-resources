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

const page = new Page();
export default page;
