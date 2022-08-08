import "@testing-library/jest-dom";
import { Alert, FilterContextValue } from "@mendix/piw-utils-internal/components/web";
import { actionValue, dynamicValue, EditableValueBuilder, ListAttributeValueBuilder } from "@mendix/piw-utils-internal";
import { mount } from "enzyme";
import { render, fireEvent, screen, act } from "@testing-library/react";
import { createContext, createElement } from "react";
import DatagridDateFilter from "../../DatagridDateFilter";
import { MXGlobalObject, MXSessionConfig } from "../../../typings/global";

function createMXObjectMock(code: string, langTag: string, firstDayOfWeek = 0): MXGlobalObject {
    return {
        session: {
            getConfig: (): MXSessionConfig => ({
                locale: {
                    code,
                    firstDayOfWeek,
                    languageTag: langTag,
                    patterns: {
                        date: "d.M.y",
                        datetime: "d.M.y H.mm",
                        time: "H.mm"
                    }
                }
            })
        }
    };
}

const commonProps = {
    class: "filter-custom-class",
    tabIndex: 0,
    name: "filter-test",
    defaultFilter: "equal" as const,
    adjustable: true,
    advanced: false
};

const mxObject = {
    session: {
        getConfig: () => ({
            locale: {
                languageTag: "en-US",
                patterns: {
                    date: "dd/MM/yyyy"
                }
            }
        })
    }
};

