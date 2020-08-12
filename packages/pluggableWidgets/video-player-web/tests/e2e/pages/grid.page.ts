class GridPage {
    get youtube(): WebdriverIO.Element {
        return $(".widget-video-player.widget-video-player-container.mx-name-videoPlayer1.size-box iframe");
    }

    get vimeo(): WebdriverIO.Element {
        return $(".widget-video-player.widget-video-player-container.mx-name-videoPlayer2.size-box iframe");
    }

    open(): void {
        browser.url("/p/grid");
    }
}
const gridPage = new GridPage();
export default gridPage;
