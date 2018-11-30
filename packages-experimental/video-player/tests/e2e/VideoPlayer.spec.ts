import gridpage from "./pages/grid.page";
import tabpage from "./pages/tab.page";
import errorpage from "./pages/error.page";

describe("Grid page", () => {
    it("should render youtube iframe", () => {
        gridpage.open();
        gridpage.youtube.waitForVisible();

        const youtubePlayer = gridpage.youtube.getHTML();
        expect(youtubePlayer).toContain("class=\"video-player-iframe\"");
        expect(youtubePlayer).toContain("src=\"https://www.youtube.com");
        expect(youtubePlayer).toContain("&amp;autoplay=1");
        expect(youtubePlayer).toContain("&amp;controls=0");
        expect(youtubePlayer).toContain("&amp;muted=0");
        expect(youtubePlayer).toContain("&amp;loop=0");
    });

    it("should render vimeo iframe", () => {
        gridpage.vimeo.waitForVisible();

        const youtubePlayer = gridpage.vimeo.getHTML();
        expect(youtubePlayer).toContain("class=\"video-player-iframe\"");
        expect(youtubePlayer).toContain("src=\"https://player.vimeo.com");
        expect(youtubePlayer).toContain("&amp;autoplay=1");
        expect(youtubePlayer).toContain("&amp;muted=0");
        expect(youtubePlayer).toContain("&amp;loop=0");
    });
});

describe("Tab page", () => {

    it("should render youtube tab", () => {
        tabpage.open();

        tabpage.youtubeTab.waitForVisible();
        tabpage.youtubeTab.click();
        tabpage.youtube.waitForVisible();

        const youtubePlayer = tabpage.youtube.getHTML();
        expect(youtubePlayer).toContain("class=\"video-player-iframe\"");
        expect(youtubePlayer).toContain("src=\"https://www.youtube.com");
    });

    it("should render vimeo tab", () => {
        tabpage.vimeoTab.waitForVisible();
        tabpage.vimeoTab.click();
        tabpage.vimeo.waitForVisible();

        const vimeoPlayer = tabpage.vimeo.getHTML();
        expect(vimeoPlayer).toContain("class=\"video-player-iframe\"");
        expect(vimeoPlayer).toContain("src=\"https://player.vimeo.com");
    });

    it("should render dailymotion tab", () => {
        tabpage.dailymotionTab.waitForVisible();
        tabpage.dailymotionTab.click();
        tabpage.dailymotion.waitForVisible();

        const dailymotionPlayer = tabpage.dailymotion.getHTML();
        expect(dailymotionPlayer).toContain("class=\"video-player-iframe\"");
        expect(dailymotionPlayer).toContain("src=\"https://www.dailymotion.com");
    });

    it("should render html5 video tab", () => {
        tabpage.html5Tab.waitForVisible();
        tabpage.html5Tab.click();
        tabpage.html5.waitForVisible();

        const html5Player = tabpage.html5.getHTML();
        expect(html5Player).toContain("class=\"video-player-html5\"");
        expect(html5Player).toContain("<source src=");
        expect(html5Player).toContain("ElephantsDream.mp4");
    });
});

describe("Error page", () => {
    it("should render no content div", () => {
        errorpage.open();
        errorpage.noContent.waitForVisible();

        const playerError = errorpage.noContent.getHTML();
        expect(playerError).toBe("<div class=\"video-player-error\">No content to play</div>");
    });
});
