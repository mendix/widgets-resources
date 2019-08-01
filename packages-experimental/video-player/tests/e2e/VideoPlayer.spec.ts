import gridpage from "./pages/grid.page";
import tabpage from "./pages/tab.page";
import errorpage from "./pages/error.page";

// @ts-ignore
describe("Grid page", () => {
    it("should render youtube iframe", () => {
        gridpage.open();
        gridpage.youtube.waitForDisplayed();
        // @ts-ignore
        const youtubePlayer = gridpage.youtube.getHTML();
        expect(youtubePlayer).toContain("class=\"widget-video-player-iframe\"");
        expect(youtubePlayer).toContain("src=\"https://www.youtube.com");
        expect(youtubePlayer).toContain("&amp;autoplay=1");
        expect(youtubePlayer).toContain("&amp;controls=0");
        expect(youtubePlayer).toContain("&amp;muted=0");
        expect(youtubePlayer).toContain("&amp;loop=0");
    });

    it("should render vimeo iframe", () => {
        // @ts-ignore
        gridpage.vimeo.waitForDisplayed();
        // @ts-ignore
        const youtubePlayer = gridpage.vimeo.getHTML();
        expect(youtubePlayer).toContain("class=\"widget-video-player-iframe\"");
        expect(youtubePlayer).toContain("src=\"https://player.vimeo.com");
        expect(youtubePlayer).toContain("&amp;autoplay=1");
        expect(youtubePlayer).toContain("&amp;muted=0");
        expect(youtubePlayer).toContain("&amp;loop=0");
    });
});

describe("Tab page", () => {
    it("should render youtube tab", () => {
        tabpage.open();
        // @ts-ignore
        tabpage.youtubeTab.waitForDisplayed();
        // @ts-ignore
        tabpage.youtubeTab.click();
        // @ts-ignore
        tabpage.youtube.waitForDisplayed();
        // @ts-ignore
        const youtubePlayer = tabpage.youtube.getHTML();
        expect(youtubePlayer).toContain("class=\"widget-video-player-iframe\"");
        expect(youtubePlayer).toContain("src=\"https://www.youtube.com");
    });

    it("should render vimeo tab", () => {
        // @ts-ignore
        tabpage.vimeoTab.waitForDisplayed();
        // @ts-ignore
        tabpage.vimeoTab.click();
        // @ts-ignore
        tabpage.vimeo.waitForDisplayed();
        // @ts-ignore
        const vimeoPlayer = tabpage.vimeo.getHTML();
        expect(vimeoPlayer).toContain("class=\"widget-video-player-iframe\"");
        expect(vimeoPlayer).toContain("src=\"https://player.vimeo.com");
    });

    it("should render dailymotion tab", () => {
        // @ts-ignore
        tabpage.dailymotionTab.waitForDisplayed();
        // @ts-ignore
        tabpage.dailymotionTab.click();
        // @ts-ignore
        tabpage.dailymotion.waitForDisplayed();
        // @ts-ignore
        const dailymotionPlayer = tabpage.dailymotion.getHTML();
        expect(dailymotionPlayer).toContain("class=\"widget-video-player-iframe\"");
        expect(dailymotionPlayer).toContain("src=\"https://www.dailymotion.com");
    });

    it("should render html5 video tab", () => {
        // @ts-ignore
        tabpage.html5Tab.waitForDisplayed();
        // @ts-ignore
        tabpage.html5Tab.click();
        // @ts-ignore
        tabpage.html5.waitForDisplayed();
        // @ts-ignore
        const html5Player = tabpage.html5.getHTML();
        expect(html5Player).toContain("class=\"widget-video-player-html5\"");
        expect(html5Player).toContain("<source src=");
        expect(html5Player).toContain("ElephantsDream.mp4");
    });
});

describe("Error page", () => {
    it("should render no content div", () => {
        errorpage.open();
        // @ts-ignore
        errorpage.noContent.waitForDisplayed();
        // @ts-ignore
        const playerError = errorpage.noContent.getHTML();
        expect(playerError).not.toBeNull();
    });
});
