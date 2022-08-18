import { shallow } from "enzyme";
// @ts-ignore
import { render, fireEvent, screen } from "@testing-library/react";
// @ts-ignore
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { createElement } from "react";
import { FilterSelector } from "../FilterSelector";

const options = [
    { value: "contains", label: "Contains" },
    { value: "startsWith", label: "Starts with" },
    { value: "endsWith", label: "Ends with" },
    { value: "greater", label: "Greater than" },
    { value: "greaterEqual", label: "Greater than or equal" },
    { value: "equal", label: "Equal" },
    { value: "notEqual", label: "Not equal" },
    { value: "smaller", label: "Smaller than" },
    { value: "smallerEqual", label: "Smaller than or equal" }
];

jest.useFakeTimers();

describe("Filter selector", () => {
    it("renders correctly", () => {
        const component = shallow(
            <FilterSelector defaultFilter="contains" onChange={jest.fn()} id="test" options={options} />
        );

        expect(component).toMatchSnapshot();
    });

    it("renders correctly with filter selectors open", () => {
        const onClickProps = { preventDefault: jest.fn(), stopPropagation: jest.fn() };
        const onChange = jest.fn();
        const component = shallow(
            <FilterSelector defaultFilter="contains" onChange={onChange} id="test" options={options} />
        );

        const button = component.find("button");
        button.simulate("click", onClickProps);

        expect(component).toMatchSnapshot();
    });

    it("renders correctly with aria-label", () => {
        const component = shallow(
            <FilterSelector
                ariaLabel="my label"
                defaultFilter="contains"
                onChange={jest.fn()}
                id="test"
                options={options}
            />
        );

        expect(component).toMatchSnapshot();
    });

    it("renders correctly with another default filter", () => {
        const component = shallow(
            <FilterSelector defaultFilter="equal" onChange={jest.fn()} id="test" options={options} />
        );

        expect(component).toMatchSnapshot();
    });

    it("calls onChange when type changes", () => {
        const onClickProps = { preventDefault: jest.fn(), stopPropagation: jest.fn() };
        const onChange = jest.fn();
        const component = shallow(
            <FilterSelector defaultFilter="contains" onChange={onChange} id="test" options={options} />
        );

        const button = component.find("button");
        button.simulate("click", onClickProps);
        const lis = component.find("li");

        expect(lis.at(0)).toBeDefined();
        lis.at(0).simulate("click", onClickProps);

        expect(onChange).toBeCalled();
        expect(onChange).toBeCalledWith("contains");

        lis.at(1).simulate("click", onClickProps);
        expect(onChange).toBeCalledWith("startsWith");
    });

    describe("focus", () => {
        beforeEach(() => (document.body.innerHTML = ""));

        it("changes focused element when pressing filter selector button", () => {
            render(<FilterSelector defaultFilter="contains" onChange={jest.fn()} id="test" options={options} />);
            // @ts-ignore
            expect(document.body).toHaveFocus();

            const button = screen.getByRole("button");
            expect(button).toBeDefined();
            fireEvent.click(button);

            jest.advanceTimersByTime(10);

            const items = screen.getAllByRole("menuitem");
            // @ts-ignore
            expect(items[0]).toHaveFocus();
        });

        it("changes focused element back to the button when pressing shift+tab in the first element", () => {
            render(<FilterSelector defaultFilter="contains" onChange={jest.fn()} id="test" options={options} />);
            // @ts-ignore
            expect(document.body).toHaveFocus();

            const button = screen.getByRole("button");
            expect(button).toBeDefined();
            fireEvent.click(button);

            jest.advanceTimersByTime(10);

            const items = screen.getAllByRole("menuitem");
            // @ts-ignore
            expect(items[0]).toHaveFocus();

            userEvent.tab({ shift: true });

            jest.advanceTimersByTime(10);
            // @ts-ignore
            expect(button).toHaveFocus();
        });

        it("triggers onChange with previous value when pressing tab on the last item", () => {
            const onChange = jest.fn();

            render(
                <FilterSelector
                    defaultFilter="contains"
                    onChange={onChange}
                    id="test"
                    options={[
                        { value: "contains", label: "Contains" },
                        { value: "startsWith", label: "Starts with" }
                    ]}
                />
            );
            // @ts-ignore
            expect(document.body).toHaveFocus();

            const button = screen.getByRole("button");
            expect(button).toBeDefined();
            fireEvent.click(button);

            jest.advanceTimersByTime(10);

            const items = screen.getAllByRole("menuitem");
            // @ts-ignore
            expect(items[0]).toHaveFocus();

            userEvent.tab();
            // @ts-ignore
            expect(items[1]).toHaveFocus();
            userEvent.tab();

            jest.advanceTimersByTime(10);

            expect(onChange).toHaveBeenCalledWith("contains");
        });

        it("changes focused element back to the button when pressing escape in any element", () => {
            render(<FilterSelector defaultFilter="contains" onChange={jest.fn()} id="test" options={options} />);
            // @ts-ignore
            expect(document.body).toHaveFocus();

            const button = screen.getByRole("button");
            expect(button).toBeDefined();
            fireEvent.click(button);

            jest.advanceTimersByTime(10);

            const items = screen.getAllByRole("menuitem");
            // @ts-ignore
            expect(items[0]).toHaveFocus();

            userEvent.tab();
            // @ts-ignore
            expect(items[1]).toHaveFocus();

            userEvent.keyboard("{esc}");

            jest.advanceTimersByTime(10);
            // @ts-ignore
            expect(button).toHaveFocus();
        });
    });
});
