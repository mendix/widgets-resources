import gridpage from "../pages/grid.page";
import tabpage from "../pages/tab.page";
import errorpage from "../pages/error.page";
import page from "../../../../../../configs/e2e/src/pages/page";

describe("Grid page", () => {
    it("renders youtube video", () => {
        gridpage.open();
        gridpage.youtube.waitForDisplayed();
        const youtubePlayer = gridpage.youtube.getHTML();

        expect(youtubePlayer).toContain('class="widget-video-player-iframe"');
        expect(youtubePlayer).toContain('src="https://www.youtube.com');
        expect(youtubePlayer).toContain("&amp;autoplay=1");
        expect(youtubePlayer).toContain("&amp;controls=0");
        expect(youtubePlayer).toContain("&amp;muted=0");
        expect(youtubePlayer).toContain("&amp;loop=0");
    });

    it("renders vimeo video", () => {
        gridpage.vimeo.waitForDisplayed();
        const youtubePlayer = gridpage.vimeo.getHTML();

        expect(youtubePlayer).toContain('class="widget-video-player-iframe"');
        expect(youtubePlayer).toContain('src="https://player.vimeo.com');
        expect(youtubePlayer).toContain("&amp;autoplay=1");
        expect(youtubePlayer).toContain("&amp;muted=0");
        expect(youtubePlayer).toContain("&amp;loop=0");
    });
});

describe("Tab page", () => {
    it("renders youtube video", () => {
        tabpage.open();
        tabpage.youtubeTab.waitForDisplayed();
        tabpage.youtubeTab.click();
        tabpage.youtube.waitForDisplayed();
        const youtubePlayer = tabpage.youtube.getHTML();

        expect(youtubePlayer).toContain('class="widget-video-player-iframe"');
        expect(youtubePlayer).toContain('src="https://www.youtube.com');
    });

    it("renders vimeo video", () => {
        tabpage.vimeoTab.waitForDisplayed();
        tabpage.vimeoTab.click();
        tabpage.vimeo.waitForDisplayed();
        const vimeoPlayer = tabpage.vimeo.getHTML();

        expect(vimeoPlayer).toContain('class="widget-video-player-iframe"');
        expect(vimeoPlayer).toContain('src="https://player.vimeo.com');
    });

    it("renders dailymotion video", () => {
        tabpage.dailymotionTab.waitForDisplayed();
        tabpage.dailymotionTab.click();
        tabpage.dailymotion.waitForDisplayed();
        const dailymotionPlayer = tabpage.dailymotion.getHTML();

        expect(dailymotionPlayer).toContain('class="widget-video-player-iframe"');
        expect(dailymotionPlayer).toContain('src="https://www.dailymotion.com');
    });

    it("renders html5 video", () => {
        tabpage.html5Tab.waitForDisplayed();
        tabpage.html5Tab.click();
        tabpage.html5.waitForDisplayed();
        const html5Player = tabpage.html5.getHTML();

        expect(html5Player).toContain('class="widget-video-player-html5"');
        expect(html5Player).toContain("<source src=");
        expect(html5Player).toContain("file_example_MP4_640_3MG.mp4");
    });
});

describe("Error page", () => {
    it("renders no content div", () => {
        errorpage.open();
        errorpage.noContent.waitForDisplayed();
        const playerError = errorpage.noContent.getHTML();
        expect(playerError).not.toBeNull();
    });
});

describe("External video", () => {
    it("renders a poster", () => {
        page.open("p/external");
        browser.setWindowRect(0, 0, 1200, 900);
        const screenshotElem = $(".widget-video-player");
        screenshotElem.waitForDisplayed({ timeout: 5000 });
        browser.saveElement(screenshotElem, "videoPlayerExternalPoster");
        expect(browser.checkElement(screenshotElem, "videoPlayerExternalPoster")).toBeLessThan(0.15);
    });
});

describe("Video aspect ratio", () => {
    it("renders video aspect ratio correctly", () => {
        page.open("p/aspectRatio");
        const videoElement = $(".mx-name-videoPlayer1");
        videoElement.waitForDisplayed({ timeout: 5000 });
        browser.pause(2000);
        const aspectRatio = Number(videoElement.getSize("width") / videoElement.getSize("height"));
        // 16:9
        expect(aspectRatio).toBeCloseTo(Number(16 / 9), 0.1);

        const secondTab = $(".mx-name-tabPage2");
        const videoElement2 = $(".mx-name-videoPlayer3");
        secondTab.click();
        videoElement2.waitForDisplayed({ timeout: 5000 });
        browser.pause(2000);
        const aspectRatio2 = Number(videoElement2.getSize("width") / videoElement2.getSize("height"));
        // 3:2
        expect(aspectRatio2).toBeCloseTo(Number(3 / 2), 0.1);

        const thirdTab = $(".mx-name-tabPage3");
        const videoElement3 = $(".mx-name-videoPlayer5");
        thirdTab.click();
        videoElement3.waitForDisplayed({ timeout: 5000 });
        browser.pause(2000);
        // 1:1
        expect(videoElement3.getSize("width")).toBe(videoElement3.getSize("height"));
    });
});
