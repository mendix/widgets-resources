class TabPage {
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility,@typescript-eslint/explicit-function-return-type
    public get youtube() {
        return $(".widget-video-player.widget-video-player-container.mx-name-videoPlayer1.size-box iframe");
    }

    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility,@typescript-eslint/explicit-function-return-type
    public get vimeo() {
        return $(".widget-video-player.widget-video-player-container.mx-name-videoPlayer5.size-box iframe");
    }

    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility,@typescript-eslint/explicit-function-return-type
    public get html5() {
        return $(".widget-video-player.widget-video-player-container.mx-name-videoPlayer3.size-box video");
    }

    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility,@typescript-eslint/explicit-function-return-type
    public get dailymotion() {
        return $(".widget-video-player.widget-video-player-container.mx-name-videoPlayer4.size-box iframe");
    }

    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility,@typescript-eslint/explicit-function-return-type
    public get youtubeTab() {
        return $(".mx-name-tabPage1");
    }

    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility,@typescript-eslint/explicit-function-return-type
    public get vimeoTab() {
        return $(".mx-name-tabPage5");
    }

    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility,@typescript-eslint/explicit-function-return-type
    public get html5Tab() {
        return $(".mx-name-tabPage3");
    }

    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility,@typescript-eslint/explicit-function-return-type
    public get dailymotionTab() {
        return $(".mx-name-tabPage4");
    }

    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    public open(): void {
        browser.url("/p/tabs");
    }
}
const tabPage = new TabPage();
export default tabPage;
