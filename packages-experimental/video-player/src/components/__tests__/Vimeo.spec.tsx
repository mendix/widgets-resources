import { shallow } from "enzyme";
import * as React from "react";

import ReactResizeDetector from "react-resize-detector";
import Vimeo from "../Vimeo";

describe("Vimeo Player", () => {
    it("Renders the structure of iframe tags and check classes", () => {
        const player = shallow(<Vimeo
            url="http://vimeo.com/123456"
            autoPlay={false}
            muted={false}
            loop={false}
            aspectRatio={false}
        />);

        expect(player).toHaveClass("video-player-iframe");
        expect(player).toBeDefined();
    });
    it("Renders the structure of iframe tags and check the structure", () => {
        const player = shallow(<Vimeo
            url="http://vimeo.com/123456"
            autoPlay={false}
            muted={false}
            loop={false}
            aspectRatio={false}
        />);

        expect(player).toBeElement(
            <iframe
                className="video-player-iframe"
                src="https://player.vimeo.com/video/123456?dnt=1&autoplay=0&muted=0&loop=0"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen={true}>
                <ReactResizeDetector handleWidth handleHeight onResize={jasmine.any(Function)}
                                     refreshMode="debounce" refreshRate={100} />
            </iframe>
        );
    });
});
