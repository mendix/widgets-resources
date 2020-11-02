import { createElement } from "react";

import { Dailymotion, DailymotionProps } from "../Dailymotion";
import { create } from "react-test-renderer";
import ReactResizeDetector from "react-resize-detector";

describe("Dailymotion Player", () => {
    const defaultProps = {
        url: "test",
        autoPlay: false,
        muted: false,
        showControls: false,
        aspectRatio: false
    };

    const defaulPlayer = (props: DailymotionProps): JSX.Element => <Dailymotion {...props} />;

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
