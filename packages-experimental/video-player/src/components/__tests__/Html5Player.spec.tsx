import { shallow } from "enzyme";
import { createElement } from "react";

import ReactResizeDetector from "react-resize-detector";
import { Html5Player } from "../Html5Player";

describe("Html5 Player", () => {
    it("Renders the structure of video tags and check the style", () => {
        const player = shallow(<Html5Player url="test" autoPlay={false} muted={false} loop={true} aspectRatio={false} poster="test" showControls={true} />);

        expect(player).toHaveClass("widget-video-player-html5-container");
        expect(player).toBeDefined();
    });
    it("Renders the structure of video tags and check the structure", () => {
        const player = shallow(<Html5Player url="test" autoPlay={false} muted={false} loop={true} aspectRatio={false} poster="test" showControls={true} />);
        expect(player.equals(
            <div className="widget-video-player-html5-container">
                <div className="video-error-label-html5">The video failed to load :(</div>
                <video
                    className="widget-video-player-html5"
                    controls={true}
                    width="100%"
                    height="100%"
                    autoPlay={false}
                    muted={false}
                    loop={true}
                    poster="test"
                    ref={jasmine.any(HTMLVideoElement)}
                >
                    <source src="test" type="video/mp4" />
                    <ReactResizeDetector handleWidth handleHeight onResize={jasmine.any(Function)} refreshMode="debounce" refreshRate={100} />
                </video>
            </div>
        )).toEqual(true);
    });
});
