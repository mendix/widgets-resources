class ErrorPage {

    public get noContent() { return browser.element(".widget-video-player.widget-video-player-container.mx-name-videoPlayerNoContent.size-box video"); }

    public open(): void {
        browser.url("/p/errors");
    }
}
const errorPage = new ErrorPage();
export default errorPage;
