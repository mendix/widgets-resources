import { createElement } from "react";

import { PlayerError } from "../PlayerError";
import { create } from "react-test-renderer";

describe("Player Error", () => {
    it("should renders correctly", () => {
        const player = create(<PlayerError />).toJSON();
        expect(player).toMatchSnapshot();
    });
});
