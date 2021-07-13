import { createElement } from "react";
import { shallow } from "enzyme";
import { ScrollContainer } from "../ScrollContainer";

describe("Scroll Container", () => {
    it("renders correctly the structure", () => {
        const scrollContainer = shallow(<ScrollContainer className="scroll-container-test" />);
        expect(scrollContainer).toMatchSnapshot();
    });
});
