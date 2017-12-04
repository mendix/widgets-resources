class HomePage {
    public get textArea() {
        return browser.element("#mxui_widget_DataView_1 > div > div.form-group.mx-name-textArea1 > div > textarea");
    }
    public get imageViewer() {
        // tslint:disable-next-line:max-line-length
        return browser.element("#mxui_widget_DataView_1 > div > div.widget-image-viewer.widget-image-viewer-responsive.mx-name-imageViewer1");
    }
    public get imageViewer1() {
        // tslint:disable-next-line:max-line-length
        return browser.element("#mxui_widget_DataView_0 > div > div.widget-image-viewer.widget-image-viewer-responsive.mx-name-imageViewer1.hidden");
    }

    public openDynamicUrl(): void {
        browser.url("/p/dynamicUrl");
    }
    public openEmptyUrl(): void {
        browser.url("/p/emptyUrl");
    }
}

const defaultPage = new HomePage();

export default defaultPage;
