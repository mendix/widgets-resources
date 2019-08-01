class GridPage {
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    public get youtube(){
        return $(".widget-video-player.widget-video-player-container.mx-name-videoPlayer1.size-box iframe");
    }

    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    public get vimeo(){
        return $(".widget-video-player.widget-video-player-container.mx-name-videoPlayer2.size-box iframe");
    }

    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    public open(): void {
        browser.url("/p/grid");
    }
}
const gridPage = new GridPage();
export default gridPage;
