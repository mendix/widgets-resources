import { Client, Element, RawResult } from "webdriverio";

import { BasePage } from "./base.page";

class XpathPage extends BasePage {

    public getGrid(gridNumber: number): Client<RawResult<Element>> & RawResult<Element> {
        return browser.element(`.mx-name-grid${gridNumber}`);
    }

    public getGridRow(rowNumber: number): Client<RawResult<Element>> & RawResult<Element> {
        return browser.element(`.mx-name-index-${rowNumber}`);
    }

    public open(): void {
        browser.url("/p/MarkerMicroflow");
    }
}

const xpathPage = new XpathPage();
export default xpathPage;
