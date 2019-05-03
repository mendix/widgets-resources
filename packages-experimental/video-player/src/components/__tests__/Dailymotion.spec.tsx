import { createElement } from "react";
import { shallow } from "enzyme";

import { DailymotionPlayer } from "../DailymotionPlayer";
import ReactResizeDetector from "react-resize-detector";

describe("DailymotionPlayer Player", () => {
    it("Renders the structure of iframe tags and check the structure", () => {
        const player = shallow(<DailymotionPlayer url="http://dailymotion.com/123456" controls={false} autoPlay={false} muted={false} aspectRatio={false} />);

        expect(player.equals(
            <iframe
                className="widget-video-player-iframe"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen={true}
                src="https://www.dailymotion.com/embed/video/123456?sharing-enable=false&autoplay=false&mute=false&controls=false"
            >
                <ReactResizeDetector handleWidth handleHeight onResize={jasmine.any(Function)} refreshMode="debounce" refreshRate={100} />
            </iframe>
        )).toEqual(true);
    });

    it("Renders the structure of iframe tags and check classes", () => {
        const player = shallow(<DailymotionPlayer url="http://dailymotion.com/123456" controls={true} autoPlay={false} muted={false} aspectRatio={false} />);

        expect(player.equals(
            <iframe
                className="widget-video-player-iframe"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen={true}
                src="https://www.dailymotion.com/embed/video/123456?sharing-enable=false&autoplay=false&mute=false&controls=true"
            >
                <ReactResizeDetector handleWidth handleHeight onResize={jasmine.any(Function)} refreshMode="debounce" refreshRate={100} />
            </iframe>
        )).toEqual(true);
        expect(player).toHaveClass("widget-video-player-iframe");
        expect(player).toBeDefined();
    });

    it("Renders the structure of iframe tags and check the structure with properties", () => {
        const player = shallow(<DailymotionPlayer url="http://dailymotion.com/123456" controls={true} autoPlay={true} muted={true} aspectRatio={true} />);

        expect(player.equals(
            <iframe
                className="widget-video-player-iframe"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen={true}
                src="https://www.dailymotion.com/embed/video/123456?sharing-enable=false&autoplay=true&mute=true&controls=true"
            >
                <ReactResizeDetector handleWidth handleHeight onResize={jasmine.any(Function)} refreshMode="debounce" refreshRate={100} />
            </iframe>
        )).toEqual(true);
    });

    it("Renders the structure of iframe tags with an embed url", () => {
        const player = shallow(<DailymotionPlayer url="http://dailymotion.com/embed/123456" controls={true} autoPlay={true} muted={true} aspectRatio={true} />);

        expect(player.equals(
            <iframe
                className="widget-video-player-iframe"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen={true}
                src="http://dailymotion.com/embed/123456?sharing-enable=false&autoplay=true&mute=true&controls=true"
            >
                <ReactResizeDetector handleWidth handleHeight onResize={jasmine.any(Function)} refreshMode="debounce" refreshRate={100} />
            </iframe>
        )).toEqual(true);
    });

    it("Renders the structure of iframe tags with an invalid url", () => {
        const player = shallow(<DailymotionPlayer url="" controls={true} autoPlay={true} muted={true} aspectRatio={true} />);

        expect(player.equals(
            <iframe className="widget-video-player-iframe" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen={true} src="">
                <ReactResizeDetector handleWidth handleHeight onResize={jasmine.any(Function)} refreshMode="debounce" refreshRate={100} />
            </iframe>
        )).toEqual(true);
    });
});