describe("Date Filter", () => {
    describe("with single instance", () => {
        afterEach(() => {
            delete (global as any)["com.mendix.widgets.web.UUID"];
        });

        describe("with single attribute", () => {
            beforeAll(() => {
                (window as any)["com.mendix.widgets.web.filterable.filterContext"] = createContext({
                    filterDispatcher: jest.fn(),
                    singleAttribute: new ListAttributeValueBuilder().withType("DateTime").withFilterable(true).build()
                } as FilterContextValue);
                (window as any).mx = mxObject;

                jest.spyOn(global.Math, "random").mockReturnValue(0.123456789);
            });

            it("renders correctly", () => {
                const { asFragment } = render(<DatagridDateFilter {...commonProps} />);

                expect(asFragment()).toMatchSnapshot();
            });

            it("triggers attribute and onchange action on change filter value", () => {
                const action = actionValue();
                const attribute = new EditableValueBuilder<Date>().build();
                render(
                    <DatagridDateFilter
                        {...commonProps}
                        onChange={action}
                        valueAttribute={attribute}
                        placeholder={dynamicValue("Placeholder")}
                    />
                );

                fireEvent.input(screen.getByPlaceholderText("Placeholder"), { target: { value: "01/12/2020" } });

                expect(action.execute).toBeCalledTimes(1);
                expect(attribute.setValue).toBeCalledTimes(1);
            });

            describe("with defaultValue", () => {
                it("initialize with defaultValue", async () => {
                    // 946684800000 = 01.01.2000
                    const date = new Date(946684800000);
                    render(<DatagridDateFilter {...commonProps} defaultValue={dynamicValue<Date>(date)} />);
                    expect(screen.getByRole("textbox")).toHaveValue("01/01/2000");
                });

                it("sync value when defaultValue changes from undefined to date", async () => {
                    // 946684800000 = 01.01.2000
                    const date = new Date(946684800000);
                    const { rerender } = render(<DatagridDateFilter {...commonProps} defaultValue={undefined} />);
                    expect(screen.getByRole("textbox")).toHaveValue("");

                    rerender(<DatagridDateFilter {...commonProps} defaultValue={dynamicValue<Date>(date)} />);
                    expect(screen.getByRole("textbox")).toHaveValue("01/01/2000");
                });

                it("sync value when defaultValue changes from date to undefined", async () => {
                    // 946684800000 = 01.01.2000
                    const date = new Date(946684800000);
                    const { rerender } = render(
                        <DatagridDateFilter {...commonProps} defaultValue={dynamicValue<Date>(date)} />
                    );
                    expect(screen.getByRole("textbox")).toHaveValue("01/01/2000");

                    rerender(<DatagridDateFilter {...commonProps} defaultValue={undefined} />);
                    expect(screen.getByRole("textbox")).toHaveValue("");
                });
            });

            afterAll(() => {
                (window as any)["com.mendix.widgets.web.filterable.filterContext"] = undefined;
            });
        });

        describe("with multiple attributes", () => {
            beforeAll(() => {
                (window as any)["com.mendix.widgets.web.filterable.filterContext"] = createContext({
                    filterDispatcher: jest.fn(),
                    multipleAttributes: {
                        attribute1: new ListAttributeValueBuilder()
                            .withId("attribute1")
                            .withType("DateTime")
                            .withFilterable(true)
                            .build(),
                        attribute2: new ListAttributeValueBuilder()
                            .withId("attribute2")
                            .withType("DateTime")
                            .withFilterable(true)
                            .build()
                    }
                } as FilterContextValue);
                (window as any).mx = mxObject;

                jest.spyOn(global.Math, "random").mockReturnValue(0.123456789);
            });

            it("renders correctly", () => {
                const { asFragment } = render(<DatagridDateFilter {...commonProps} />);

                expect(asFragment()).toMatchSnapshot();
            });

            afterAll(() => {
                (window as any)["com.mendix.widgets.web.filterable.filterContext"] = undefined;
            });
        });

        describe("with wrong attribute's type", () => {
            beforeAll(() => {
                (window as any)["com.mendix.widgets.web.filterable.filterContext"] = createContext({
                    filterDispatcher: jest.fn(),
                    singleAttribute: new ListAttributeValueBuilder().withType("Decimal").withFilterable(true).build()
                } as FilterContextValue);
                (window as any).mx = mxObject;
            });

            it("renders error message", () => {
                const filter = mount(<DatagridDateFilter {...commonProps} />);

                expect(filter.find(Alert).text()).toBe(
                    "The attribute type being used for Date filter is not 'Date and time'"
                );
            });

            afterAll(() => {
                (window as any)["com.mendix.widgets.web.filterable.filterContext"] = undefined;
            });
        });

        describe("with wrong multiple attributes' types", () => {
            beforeAll(() => {
                (window as any)["com.mendix.widgets.web.filterable.filterContext"] = createContext({
                    filterDispatcher: jest.fn(),
                    multipleAttributes: {
                        attribute1: new ListAttributeValueBuilder()
                            .withId("attribute1")
                            .withType("String")
                            .withFilterable(true)
                            .build(),
                        attribute2: new ListAttributeValueBuilder()
                            .withId("attribute2")
                            .withType("Decimal")
                            .withFilterable(true)
                            .build()
                    }
                } as FilterContextValue);
                (window as any).mx = mxObject;
            });

            it("renders error message", () => {
                const filter = mount(<DatagridDateFilter {...commonProps} />);

                expect(filter.find(Alert).text()).toBe(
                    'The Date filter widget can\'t be used with the filters options you have selected. It requires a "Date and Time" attribute to be selected.'
                );
            });

            afterAll(() => {
                (window as any)["com.mendix.widgets.web.filterable.filterContext"] = undefined;
            });
        });

        describe("with no context", () => {
            beforeAll(() => {
                (window as any)["com.mendix.widgets.web.filterable.filterContext"] = undefined;
                (window as any).mx = mxObject;
            });

            it("renders error message", () => {
                const filter = mount(<DatagridDateFilter {...commonProps} />);

                expect(filter.find(Alert).text()).toBe(
                    "The Date filter widget must be placed inside the header of the Data grid 2.0 or Gallery widget."
                );
            });
        });
    });

    describe("with multiple instances", () => {
        beforeAll(() => {
            (window as any)["com.mendix.widgets.web.filterable.filterContext"] = createContext({
                filterDispatcher: jest.fn(),
                singleAttribute: new ListAttributeValueBuilder().withType("DateTime").withFilterable(true).build()
            } as FilterContextValue);
            (window as any).mx = mxObject;

            jest.spyOn(global.Math, "random").mockReturnValue(0.123456789);
        });

        it("renders with a unique id", () => {
            const { asFragment: fragment1 } = render(<DatagridDateFilter {...commonProps} />);
            const { asFragment: fragment2 } = render(<DatagridDateFilter {...commonProps} />);

            expect(fragment1().querySelector("span")?.id).not.toBe(fragment2().querySelector("span")?.id);
        });

        afterAll(() => {
            (window as any)["com.mendix.widgets.web.filterable.filterContext"] = undefined;
            delete (global as any)["com.mendix.widgets.web.UUID"];
        });
    });

    describe("with session config", () => {
        let oldMxObject: MXGlobalObject;
        beforeEach(() => {
            (window as any)["com.mendix.widgets.web.filterable.filterContext"] = createContext({
                filterDispatcher: jest.fn(),
                singleAttribute: new ListAttributeValueBuilder().withType("DateTime").withFilterable(true).build()
            } as FilterContextValue);
            oldMxObject = window.mx;
        });

        it("has correct short week days for en-US", async () => {
            window.mx = createMXObjectMock("en_US", "en-US");
            render(<DatagridDateFilter {...commonProps} defaultValue={dynamicValue(new Date("2021-12-10"))} />);

            const open = screen.getByLabelText("Show calendar");
            await act(async () => {
                fireEvent.click(open);
            });
            const header = screen.getByText(/december 2021/gi).parentElement?.lastChild;
            expect(header?.textContent).toEqual("SuMoTuWeThFrSa");
        });

        it("has correct short week days for en-US and starts week at Monday", async () => {
            window.mx = createMXObjectMock("en_US", "en-US", 1);
            render(<DatagridDateFilter {...commonProps} defaultValue={dynamicValue(new Date("2021-12-10"))} />);

            const open = screen.getByLabelText("Show calendar");
            await act(async () => {
                fireEvent.click(open);
            });
            const header = screen.getByText(/december 2021/gi).parentElement?.lastChild;
            expect(header?.textContent).toEqual("MoTuWeThFrSaSu");
        });

        it("has correct short week days for pt-Br", async () => {
            window.mx = createMXObjectMock("pt_BR", "pt-BR");
            render(<DatagridDateFilter {...commonProps} defaultValue={dynamicValue(new Date("2021-12-10"))} />);

            const open = screen.getByLabelText("Show calendar");
            await act(async () => {
                fireEvent.click(open);
            });
            const header = screen.getByText(/dezembro 2021/gi).parentElement?.lastChild;
            expect(header?.textContent).toEqual("domsegterquaquisexsab");
        });

        it("has correct short week days for fi-FI and starts on monday", async () => {
            window.mx = createMXObjectMock("fi_FI", "fi-FI", 1);
            render(<DatagridDateFilter {...commonProps} defaultValue={dynamicValue(new Date("2021-12-10"))} />);

            const open = screen.getByLabelText("Show calendar");
            await act(async () => {
                fireEvent.click(open);
            });
            const header = screen.getByText(/joulukuu 2021/gi).parentElement?.lastChild;
            expect(header?.textContent).toEqual("matiketopelasu");
        });

        it("has correct short week days for fi-FI", async () => {
            window.mx = createMXObjectMock("fi_FI", "fi-FI");
            render(<DatagridDateFilter {...commonProps} defaultValue={dynamicValue(new Date("2021-12-10"))} />);

            const open = screen.getByLabelText("Show calendar");
            await act(async () => {
                fireEvent.click(open);
            });
            const header = screen.getByText(/joulukuu 2021/gi).parentElement?.lastChild;
            expect(header?.textContent).toEqual("sumatiketopela");
        });

        afterEach(() => {
            window.mx = oldMxObject;
        });
    });
});
