import { createElement } from "react";
import { create } from "react-test-renderer";

import { Dailymotion, DailymotionProps } from "../Dailymotion";

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
});
