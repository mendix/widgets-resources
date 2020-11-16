import { shallow } from "enzyme";
import { createElement } from "react";
import { FilterSelector } from "../FilterSelector";

describe("Filter selector", () => {
    it("renders correctly", () => {
        const component = shallow(<FilterSelector onChange={jest.fn()} />);

        expect(component).toMatchSnapshot();
    });
});
