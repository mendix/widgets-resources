import { shallow } from "enzyme";
import { createElement } from "react";
import { InfiniteBody } from "../InfiniteBody";

describe("Infinite Body", () => {
    it("renders the structure correctly", () => {
        const component = shallow(createElement(InfiniteBody));

        expect(component).toMatchSnapshot();
    });
});
