class HomePage {
    get progressText(): WebdriverIO.Element {
        return $(".progressbar-text");
    }

    open(): void {
        browser.url("/p/Home");
    }
}
const homePage = new HomePage();
export default homePage;
