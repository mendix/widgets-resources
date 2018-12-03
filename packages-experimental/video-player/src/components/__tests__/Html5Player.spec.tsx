import { shallow } from "enzyme";
import * as React from "react";

import ReactResizeDetector from "react-resize-detector";
import Html5Player from "../Html5Player";

describe("Html5 Player", () => {
    it("Renders the structure of video tags and check the style", () => {
        const player = shallow(<Html5Player
            url="test"
            autoPlay={false}
            muted={false}
            loop={true}
            aspectRatio={false}
            poster="test"
            showControls={true}
        />);

        expect(player).toHaveClass("video-player-html5");
        expect(player).toBeDefined();
    });
    it("Renders the structure of video tags and check the structure", () => {
        const player = shallow(<Html5Player
            url="test"
            autoPlay={false}
            muted={false}
            loop={true}
            aspectRatio={false}
            poster="test"
            showControls={true}
        />);
        expect(player).toBeElement(
            <video
                className="video-player-html5"
                controls={true}
                width="100%"
                height="100%"
                autoPlay={false}
                muted={false}
                loop={true}
                poster="test"
                ref={jasmine.any(HTMLVideoElement)}>
                <source src="test" type="video/mp4"/>
                <ReactResizeDetector handleWidth handleHeight onResize={jasmine.any(Function)}
                                     refreshMode="debounce" refreshRate={100} />
            </video>
        );
    });
});
