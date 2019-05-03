import { createElement } from "react";
import { shallow } from "enzyme";

import { Video } from "../Video";
import { YoutubePlayer } from "../YoutubePlayer";
import { VimeoPlayer } from "../VimeoPlayer";
import { DailymotionPlayer } from "../DailymotionPlayer";
import { Html5Player } from "../Html5Player";
import { fixHeightWithRatio, getRatio, validateUrl } from "../../utils/Utils";

describe("Video Player", () => {
    it("Renders the structure of youtube tags", () => {
        const player = shallow(
            <Video
                url="http://youtube.com/video/123456"
                staticUrl=""
                poster=""
                staticPoster=""
                autoStart={false}
                showControls={false}
                loop={false}
                muted={false}
                aspectRatio={false}
            />
        );

        expect(player).equals(
            <YoutubePlayer url="http://youtube.com/video/123456" showControls={false} autoPlay={false} muted={false} loop={false} aspectRatio={false} />
        ).toEqual(true);
    });

    it("Renders the structure of vimeo tags", () => {
        const player = shallow(
            <Video
                url="http://vimeo.com/123456"
                staticUrl=""
                poster=""
                staticPoster=""
                autoStart={false}
                showControls={false}
                loop={false}
                muted={false}
                aspectRatio={false}
            />
        );

        expect(player).equals(<VimeoPlayer url="http://vimeo.com/123456" autoPlay={false} muted={false} loop={false} aspectRatio={false} />).toEqual(true);
    });

    it("Renders the structure of dailymotion tags", () => {
        const player = shallow(
            <Video
                url="http://dailymotion.com/123456"
                staticUrl=""
                poster=""
                staticPoster=""
                autoStart={false}
                showControls={false}
                loop={false}
                muted={false}
                aspectRatio={false}
            />,
        );

        expect(player).equals(
            <DailymotionPlayer controls={false} url="http://dailymotion.com/123456" autoPlay={false} muted={false} aspectRatio={false} />
        ).toEqual(true);
    });

    it("Renders the structure of html5 player tags", () => {
        const player = shallow(
            <Video
                url="http://ext.com/video.mp4"
                staticUrl=""
                poster=""
                staticPoster=""
                autoStart={false}
                showControls={false}
                loop={false}
                muted={false}
                aspectRatio={false}
            />
        );

        expect(player).equals(
            <Html5Player url="http://ext.com/video.mp4" showControls={false} autoPlay={false} muted={false} loop={false} aspectRatio={false} poster="" />
        ).toEqual(true);
    });

    it("Test fixHeightWithRatio", () => {
        const test = fixHeightWithRatio(document.createElement("iframe"), 0);

        expect(test).equals(undefined);
    });

    it("Test fixHeightWithRatio with parents", () => {
        const parentOfParent = document.createElement("div");
        const parent = document.createElement("div");
        const child = document.createElement("iframe");
        parent.style.width = "500px";
        parent.appendChild(child);
        parentOfParent.appendChild(parent);
        const test = fixHeightWithRatio(child, 0.6);

        expect(test.isEmptyRender()).toEqual(true);
    });

    it("Test getRatio", () => {
        getRatio("https://www.youtube.com/watch?v=ikW1LGOtnGM").then(ratio => expect(ratio).toEqual(0.5625));
    });

    it("Test valid url", () => {
        const provider = validateUrl("http://youtube.com");

        expect(provider).equals("http://youtube.com");
    });

    it("Test invalid url", () => {
        const provider = validateUrl("http://youtube,com");

        expect(provider).equals("");
    });
});
