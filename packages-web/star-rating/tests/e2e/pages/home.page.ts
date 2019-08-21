// browser typings are declared globally
class HomePage {
    private modalWindow: WebdriverIO.Element;
    get usernameInput() {
        return $("#usernameInput");
    }

    get passwordInput() {
        return $("#passwordInput");
    }

    get loginButton() {
        return $("#loginButton");
    }

    get rateMeButton() {
        return $(".mx-name-actionButton1");
    }

    get rateMePage() {
        this.modalWindow = $("div.modal-content.mx-window-content");
        return this.modalWindow;
    }

    rateOnPosition(position: number) {
        return $("div.modal-content.mx-window-content .widget-star-rating > span >" + `span:nth-child(${position})`);
    }

    emptyStarOnPosition(position: number) {
        return $(
            "div.modal-content.mx-window-content .widget-star-rating > span >" +
                `span:nth-child(${position}) > span:nth-child(1)`
        );
    }

    // when the fullStar width is 0%, then empty star is still visible and that star is not rated.
    fullStarOnPosition(position: number) {
        return $(
            "div.modal-content.mx-window-content .widget-star-rating > span >" +
                `span:nth-child(${position}) > span:nth-child(2)`
        );
    }

    open(): void {
        browser.url("/");
    }
}
const page = new HomePage();
export default page;
