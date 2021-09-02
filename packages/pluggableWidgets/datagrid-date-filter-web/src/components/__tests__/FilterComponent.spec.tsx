import { render } from "enzyme";
import { createElement } from "react";
import { FilterComponent } from "../FilterComponent";
import ReactDOM from "react-dom";

describe("Filter component", () => {
    beforeAll(() => {
        jest.spyOn(global.Math, "random").mockReturnValue(0.123456789);

        // @ts-ignore
        jest.spyOn(ReactDOM, "createPortal").mockReturnValue((element, node) => {
            return element;
        });
    });

    it("renders correctly", () => {
        const component = render(<FilterComponent adjustable defaultFilter="equal" />);

        expect(component).toMatchSnapshot();
    });

    it("renders correctly when not adjustable by user", () => {
        const component = render(<FilterComponent adjustable={false} defaultFilter="equal" />);

        expect(component).toMatchSnapshot();
    });

    it("renders correctly with aria labels", () => {
        const component = render(
            <FilterComponent
                adjustable
                screenReaderButtonCaption="my label"
                screenReaderInputCaption="my label"
                defaultFilter="equal"
            />
        );

        expect(component).toMatchSnapshot();
    });
});
