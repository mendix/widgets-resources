import { render } from "enzyme";
import { createElement } from "react";
import { FilterComponent } from "../FilterComponent";

describe("Filter component", () => {
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
