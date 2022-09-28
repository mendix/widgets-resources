import { render } from "enzyme";
import { createElement } from "react";
import { render as render_fromTestingLibrary } from "@testing-library/react";
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

    describe("with defaultValue", () => {
        it("call updateFilters when defaultValue get new value", () => {
            const date = new Date(946684800000);
            const updateFilters = jest.fn();
            const { rerender } = render_fromTestingLibrary(
                <FilterComponent adjustable defaultFilter="equal" defaultValue={date} updateFilters={updateFilters} />
            );

            // First time updateFilters is called on initial mount
            expect(updateFilters).toBeCalledTimes(1);
            expect(updateFilters.mock.calls[0][0]).toBe(date);

            const nextValue = new Date(999999900000);

            rerender(
                <FilterComponent
                    adjustable
                    defaultFilter="equal"
                    defaultValue={nextValue}
                    updateFilters={updateFilters}
                />
            );

            expect(updateFilters).toBeCalledTimes(2);
            expect(updateFilters.mock.calls[1][0]).toBe(nextValue);
        });

        it("don't call updateFilters when defaultValue get same value", () => {
            const date = new Date(946684800000);
            const updateFilters = jest.fn();
            const { rerender } = render_fromTestingLibrary(
                <FilterComponent adjustable defaultFilter="equal" defaultValue={date} updateFilters={updateFilters} />
            );

            // First time updateFilters is called on initial mount
            expect(updateFilters).toBeCalledTimes(1);
            expect(updateFilters.mock.calls[0][0]).toBe(date);

            const nextValue = new Date(946684800000);

            rerender(
                <FilterComponent
                    adjustable
                    defaultFilter="equal"
                    defaultValue={nextValue}
                    updateFilters={updateFilters}
                />
            );

            expect(updateFilters).toBeCalledTimes(1);
        });
    });
});
