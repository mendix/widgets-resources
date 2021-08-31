import { render, shallow } from "enzyme";
import { createElement } from "react";
import { render as renderTestingLib, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { SortComponent, SortOption } from "../SortComponent";

const defaultOptions: SortOption[] = [
    { caption: "1", value: "_1" },
    { caption: "2", value: "_2" },
    { caption: "3", value: "_3" }
];

jest.useFakeTimers();

describe("Sort selector", () => {
    describe("renders correctly", () => {
        it("with options", () => {
            const component = render(<SortComponent options={defaultOptions} />);

            expect(component).toMatchSnapshot();
        });
        it("with no options", () => {
            const component = render(<SortComponent options={[]} />);

            expect(component).toMatchSnapshot();
        });
        it("with ariaLabel", () => {
            const component = render(<SortComponent options={defaultOptions} ariaLabel="my label" />);

            expect(component).toMatchSnapshot();
        });
        it("with emptyOptioncaption", () => {
            const component = render(<SortComponent options={defaultOptions} emptyOptionCaption={"find me"} />);

            expect(component).toMatchSnapshot();
            expect(component.find("input").first().prop("placeholder")).toBe("find me");
        });
    });
    it("selects default option", () => {
        const defaultOption = defaultOptions[0];
        const component = shallow(<SortComponent options={defaultOptions} defaultOption={defaultOption} />);

        const input = component.find("input").first();

        expect(input.prop("value")).toBe(defaultOption.caption);
    });

    describe("when value changes", () => {
        it("calls updateFilters when value changes", () => {
            const onClickProps = { preventDefault: jest.fn(), stopPropagation: jest.fn() };
            const updateSortHandler = jest.fn();
            const component = shallow(<SortComponent options={defaultOptions} updateSort={updateSortHandler} />);

            const input = component.find("input");
            input.simulate("click", onClickProps);

            const item = component.find("li").first();
            item.simulate("click", onClickProps);

            expect(updateSortHandler).toBeCalled();
        });
        it("shows selected option on input value", () => {
            const onClickProps = { preventDefault: jest.fn(), stopPropagation: jest.fn() };
            const defaultOption = defaultOptions[1];
            const component = shallow(<SortComponent options={defaultOptions} defaultOption={defaultOption} />);

            const input = component.find("input");
            input.simulate("click", onClickProps);

            expect(component.find("input").first().prop("value")).toBe(defaultOption.caption);

            const item = component.find("li").last(); // [cap 3: val:_3]
            item.simulate("click", onClickProps);

            expect(component.find("input").first().prop("value")).toBe(defaultOptions[2].caption);
        });
    });

    describe("focus", () => {
        beforeEach(() => (document.body.innerHTML = ""));

        it("changes focused element when pressing the input", () => {
            const component = renderTestingLib(
                <SortComponent options={defaultOptions} emptyOptionCaption="Click me" />
            );

            expect(document.body).toHaveFocus();
            const input = component.getByPlaceholderText("Click me");
            expect(input).toBeDefined();
            fireEvent.click(input);

            jest.advanceTimersByTime(10);

            const items = component.getAllByRole("menuitem");
            expect(items[0]).toHaveFocus();
        });

        it("changes focused element back to the input when pressing shift+tab in the first element", () => {
            const component = renderTestingLib(
                <SortComponent options={defaultOptions} emptyOptionCaption="Click me" />
            );

            expect(document.body).toHaveFocus();

            const input = component.getByPlaceholderText("Click me");
            expect(input).toBeDefined();
            fireEvent.click(input);

            jest.advanceTimersByTime(10);

            const items = component.getAllByRole("menuitem");
            expect(items[0]).toHaveFocus();

            userEvent.tab({ shift: true });

            jest.advanceTimersByTime(10);

            expect(input).toHaveFocus();
        });

        it("changes focused element back to the input when pressing tab on the last item", () => {
            const component = renderTestingLib(
                <SortComponent options={[{ caption: "1", value: "_1" }]} emptyOptionCaption="Click me" />
            );

            expect(document.body).toHaveFocus();

            const input = component.getByPlaceholderText("Click me");
            fireEvent.click(input);

            jest.advanceTimersByTime(10);

            const items = component.getAllByRole("menuitem");
            expect(items[0]).toHaveFocus();

            userEvent.tab();
            expect(items[1]).toHaveFocus();
            userEvent.tab();

            jest.advanceTimersByTime(10);

            expect(input).toHaveFocus();
        });

        it("changes focused element back to the input when pressing escape on the last item", () => {
            const component = renderTestingLib(
                <SortComponent options={[{ caption: "1", value: "_1" }]} emptyOptionCaption="Click me" />
            );

            expect(document.body).toHaveFocus();

            const input = component.getByPlaceholderText("Click me");
            fireEvent.click(input);

            jest.advanceTimersByTime(10);

            const items = component.getAllByRole("menuitem");
            expect(items[0]).toHaveFocus();

            userEvent.tab();

            expect(items[1]).toHaveFocus();

            userEvent.keyboard("{esc}");

            jest.advanceTimersByTime(10);

            expect(input).toHaveFocus();
        });
    });
});
