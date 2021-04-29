import { shallow } from "enzyme";
import { createElement } from "react";
import { FilterComponent } from "../FilterComponent";

jest.mock("mendix/filters/builders", () => jest.requireActual("./__mocks__/mendix/filters/builders"));

describe("Filter component", () => {
    it("renders correctly", () => {
        const component = shallow(<FilterComponent adjustable defaultFilter="equal" filterDispatcher={jest.fn()} />);

        expect(component).toMatchSnapshot();
    });

    it("renders correctly when not adjustable by user", () => {
        const component = shallow(
            <FilterComponent adjustable={false} defaultFilter="equal" filterDispatcher={jest.fn()} />
        );

        expect(component).toMatchSnapshot();
    });

    it("renders correctly with aria labels", () => {
        const component = shallow(
            <FilterComponent
                adjustable
                screenReaderButtonCaption="my label"
                screenReaderInputCaption="my label"
                defaultFilter="equal"
                filterDispatcher={jest.fn()}
            />
        );

        expect(component).toMatchSnapshot();
    });
});
