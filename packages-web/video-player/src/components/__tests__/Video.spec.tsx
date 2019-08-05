import { createElement } from "react";

import { Video } from "../Video";
import { create } from "react-test-renderer";

describe("Video Player", () => {
    it("Renders the structure of youtube tags", () => {
        const player = create(
            <Video
                url="http://youtube.com/video/123456"
                poster=""
                autoStart={false}
                showControls={false}
                loop={false}
                muted={false}
                aspectRatio={false}
            />
        ).toJSON();

        expect(player).toMatchSnapshot();
    });

    it("Renders the structure of vimeo tags", () => {
        const player = create(
            <Video
                url="http://vimeo.com/123456"
                poster=""
                autoStart={false}
                showControls={false}
                loop={false}
                muted={false}
                aspectRatio={false}
            />
        ).toJSON();

        expect(player).toMatchSnapshot();
    });

    it("Renders the structure of dailymotion tags", () => {
        const player = create(
            <Video
                url="http://dailymotion.com/123456"
                poster=""
                autoStart={false}
                showControls={false}
                loop={false}
                muted={false}
                aspectRatio={false}
            />
        ).toJSON();

        expect(player).toMatchSnapshot();
    });

    it("Renders the structure of html5 player tags", () => {
        const player = create(
            <Video
                url="http://ext.com/video.mp4"
                poster=""
                autoStart={false}
                showControls={false}
                loop={false}
                muted={false}
                aspectRatio={false}
            />
        ).toJSON();

        expect(player).toMatchSnapshot();
    });
});
