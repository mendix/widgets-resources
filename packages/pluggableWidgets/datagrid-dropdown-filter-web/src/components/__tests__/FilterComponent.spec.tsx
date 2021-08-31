import { mount, render, shallow } from "enzyme";
import { createElement } from "react";
import { FilterComponent } from "../FilterComponent";
import { render as renderTestingLib, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

const defaultOptions = [
    { caption: "1", value: "_1" },
    { caption: "2", value: "_2" },
    { caption: "3", value: "_3" }
];

jest.useFakeTimers();

describe("Filter selector", () => {
    describe("with single selection", () => {
        describe("renders correctly", () => {
            it("with options", () => {
                const component = render(<FilterComponent options={defaultOptions} />);

                expect(component).toMatchSnapshot();
            });
            it("with no options", () => {
                const component = render(<FilterComponent options={[]} />);

                expect(component).toMatchSnapshot();
            });
            it("with ariaLabel", () => {
                const component = render(<FilterComponent options={defaultOptions} ariaLabel="my label" />);

                expect(component).toMatchSnapshot();
            });
            it("with emptyOptioncaption", () => {
                const component = render(<FilterComponent options={defaultOptions} emptyOptionCaption={"find me"} />);

                expect(component).toMatchSnapshot();
                expect(component.find("input").first().prop("placeholder")).toBe("find me");
            });
        });
        it("selects default option", () => {
            const defaultOption = defaultOptions[0];
            const component = shallow(<FilterComponent options={defaultOptions} defaultValue={defaultOption.value} />);

            const input = component.find("input").first();

            expect(input.prop("value")).toBe(defaultOption.caption);
        });

        describe("when value changes", () => {
            it("calls updateFilters when value changes", () => {
                const onClickProps = { preventDefault: jest.fn(), stopPropagation: jest.fn() };
                const updateFilterHandler = jest.fn();
                const component = shallow(
                    <FilterComponent options={defaultOptions} updateFilters={updateFilterHandler} />
                );

                const input = component.find("input");
                input.simulate("click", onClickProps);

                const item = component.find("li").first();
                item.simulate("click", onClickProps);

                expect(updateFilterHandler).toBeCalled();
            });
            it("shows selected option on input value", () => {
                const onClickProps = { preventDefault: jest.fn(), stopPropagation: jest.fn() };
                const defaultOption = defaultOptions[1];
                const component = shallow(
                    <FilterComponent options={defaultOptions} defaultValue={defaultOption.value} />
                );

                const input = component.find("input");
                input.simulate("click", onClickProps);

                expect(component.find("input").first().prop("value")).toBe(defaultOption.caption);

                const item = component.find("li").last(); // [cap 3: val:_3]
                item.simulate("click", onClickProps);

                expect(component.find("input").first().prop("value")).toBe(defaultOptions[2].caption);
            });
        });
    });

    describe("with multi selection", () => {
        describe("renders correctly", () => {
            it("with options", () => {
                const component = render(<FilterComponent multiSelect options={defaultOptions} />);

                expect(component).toMatchSnapshot();
            });
            it("with no options", () => {
                const component = render(<FilterComponent multiSelect options={[]} />);

                expect(component).toMatchSnapshot();
            });
            it("with ariaLabel", () => {
                const component = render(<FilterComponent options={defaultOptions} multiSelect ariaLabel="my label" />);

                expect(component).toMatchSnapshot();
            });
            it("with emptyOptioncaption", () => {
                const component = render(
                    <FilterComponent multiSelect options={defaultOptions} emptyOptionCaption={"find me"} />
                );

                expect(component).toMatchSnapshot();
                expect(component.find("input").first().prop("placeholder")).toBe("find me");
            });
        });

        describe("with default options set", () => {
            it("selects single default option", () => {
                const defaultOption = defaultOptions[0];
                const component = shallow(
                    <FilterComponent multiSelect options={defaultOptions} defaultValue={defaultOption.value} />
                );

                const input = component.find("input").first();

                expect(input.prop("value")).toBe(defaultOption.caption);
            });

            it("selects multiple default options", () => {
                const defaultValue = `${defaultOptions[0].value},${defaultOptions[1].value}`;

                const component = shallow(
                    <FilterComponent multiSelect options={defaultOptions} defaultValue={defaultValue} />
                );

                const input = component.find("input").first();
                const expectedCaptions = `${defaultOptions[0].caption},${defaultOptions[1].caption}`;
                expect(input.prop("value")).toBe(expectedCaptions);
            });

            it("filters incorrect default options", () => {
                const inCorrectDefaultValue = `${defaultOptions[0].value},${defaultOptions[1].value},SomeRandomText`;

                const component = shallow(
                    <FilterComponent multiSelect options={defaultOptions} defaultValue={inCorrectDefaultValue} />
                );

                const input = component.find("input").first();

                const expectedCaptions = `${defaultOptions[0].caption},${defaultOptions[1].caption}`;
                expect(input.prop("value")).toBe(expectedCaptions);
            });
        });

        describe("when value changes", () => {
            it("calls updateFilters when value changes", () => {
                const onClickProps = { preventDefault: jest.fn(), stopPropagation: jest.fn() };
                const updateFiltersHandler = jest.fn();
                const component = mount(
                    <FilterComponent multiSelect options={defaultOptions} updateFilters={updateFiltersHandler} />
                );

                const input = component.find("input");
                input.simulate("click", onClickProps);

                const item = component.find("li").first();
                item.simulate("click", onClickProps);

                expect(updateFiltersHandler).toBeCalled();
            });
            it("shows selected options on input value", () => {
                const onClickProps = { preventDefault: jest.fn(), stopPropagation: jest.fn() };
                const component = mount(<FilterComponent multiSelect options={defaultOptions} />);

                const input = component.find("input");
                input.simulate("click", onClickProps);

                const item = component.find("li").at(1);
                item.simulate("click", onClickProps);
                const item2 = component.find("li").at(2);
                item2.simulate("click", onClickProps);

                expect(component.find("input").first().prop("value")).toBe("2,3");
            });
        });
    });

    describe("focus", () => {
        beforeEach(() => (document.body.innerHTML = ""));

        it("changes focused element when pressing the input", () => {
            renderTestingLib(<FilterComponent options={defaultOptions} emptyOptionCaption="Click me" />);

            expect(document.body).toHaveFocus();
            const input = screen.getByPlaceholderText("Click me");
            expect(input).toBeDefined();
            fireEvent.click(input);

            jest.advanceTimersByTime(10);

            const items = screen.getAllByRole("menuitem");
            expect(items[0]).toHaveFocus();
        });

        it("changes focused element back to the input when pressing shift+tab in the first element", () => {
            renderTestingLib(<FilterComponent options={defaultOptions} emptyOptionCaption="Click me" />);

            expect(document.body).toHaveFocus();

            const input = screen.getByPlaceholderText("Click me");
            expect(input).toBeDefined();
            fireEvent.click(input);

            jest.advanceTimersByTime(10);

            const items = screen.getAllByRole("menuitem");
            expect(items[0]).toHaveFocus();

            userEvent.tab({ shift: true });

            jest.advanceTimersByTime(10);

            expect(input).toHaveFocus();
        });

        it("changes focused element back to the input when pressing tab on the last item", () => {
            renderTestingLib(
                <FilterComponent options={[{ caption: "1", value: "_1" }]} emptyOptionCaption="Click me" />
            );

            expect(document.body).toHaveFocus();

            const input = screen.getByPlaceholderText("Click me");
            fireEvent.click(input);

            jest.advanceTimersByTime(10);

            const items = screen.getAllByRole("menuitem");
            expect(items[0]).toHaveFocus();

            userEvent.tab();
            expect(items[1]).toHaveFocus();
            userEvent.tab();

            jest.advanceTimersByTime(10);

            expect(input).toHaveFocus();
        });

        it("changes focused element back to the input when pressing escape on any item", () => {
            renderTestingLib(
                <FilterComponent
                    options={[
                        { caption: "1", value: "_1" },
                        { caption: "2", value: "_2" }
                    ]}
                    emptyOptionCaption="Click me"
                />
            );

            expect(document.body).toHaveFocus();

            const input = screen.getByPlaceholderText("Click me");
            fireEvent.click(input);

            jest.advanceTimersByTime(10);

            const items = screen.getAllByRole("menuitem");
            expect(items).toHaveLength(3);
            expect(items[0]).toHaveFocus();

            userEvent.tab();

            expect(items[1]).toHaveFocus();

            userEvent.keyboard("{esc}");

            jest.advanceTimersByTime(10);

            expect(input).toHaveFocus();
        });
    });
});
