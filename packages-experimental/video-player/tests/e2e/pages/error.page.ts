class ErrorPage {

    public get noContent() { return browser.element(".video-player-container.mx-name-videoPlayerNoContent div.video-player-error"); }

    public open(): void {
        browser.url("/p/errors");
    }
}
const errorPage = new ErrorPage();
export default errorPage;
