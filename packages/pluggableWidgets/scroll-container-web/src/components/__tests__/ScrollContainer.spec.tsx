import { createElement } from "react";
import { shallow } from "enzyme";
import { ScrollContainer } from "../ScrollContainer";

describe("Scroll Container", () => {
    it("renders correctly the structure", () => {
        const scrollContainer = shallow(<ScrollContainer className="scroll-container-test" />);
        expect(scrollContainer).toMatchSnapshot();
    });

    describe("with fixed width", () => {
        it("renders correctly the structure with pixels", () => {
            const scrollContainer = shallow(<ScrollContainer className="scroll-container-pixels" width={500} />);
            expect(scrollContainer).toMatchSnapshot();
        });

        it("renders correctly the structure with percentage", () => {
            const scrollContainer = shallow(
                <ScrollContainer className="scroll-container-percentage" percentage={70} />
            );
            expect(scrollContainer).toMatchSnapshot();
        });
    });
});
