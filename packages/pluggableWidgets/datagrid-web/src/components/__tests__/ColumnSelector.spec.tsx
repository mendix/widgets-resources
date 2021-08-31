import { shallow } from "enzyme";
import { createElement } from "react";
import { render as renderTestingLib, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { ColumnSelector, ColumnSelectorProps } from "../ColumnSelector";
import { ColumnProperty } from "../Table";

jest.useFakeTimers();

describe("Column Selector", () => {
    it("renders the structure correctly", () => {
        const component = shallow(<ColumnSelector {...mockColumnSelectorProps()} />);

        expect(component).toMatchSnapshot();
    });

    describe("focus", () => {
        beforeEach(() => (document.body.innerHTML = ""));

        it("changes focused element when pressing the button", () => {
            const component = renderTestingLib(<ColumnSelector {...mockColumnSelectorProps()} />);

            expect(document.body).toHaveFocus();
            const button = component.getByRole("button");
            expect(button).toBeDefined();
            fireEvent.click(button);

            jest.advanceTimersByTime(10);

            const items = component.getAllByRole("menuitem");
            expect(items[0]).toHaveFocus();
        });

        it("changes focused element back to the input when pressing shift+tab in the first element", () => {
            const component = renderTestingLib(<ColumnSelector {...mockColumnSelectorProps()} />);

            expect(document.body).toHaveFocus();

            const button = component.getByRole("button");
            expect(button).toBeDefined();
            fireEvent.click(button);

            jest.advanceTimersByTime(10);

            const items = component.getAllByRole("menuitem");
            expect(items[0]).toHaveFocus();

            userEvent.tab({ shift: true });

            jest.advanceTimersByTime(10);

            expect(button).toHaveFocus();
        });

        it("changes focused element back to the input when pressing tab on the last item", () => {
            const component = renderTestingLib(
                <ColumnSelector
                    {...mockColumnSelectorProps()}
                    columns={
                        [
                            {
                                id: "id",
                                header: "Test",
                                canHide: true
                            },
                            {
                                id: "id2",
                                header: "Test2",
                                canHide: true
                            }
                        ] as ColumnProperty[]
                    }
                />
            );

            expect(document.body).toHaveFocus();

            const button = component.getByRole("button");
            fireEvent.click(button);

            jest.advanceTimersByTime(10);

            const items = component.getAllByRole("menuitem");
            expect(items[0]).toHaveFocus();

            userEvent.tab();
            expect(items[1]).toHaveFocus();
            userEvent.tab();

            jest.advanceTimersByTime(10);

            expect(button).toHaveFocus();
        });

        it("changes focused element back to the input when pressing escape on the last item", () => {
            const component = renderTestingLib(<ColumnSelector {...mockColumnSelectorProps()} />);

            expect(document.body).toHaveFocus();

            const button = component.getByRole("button");
            fireEvent.click(button);

            jest.advanceTimersByTime(10);

            const items = component.getAllByRole("menuitem");
            expect(items[0]).toHaveFocus();

            userEvent.keyboard("{esc}");

            jest.advanceTimersByTime(10);

            expect(button).toHaveFocus();
        });
    });
});

function mockColumnSelectorProps(): ColumnSelectorProps {
    return {
        columns: [
            {
                id: "id",
                header: "Test",
                canHide: true
            }
        ] as ColumnProperty[],
        hiddenColumns: [],
        setHiddenColumns: jest.fn()
    };
}
