import { createElement } from "react";

import { Error } from "../Error";
import { create } from "react-test-renderer";

describe("Player Error", () => {
    it("should renders correctly", () => {
        const player = create(<Error />).toJSON();
        expect(player).toMatchSnapshot();
    });
});
