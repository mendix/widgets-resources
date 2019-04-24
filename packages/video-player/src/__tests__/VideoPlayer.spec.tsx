import { dynamicValue } from "@native-components/util-widgets/test";
import { createElement } from "react";
import { render, RenderAPI } from "react-native-testing-library";
import { VideoProperties } from "react-native-video";

import { Props, VideoPlayer } from "../VideoPlayer";
import Video from "./__mocks__/Video";

jest.mock("react-native-video", () => require.requireActual("./__mocks__/Video"));

describe("VideoPlayer", () => {
    let defaultProps: Props;

    beforeEach(() => {
        defaultProps = {
            style: [],
            videoUrl: dynamicValue("https://mendix.com/video.mp4"),
            autoStart: false,
            muted: false,
            loop: false,
            showControls: true
        };
    });

    it("renders a loading indicator", () => {
        const component = render(<VideoPlayer {...defaultProps} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("passes the right props to the video player", () => {
        const component = render(<VideoPlayer {...defaultProps} />);
        const props = videoInstanceProps(component);

        expect(props.source).toEqual({ uri: "https://mendix.com/video.mp4" });
        expect(props.paused).toBe(true);
        expect(props.muted).toBe(false);
        expect(props.repeat).toBe(false);
        expect(props.controls).toBe(true);
        expect(props.style).toEqual({ height: 0 });
    });

    it("hides the loading indicator after load", () => {
        const component = render(<VideoPlayer {...defaultProps} />);

        videoInstanceProps(component).onLoad!({} as any);

        expect(component.toJSON()).toMatchSnapshot();
        expect(videoInstanceProps(component).style).toEqual({ width: "100%", height: "100%" });
    });

    it("shows the loading indicator if the source changes", () => {
        const component = render(<VideoPlayer {...defaultProps} />);

        videoInstanceProps(component).onLoad!({} as any);
        videoInstanceProps(component).onLoadStart!();

        expect(component.toJSON()).toMatchSnapshot();
        expect(videoInstanceProps(component).style).toEqual({ height: 0 });
    });
});

function videoInstanceProps(component: RenderAPI): VideoProperties {
    const RNCameraInstance = component.getByType(Video);
    return RNCameraInstance.props as VideoProperties;
}
