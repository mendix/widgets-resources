import { createElement } from "react";
import { shallow } from "enzyme";

import ReactResizeDetector from "react-resize-detector";
import { VimeoPlayer } from "../VimeoPlayer";

describe("VimeoPlayer Player", () => {
    it("Renders the structure of iframe tags and check classes", () => {
        const player = shallow(<VimeoPlayer url="http://vimeo.com/123456" autoPlay={false} muted={false} loop={false} aspectRatio={false} />);

        expect(player).toHaveClass("widget-video-player-iframe");
        expect(player).toBeDefined();
    });
    it("Renders the structure of iframe tags and check the structure", () => {
        const player = shallow(<VimeoPlayer url="http://vimeo.com/123456" autoPlay={false} muted={false} loop={false} aspectRatio={false} />);

        expect(
            player.equals(
                <iframe
                    className="widget-video-player-iframe"
                    src="https://player.vimeo.com/video/123456?dnt=1&autoplay=0&muted=0&loop=0"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen={true}
                >
                    <ReactResizeDetector handleWidth handleHeight onResize={jasmine.any(Function)} refreshMode="debounce" refreshRate={100} />
                </iframe>,
            ),
        ).toEqual(true);
    });

    it("Renders the structure of iframe tags and check the structure with parameters true", () => {
        const player = shallow(<VimeoPlayer url="http://vimeo.com/123456" autoPlay={true} muted={true} loop={true} aspectRatio={true} />);

        expect(
            player.equals(
                <iframe
                    className="widget-video-player-iframe"
                    src="https://player.vimeo.com/video/123456?dnt=1&autoplay=1&muted=1&loop=1"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen={true}
                >
                    <ReactResizeDetector handleWidth handleHeight onResize={jasmine.any(Function)} refreshMode="debounce" refreshRate={100} />
                </iframe>,
            ),
        ).toEqual(true);
    });

    it("Renders the structure of iframe tags and check the structure with empty url", () => {
        const player = shallow(<VimeoPlayer url="" autoPlay={true} muted={true} loop={true} aspectRatio={true} />);

        expect(
            player.equals(
                <iframe className="widget-video-player-iframe" src="" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen={true}>
                    <ReactResizeDetector handleWidth handleHeight onResize={jasmine.any(Function)} refreshMode="debounce" refreshRate={100} />
                </iframe>,
            ),
        ).toEqual(true);
    });

    it("Renders the structure of iframe tags and check the structure with embed url", () => {
        const player = shallow(<VimeoPlayer url="http://player.vimeo.com/123456" autoPlay={true} muted={true} loop={true} aspectRatio={true} />);

        expect(
            player.equals(
                <iframe
                    className="widget-video-player-iframe"
                    src="http://player.vimeo.com/123456?dnt=1&autoplay=1&muted=1&loop=1"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen={true}
                >
                    <ReactResizeDetector handleWidth handleHeight onResize={jasmine.any(Function)} refreshMode="debounce" refreshRate={100} />
                </iframe>,
            ),
        ).toEqual(true);
    });
});
