class HomePage {
    private modalWindow: WebdriverIO.Element;
    get usernameInput(): WebdriverIO.Element {
        return $("#usernameInput");
    }

    get passwordInput(): WebdriverIO.Element {
        return $("#passwordInput");
    }

    get loginButton(): WebdriverIO.Element {
        return $("#loginButton");
    }

    get rateMeButton(): WebdriverIO.Element {
        return $(".mx-name-actionButton1");
    }

    get rateMePage(): WebdriverIO.Element {
        this.modalWindow = $("div.modal-content.mx-window-content");
        return this.modalWindow;
    }

    rateOnPosition(position: number): WebdriverIO.Element {
        return $("div.modal-content.mx-window-content .widget-star-rating > span >" + `span:nth-child(${position})`);
    }

    emptyStarOnPosition(position: number): WebdriverIO.Element {
        return $(
            "div.modal-content.mx-window-content .widget-star-rating > span >" +
                `span:nth-child(${position}) > span:nth-child(1)`
        );
    }

    // when the fullStar width is 0%, then empty star is still visible and that star is not rated.
    fullStarOnPosition(position: number): WebdriverIO.Element {
        return $(
            "div.modal-content.mx-window-content .widget-star-rating > span >" +
                `span:nth-child(${position}) > span:nth-child(2)`
        );
    }

    open(): void {
        browser.url("");
    }
}
const page = new HomePage();
export default page;
