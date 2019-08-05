import { createElement } from "react";

import { Youtube, YoutubeProps } from "../Youtube";
import { create } from "react-test-renderer";
import ReactResizeDetector from "react-resize-detector";

describe("YoutubePlayer Player", () => {
    const defaultProps = {
        url: "http://youtube.com/watch?v=123456",
        autoPlay: false,
        muted: false,
        loop: false,
        showControls: false,
        aspectRatio: false
    };

    const defaulPlayer = (props: YoutubeProps): JSX.Element => <Youtube {...props} />;

    it("should renders correctly", () => {
        const player = create(defaulPlayer(defaultProps)).toJSON();

        expect(player).toMatchSnapshot();
    });

    it("should renders correctly with autoplay", () => {
        const player = create(defaulPlayer({ ...defaultProps, autoPlay: true })).toJSON();

        expect(player).toMatchSnapshot();
    });

    it("should renders correctly with muted", () => {
        const player = create(defaulPlayer({ ...defaultProps, muted: true })).toJSON();

        expect(player).toMatchSnapshot();
    });

    it("should renders correctly with controls", () => {
        const player = create(defaulPlayer({ ...defaultProps, showControls: true })).toJSON();

        expect(player).toMatchSnapshot();
    });

    it("should renders correctly with aspectRatio", () => {
        const player = create(defaulPlayer({ ...defaultProps, aspectRatio: true }));
        window.dispatchEvent(new Event("resize"));
        const instance = player.root;
        const sizeDetector = instance.findByType(ReactResizeDetector);

        expect(player.toJSON).toMatchSnapshot();
        expect(sizeDetector).not.toBeNull();
        expect(sizeDetector.props).toHaveProperty("onResize");
    });
});
