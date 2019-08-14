class HomePage {
    get textArea(): WebdriverIO.Element {
        return $("#mxui_widget_DataView_1 > div > div.form-group.mx-name-textArea1 > div > textarea");
    }
    get imageViewer(): WebdriverIO.Element {
        return $(
            "#mxui_widget_DataView_1 > div > div.widget-image-viewer.widget-image-viewer-responsive.mx-name-imageViewer1"
        );
    }
    get imageViewer1(): WebdriverIO.Element {
        return $(
            "#mxui_widget_DataView_0 > div > div.widget-image-viewer.widget-image-viewer-responsive.mx-name-imageViewer1.hidden"
        );
    }

    openDynamicUrl(): void {
        browser.url("/p/dynamicUrl");
    }
    openEmptyUrl(): void {
        browser.url("/p/emptyUrl");
    }
}

const defaultPage = new HomePage();

export default defaultPage;
