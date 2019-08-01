class ErrorPage {
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility,@typescript-eslint/explicit-function-return-type
    public get noContent() {
        return $(".widget-video-player.widget-video-player-container.mx-name-videoPlayerNoContent.size-box video");
    }

    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    public open(): void {
        browser.url("/p/errors");
    }
}
const errorPage = new ErrorPage();
export default errorPage;
