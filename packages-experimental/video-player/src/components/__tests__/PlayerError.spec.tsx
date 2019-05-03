import { createElement } from "react";
import { shallow } from "enzyme";

import { PlayerError } from "../PlayerError";

describe("Player Error", () => {
    it("Renders the structure of video tags and check the structure", () => {
        const player = shallow(<PlayerError />);
        expect(
            player.equals(
                <div className="widget-video-player-error-container">
                    <div className="video-error-label">The video failed to load :(</div>
                    <video height="100%" width="100%" controls={true} />
                </div>,
            ),
        ).toEqual(true);
    });
});
