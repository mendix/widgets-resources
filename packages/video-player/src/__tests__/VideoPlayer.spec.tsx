import { dynamicValue } from "@native-mobile-resources/util-widgets/test";
import { createElement } from "react";
import { fireEvent, render } from "react-native-testing-library";
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
        const props = component.getByType(Video).props as VideoProperties;

        expect(props.source).toEqual({ uri: "https://mendix.com/video.mp4" });
        expect(props.paused).toBe(true);
        expect(props.muted).toBe(false);
        expect(props.repeat).toBe(false);
        expect(props.controls).toBe(true);
        expect(props.style).toEqual({ height: 0 });
    });

    it("hides the loading indicator after load", () => {
        const component = render(<VideoPlayer {...defaultProps} />);

        fireEvent(component.getByType(Video), "load");

        expect(component.toJSON()).toMatchSnapshot();
        expect(component.getByType(Video).props.style).toEqual({ width: "100%", height: "100%" });
    });

    it("shows the loading indicator if the source changes", () => {
        const component = render(<VideoPlayer {...defaultProps} />);

        fireEvent(component.getByType(Video), "load");
        fireEvent(component.getByType(Video), "loadStart");

        expect(component.toJSON()).toMatchSnapshot();
        expect(component.getByType(Video).props.style).toEqual({ height: 0 });
    });
});
