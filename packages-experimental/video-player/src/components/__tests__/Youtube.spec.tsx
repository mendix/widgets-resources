import { shallow } from "enzyme";
import * as React from "react";

import ReactResizeDetector from "react-resize-detector";
import Youtube from "../Youtube";

describe("Youtube Player", () => {
    it("Renders the structure of iframe tags and check classes", () => {
        const player = shallow(<Youtube
            url="http://youtube.com/watch?v=123456"
            autoPlay={false}
            muted={false}
            loop={false}
            showControls={false}
            aspectRatio={false}
        />);

        expect(player).toHaveClass("video-player-iframe");
        expect(player).toBeDefined();
    });
    it("Renders the structure of iframe tags and check the structure", () => {
        const player = shallow(<Youtube
            url="http://youtube.com/watch?v=123456"
            autoPlay={false}
            muted={false}
            loop={false}
            showControls={false}
            aspectRatio={false}
        />);

        expect(player).toBeElement(
            <iframe
                className="video-player-iframe"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
                src="https://www.youtube.com/embed/123456?modestbranding=1&rel=0&autoplay=0&controls=0&muted=0&loop=0">
                <ReactResizeDetector handleWidth handleHeight onResize={jasmine.any(Function)}
                                     refreshMode="debounce" refreshRate={100} />
            </iframe>
        );
    });
});
