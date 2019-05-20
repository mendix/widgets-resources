import { createElement } from "react";
import { create } from "react-test-renderer";

import { Vimeo, VimeoProps } from "../Vimeo";
import ReactResizeDetector from "react-resize-detector";

describe("VimeoPlayer Player", () => {
    const defaultProps = {
        url: "http://vimeo.com/123456",
        autoPlay: false,
        muted: false,
        loop: false,
        aspectRatio: false
    };

    const defaulPlayer = (props: VimeoProps): JSX.Element => <Vimeo {...props} />;

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
