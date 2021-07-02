import { createElement } from "react";
import { create } from "react-test-renderer";

import { Vimeo, VimeoProps } from "../Vimeo";

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
});
