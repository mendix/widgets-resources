class ErrorPage {
    get noContent(): WebdriverIO.Element {
        return $(".widget-video-player.widget-video-player-container.mx-name-videoPlayerNoContent.size-box video");
    }

    open(): void {
        browser.url("/p/errors");
    }
}
const errorPage = new ErrorPage();
export default errorPage;
