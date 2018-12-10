class GridPage {

    public get youtube() { return browser.element(".widget-video-player.widget-video-player-container.mx-name-videoPlayer1.size-box iframe"); }

    public get vimeo() { return browser.element(".widget-video-player.widget-video-player-container.mx-name-videoPlayer2.size-box iframe"); }

    public open(): void {
        browser.url("/p/grid");
    }
}
const gridPage = new GridPage();
export default gridPage;
