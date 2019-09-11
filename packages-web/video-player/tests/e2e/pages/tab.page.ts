class TabPage {
    get youtube(): WebdriverIO.Element {
        return $(".widget-video-player.widget-video-player-container.mx-name-videoPlayer1.size-box iframe");
    }

    get vimeo(): WebdriverIO.Element {
        return $(".widget-video-player.widget-video-player-container.mx-name-videoPlayer5.size-box iframe");
    }

    get html5(): WebdriverIO.Element {
        return $(".widget-video-player.widget-video-player-container.mx-name-videoPlayer3.size-box video");
    }

    get dailymotion(): WebdriverIO.Element {
        return $(".widget-video-player.widget-video-player-container.mx-name-videoPlayer4.size-box iframe");
    }

    get youtubeTab(): WebdriverIO.Element {
        return $(".mx-name-tabPage1");
    }

    get vimeoTab(): WebdriverIO.Element {
        return $(".mx-name-tabPage5");
    }

    get html5Tab(): WebdriverIO.Element {
        return $(".mx-name-tabPage3");
    }

    get dailymotionTab(): WebdriverIO.Element {
        return $(".mx-name-tabPage4");
    }

    open(): void {
        browser.url("/p/tabs");
    }
}
const tabPage = new TabPage();
export default tabPage;
