import { Client, Element, RawResult } from "webdriverio";

// browser typings are declared globally
class HomePage {
    private modalWindow: Client<RawResult<Element>> & RawResult<Element>;
    public get usernameInput() {
        return browser.element("#usernameInput");
    }

    public get passwordInput() {
        return browser.element("#passwordInput");
    }

    public get loginButton() {
        return browser.element("#loginButton");
    }

    public get rateMeButton() {
        return browser.element(".mx-name-actionButton1");
    }

    public get rateMePage() {
        this.modalWindow = browser.element("div.modal-content.mx-window-content");
        return this.modalWindow;
    }

    public rateOnPosition(position: number) {
        return browser.element(`div.modal-content.mx-window-content .widget-star-rating > span >` +
            `span:nth-child(${ position })`);
    }

    public emptyStarOnPosition(position: number) {
        return browser.element(`div.modal-content.mx-window-content .widget-star-rating > span >` +
        `span:nth-child(${ position }) > span:nth-child(1)`);
    }

    // when the fullStar width is 0%, then empty star is still visible and that star is not rated.
    public fullStarOnPosition(position: number) {
        return browser.element(`div.modal-content.mx-window-content .widget-star-rating > span >` +
            `span:nth-child(${ position }) > span:nth-child(2)`);
    }

    public open(): void {
        browser.url("/");
    }
}
const page = new HomePage();
export default page;
