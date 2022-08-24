import { render } from "enzyme";
import { createElement } from "react";
import { render as renderTestingLib, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { ColumnSelector, ColumnSelectorProps } from "../ColumnSelector";
import { ColumnProperty } from "../Table";

let useIsElementInViewportMock = jest.fn(() => true);

jest.mock("../../utils/useIsElementInViewport", () => ({
    useIsElementInViewport: () => useIsElementInViewportMock()
}));

jest.useFakeTimers();

describe("Column Selector", () => {
    it("renders the structure correctly", () => {
        const component = render(<ColumnSelector {...mockColumnSelectorProps()} />);

        expect(component).toMatchSnapshot();
    });

    describe("focus", () => {
        beforeEach(() => (document.body.innerHTML = ""));

        it("classname for the ul element in ColumnSelector is NOT set to overflow", () => {
            renderTestingLib(<ColumnSelector {...mockColumnSelectorProps()} />);
            expect(document.body).toHaveFocus();
            const button = screen.getByRole("button");
            expect(button).toBeDefined();
            fireEvent.click(button);

            const element = document.querySelector(".column-selectors");
            expect(element?.classList.contains("overflow")).toBe(false);
        });

        it("classname for the ul element in ColumnSelector IS set to overflow", () => {
            useIsElementInViewportMock = jest.fn(() => false);
            renderTestingLib(<ColumnSelector {...mockColumnSelectorProps()} />);
            expect(document.body).toHaveFocus();
            const button = screen.getByRole("button");
            expect(button).toBeDefined();
            fireEvent.click(button);

            const element = document.querySelector(".column-selectors");
            expect(element?.classList.contains("overflow")).toBe(true);
        });

        it("changes focused element when pressing the button", () => {
            renderTestingLib(<ColumnSelector {...mockColumnSelectorProps()} />);

            expect(document.body).toHaveFocus();
            const button = screen.getByRole("button");
            expect(button).toBeDefined();
            fireEvent.click(button);

            jest.advanceTimersByTime(10);

            const items = screen.getAllByRole("menuitem");
            expect(items[0]).toHaveFocus();
        });

        it("changes focused element back to the input when pressing shift+tab in the first element", () => {
            renderTestingLib(<ColumnSelector {...mockColumnSelectorProps()} />);

            expect(document.body).toHaveFocus();

            const button = screen.getByRole("button");
            expect(button).toBeDefined();
            fireEvent.click(button);

            jest.advanceTimersByTime(10);

            const items = screen.getAllByRole("menuitem");
            expect(items[0]).toHaveFocus();

            userEvent.tab({ shift: true });

            jest.advanceTimersByTime(10);

            expect(button).toHaveFocus();
        });

        it("changes focused element back to the input when pressing tab on the last item", () => {
            renderTestingLib(
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

            const button = screen.getByRole("button");
            fireEvent.click(button);

            jest.advanceTimersByTime(10);

            const items = screen.getAllByRole("menuitem");
            expect(items[0]).toHaveFocus();

            userEvent.tab();
            expect(items[1]).toHaveFocus();
            userEvent.tab();

            jest.advanceTimersByTime(10);

            expect(button).toHaveFocus();
        });

        it("changes focused element back to the input when pressing escape on any item", () => {
            renderTestingLib(
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
                                canHide: false
                            },
                            {
                                id: "id3",
                                header: "Test3",
                                canHide: true
                            },
                            {
                                id: "id4",
                                header: "Test4",
                                canHide: true
                            }
                        ] as ColumnProperty[]
                    }
                />
            );

            expect(document.body).toHaveFocus();

            const button = screen.getByRole("button");
            fireEvent.click(button);

            jest.advanceTimersByTime(10);

            const items = screen.getAllByRole("menuitem");
            expect(items).toHaveLength(3);
            expect(items[0]).toHaveFocus();

            userEvent.tab();
            expect(items[1]).toHaveFocus();

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
