import { BasePage } from "./base.page";

class XpathPage extends BasePage {
    getGrid(gridNumber: number): WebdriverIO.Element {
        return $(`.mx-name-grid${gridNumber}`);
    }

    getGridRow(rowNumber: number): WebdriverIO.Element {
        return $(`.mx-name-index-${rowNumber}`);
    }

    open(): void {
        browser.url("/p/MarkerMicroflow");
    }
}

const xpathPage = new XpathPage();
export default xpathPage;
