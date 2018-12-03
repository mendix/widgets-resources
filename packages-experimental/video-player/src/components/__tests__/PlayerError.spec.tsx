import { shallow } from "enzyme";
import * as React from "react";

import { PlayerError } from "../PlayerError";

describe("Player Error", () => {
    it("Renders the structure of video tags and check the structure", () => {
        const player = shallow(<PlayerError />);
        expect(player).toBeElement(
            <video poster="https://i.imgur.com/Be8TLvE.png" height="100%" width="100%" controls={true} style={
                {
                    backgroundColor: "#000"
                }
            }>
            </video>
        );
    });
});
