class HomePage {
    public get progressText() {
        return browser.element(".progressbar-text");
    }

    public open(): void {
        browser.url("/p/Home");
    }
}
const homePage = new HomePage();
export default homePage;
