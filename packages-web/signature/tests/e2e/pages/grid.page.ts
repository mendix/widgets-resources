/* eslint-disable */
class GridPage {
    public get signatureGrid() {
        return $(".widget-signature-grid");
    }

    public open(): void {
        browser.url("/p/GridSize");
    }
}

const page = new GridPage();

export default page;
