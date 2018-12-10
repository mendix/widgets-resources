class TabPage {

    public get youtube() { return browser.element(".widget-video-player.widget-video-player-container.mx-name-videoPlayer1.size-box iframe"); }

    public get vimeo() { return browser.element(".widget-video-player.widget-video-player-container.mx-name-videoPlayer5.size-box iframe"); }

    public get html5() { return browser.element(".widget-video-player.widget-video-player-container.mx-name-videoPlayer3.size-box video"); }

    public get dailymotion() { return browser.element(".widget-video-player.widget-video-player-container.mx-name-videoPlayer4.size-box iframe"); }

    public get youtubeTab() {
        return browser.element(".mx-name-tabPage1");
    }

    public get vimeoTab() {
        return browser.element(".mx-name-tabPage5");
    }

    public get html5Tab() {
        return browser.element(".mx-name-tabPage3");
    }

    public get dailymotionTab() {
        return browser.element(".mx-name-tabPage4");
    }

    public open(): void {
        browser.url("/p/tabs");
    }
}
const tabPage = new TabPage();
export default tabPage;
