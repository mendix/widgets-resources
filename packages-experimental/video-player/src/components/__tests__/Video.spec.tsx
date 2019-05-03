import { createElement } from "react";

import { Video } from "../Video";
import { create } from "react-test-renderer";

describe("Video Player", () => {

    it("Renders the structure of youtube tags", () => {
        const player = create(
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
            />,
        ).toJSON();

        expect(player).toMatchSnapshot();
    });

    it("Renders the structure of vimeo tags", () => {
        const player = create(
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
            />,
        ).toJSON();

        expect(player).toMatchSnapshot();
    });

    it("Renders the structure of dailymotion tags", () => {
        const player = create(
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
        ).toJSON();

        expect(player).toMatchSnapshot();
    });

    it("Renders the structure of html5 player tags", () => {
        const player = create(
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
            />,
        ).toJSON();

        expect(player).toMatchSnapshot();
    });

    // it("Test fixHeightWithRatio", () => {
    //     const test = fixHeightWithRatio(document.createElement("iframe"), 0);
    //
    //     expect(test).toEqual(undefined);
    // });
    //
    // it("Test fixHeightWithRatio with parents", () => {
    //     const parentOfParent = document.createElement("div");
    //     const parent = document.createElement("div");
    //     const child = document.createElement("iframe");
    //     parent.style.width = "500px";
    //     parent.appendChild(child);
    //     parentOfParent.appendChild(parent);
    //     const test = fixHeightWithRatio(child, 0.6);
    //
    //     expect(test).toBe(undefined);
    // });
    //
    // // it("Test getRatio", () => {
    // //     getRatio("https://www.youtube.com/watch?v=ikW1LGOtnGM").then(ratio => expect(ratio).toEqual(0.5625));
    // // });
    //
    // it("Test valid url", () => {
    //     const provider = validateUrl("http://youtube.com");
    //
    //     expect(provider).toEqual("http://youtube.com");
    // });
    //
    // it("Test invalid url", () => {
    //     const provider = validateUrl("http://youtube,com");
    //
    //     expect(provider).toEqual("");
    // });
});
