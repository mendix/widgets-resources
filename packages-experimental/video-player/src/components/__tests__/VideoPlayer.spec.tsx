import { shallow } from "enzyme";
import * as React from "react";

import VideoPlayer, { fixHeightWithRatio, getRatio, validateUrl } from "../VideoPlayer";
import Youtube from "../Youtube";
import Vimeo from "../Vimeo";
import Dailymotion from "../Dailymotion";
import Html5Player from "../Html5Player";

describe("Video Player", () => {
    it("Renders the structure of youtube tags", () => {
        const player = shallow(<VideoPlayer
            url="http://youtube.com/video/123456"
            staticUrl=""
            poster=""
            staticPoster=""
            autoStart={false}
            showControls={false}
            loop={false}
            muted={false}
            aspectRatio={false}
        />);

        expect(player).toBeElement(
            <Youtube
                url="http://youtube.com/video/123456"
                showControls={false}
                autoPlay={false}
                muted={false}
                loop={false}
                aspectRatio={false}
            />
        );
    });

    it("Renders the structure of vimeo tags", () => {
        const player = shallow(<VideoPlayer
            url="http://vimeo.com/123456"
            staticUrl=""
            poster=""
            staticPoster=""
            autoStart={false}
            showControls={false}
            loop={false}
            muted={false}
            aspectRatio={false}
        />);

        expect(player).toBeElement(
            <Vimeo
                url="http://vimeo.com/123456"
                autoPlay={false}
                muted={false}
                loop={false}
                aspectRatio={false}
            />
        );
    });

    it("Renders the structure of dailymotion tags", () => {
        const player = shallow(<VideoPlayer
            url="http://dailymotion.com/123456"
            staticUrl=""
            poster=""
            staticPoster=""
            autoStart={false}
            showControls={false}
            loop={false}
            muted={false}
            aspectRatio={false}
        />);

        expect(player).toBeElement(
            <Dailymotion
                controls={false}
                url="http://dailymotion.com/123456"
                autoPlay={false}
                muted={false}
                aspectRatio={false}
            />
        );
    });

    it("Renders the structure of html5 player tags", () => {
        const player = shallow(<VideoPlayer
            url="http://ext.com/video.mp4"
            staticUrl=""
            poster=""
            staticPoster=""
            autoStart={false}
            showControls={false}
            loop={false}
            muted={false}
            aspectRatio={false}
        />);

        expect(player).toBeElement(
            <Html5Player
                url="http://ext.com/video.mp4"
                showControls={false}
                autoPlay={false}
                muted={false}
                loop={false}
                aspectRatio={false}
                poster=""
            />
        );
    });

    it("Test fixHeightWithRatio", () => {
        const test = fixHeightWithRatio(document.createElement("iframe"), 0);

        expect(test).toBe(undefined);
    });

    it("Test getRatio", () => {
        let ratioTest = 0;
        getRatio("http://youtube.com/video/123456")
            .then(ratio => ratioTest = ratio);

        expect(ratioTest).toEqual(0);
    });

    it("Test validUrl", () => {
        const provider = validateUrl("http://youtube.com");

        expect(provider).toEqual("http://youtube.com");
    });

});
