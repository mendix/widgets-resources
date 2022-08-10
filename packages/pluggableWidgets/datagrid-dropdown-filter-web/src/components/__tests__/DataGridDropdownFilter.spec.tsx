import "@testing-library/jest-dom";
import { Alert, FilterContextValue } from "@mendix/piw-utils-internal/components/web";
import { actionValue, dynamicValue, EditableValueBuilder, ListAttributeValueBuilder } from "@mendix/piw-utils-internal";
import { createContext, createElement } from "react";
import DatagridDropdownFilter from "../../DatagridDropdownFilter";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { mount } from "enzyme";
import { FilterComponent } from "../FilterComponent";

const commonProps = {
    class: "filter-custom-class",
    tabIndex: 0,
    name: "filter-test",
    advanced: false
};

describe("Dropdown Filter", () => {
    describe("with single instance", () => {
        afterEach(() => {
            delete (global as any)["com.mendix.widgets.web.UUID"];
        });

        describe("with single attribute", () => {
            function mockCtx(universe: string[]): void {
                (window as any)["com.mendix.widgets.web.filterable.filterContext"] = createContext({
                    filterDispatcher: jest.fn(),
                    singleAttribute: new ListAttributeValueBuilder()
                        .withUniverse(universe)
                        .withType("Enum")
                        .withFilterable(true)
                        .withFormatter(
                            value => value,
                            () => console.log("Parsed")
                        )
                        .build()
                } as FilterContextValue);
            }
            beforeAll(() => {
                mockCtx(["enum_value_1", "enum_value_2"]);
            });

            describe("with auto options", () => {
                it("loads correct values from universe", () => {
                    const filter = mount(
                        <DatagridDropdownFilter {...commonProps} auto multiSelect={false} filterOptions={[]} />
                    );

                    expect(filter.find(FilterComponent).prop("options")).toStrictEqual([
                        {
                            caption: "enum_value_1",
                            value: "enum_value_1"
                        },
                        {
                            caption: "enum_value_2",
                            value: "enum_value_2"
                        }
                    ]);
                });
            });

            describe("DOM structure", () => {
                it("renders correctly", () => {
                    const { asFragment } = render(
                        <DatagridDropdownFilter {...commonProps} auto multiSelect={false} filterOptions={[]} />
                    );

                    expect(asFragment()).toMatchSnapshot();
                });
            });

            it("triggers attribute and onchange action on change filter value", () => {
                const action = actionValue();
                const attribute = new EditableValueBuilder<string>().build();
                render(
                    <DatagridDropdownFilter
                        {...commonProps}
                        auto
                        multiSelect={false}
                        filterOptions={[]}
                        onChange={action}
                        valueAttribute={attribute}
                    />
                );

                fireEvent.click(screen.getByRole("textbox"));
                fireEvent.click(screen.getAllByRole("menuitem")[2]);

                expect(action.execute).toBeCalledTimes(1);
                expect(attribute.setValue).toBeCalledWith("enum_value_2");
            });

            describe("with defaultValue", () => {
                it("initialize component with defaultValue", () => {
                    render(
                        <DatagridDropdownFilter
                            {...commonProps}
                            auto
                            multiSelect={false}
                            filterOptions={[]}
                            defaultValue={dynamicValue<string>("enum_value_1")}
                        />
                    );

                    expect(screen.getByRole("textbox")).toHaveValue("enum_value_1");
                });

                it("sync defaultValue with state when defaultValue changes from undefined to string", async () => {
                    const { rerender } = render(
                        <DatagridDropdownFilter
                            {...commonProps}
                            auto
                            multiSelect={false}
                            filterOptions={[]}
                            defaultValue={dynamicValue<string>("")}
                        />
                    );

                    await waitFor(() => {
                        expect(screen.getByRole("textbox")).toHaveValue("");
                    });

                    // “Real” context causes widgets to re-renders multiple times, replicate this in mocked context.
                    rerender(
                        <DatagridDropdownFilter
                            {...commonProps}
                            auto
                            multiSelect={false}
                            filterOptions={[]}
                            defaultValue={dynamicValue<string>("")}
                        />
                    );
                    rerender(
                        <DatagridDropdownFilter
                            {...commonProps}
                            auto
                            multiSelect={false}
                            filterOptions={[]}
                            defaultValue={dynamicValue<string>("enum_value_1")}
                        />
                    );

                    await waitFor(() => {
                        expect(screen.getByRole("textbox")).toHaveValue("enum_value_1");
                    });
                });

                it("sync defaultValue with state when defaultValue changes from string to undefined", async () => {
                    mockCtx(["xyz", "abc"]);
                    const { rerender } = render(
                        <DatagridDropdownFilter
                            {...commonProps}
                            auto
                            multiSelect={false}
                            filterOptions={[]}
                            defaultValue={dynamicValue<string>("xyz")}
                        />
                    );

                    expect(screen.getByRole("textbox")).toHaveValue("xyz");

                    // “Real” context causes widgets to re-renders multiple times, replicate this in mocked context.
                    rerender(
                        <DatagridDropdownFilter
                            {...commonProps}
                            auto
                            multiSelect={false}
                            filterOptions={[]}
                            defaultValue={dynamicValue<string>("xyz")}
                        />
                    );
                    rerender(
                        <DatagridDropdownFilter
                            {...commonProps}
                            auto
                            multiSelect={false}
                            filterOptions={[]}
                            defaultValue={undefined}
                        />
                    );

                    await waitFor(() => {
                        expect(screen.getByRole("textbox")).toHaveValue("");
                    });
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
                            .withUniverse(["enum_value_1", "enum_value_2"])
                            .withType("Enum")
                            .withFilterable(true)
                            .withFormatter(
                                value => value,
                                () => console.log("Parsed")
                            )
                            .build(),
                        attribute2: new ListAttributeValueBuilder()
                            .withId("attribute2")
                            .withUniverse([true, false])
                            .withType("Boolean")
                            .withFilterable(true)
                            .withFormatter(
                                value => (value ? "Yes" : "No"),
                                () => console.log("Parsed")
                            )
                            .build()
                    }
                } as FilterContextValue);
            });

            describe("with auto options", () => {
                it("loads correct values from universes", () => {
                    const filter = mount(
                        <DatagridDropdownFilter {...commonProps} auto multiSelect={false} filterOptions={[]} />
                    );

                    expect(filter.find(FilterComponent).prop("options")).toStrictEqual([
                        {
                            caption: "enum_value_1",
                            value: "enum_value_1"
                        },
                        {
                            caption: "enum_value_2",
                            value: "enum_value_2"
                        },
                        {
                            caption: "Yes",
                            value: "true"
                        },
                        {
                            caption: "No",
                            value: "false"
                        }
                    ]);
                });
            });

            afterAll(() => {
                (window as any)["com.mendix.widgets.web.filterable.filterContext"] = undefined;
            });
        });

        describe("with wrong attribute's type", () => {
            beforeAll(() => {
                (window as any)["com.mendix.widgets.web.filterable.filterContext"] = createContext({
                    filterDispatcher: jest.fn(),
                    singleAttribute: new ListAttributeValueBuilder().withType("String").withFilterable(true).build()
                } as FilterContextValue);
            });

            it("renders error message", () => {
                const filter = mount(
                    <DatagridDropdownFilter {...commonProps} auto multiSelect={false} filterOptions={[]} />
                );

                expect(filter.find(Alert).text()).toBe(
                    "The attribute type being used for Drop-down filter is not 'Boolean or Enumeration'"
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
            });

            it("renders error message", () => {
                const filter = mount(
                    <DatagridDropdownFilter {...commonProps} auto multiSelect={false} filterOptions={[]} />
                );

                expect(filter.find(Alert).text()).toBe(
                    'The Drop-down filter widget can\'t be used with the filters options you have selected. It requires a "Boolean or Enumeration" attribute to be selected.'
                );
            });

            afterAll(() => {
                (window as any)["com.mendix.widgets.web.filterable.filterContext"] = undefined;
            });
        });

        describe("with no context", () => {
            beforeAll(() => {
                (window as any)["com.mendix.widgets.web.filterable.filterContext"] = undefined;
            });

            it("renders error message", () => {
                const filter = mount(
                    <DatagridDropdownFilter {...commonProps} auto multiSelect={false} filterOptions={[]} />
                );

                expect(filter.find(Alert).text()).toBe(
                    "The Drop-down filter widget must be placed inside the header of the Data grid 2.0 or Gallery widget."
                );
            });
        });

        describe("with invalid values", () => {
            beforeAll(() => {
                (window as any)["com.mendix.widgets.web.filterable.filterContext"] = createContext({
                    filterDispatcher: jest.fn(),
                    singleAttribute: new ListAttributeValueBuilder()
                        .withUniverse(["enum_value_1", "enum_value_2"])
                        .withType("Enum")
                        .withFilterable(true)
                        .build()
                } as FilterContextValue);
            });

            it("renders error message", () => {
                const filter = mount(
                    <DatagridDropdownFilter
                        {...commonProps}
                        auto={false}
                        multiSelect={false}
                        filterOptions={[
                            {
                                caption: dynamicValue<string>("wrong value"),
                                value: dynamicValue<string>("enum_value_3")
                            }
                        ]}
                    />
                );

                expect(filter.find(Alert).text()).toBe("There are invalid values available in the Drop-down filter");
            });
        });

        describe("with multiple invalid values", () => {
            beforeAll(() => {
                (window as any)["com.mendix.widgets.web.filterable.filterContext"] = createContext({
                    filterDispatcher: jest.fn(),
                    multipleAttributes: {
                        attribute1: new ListAttributeValueBuilder()
                            .withUniverse(["enum_value_1", "enum_value_2"])
                            .withType("Enum")
                            .withFilterable(true)
                            .build(),
                        attribute2: new ListAttributeValueBuilder()
                            .withUniverse([true, false])
                            .withType("Boolean")
                            .withFilterable(true)
                            .build()
                    }
                } as FilterContextValue);
            });

            it("renders error message", () => {
                const filter = mount(
                    <DatagridDropdownFilter
                        {...commonProps}
                        auto={false}
                        multiSelect={false}
                        filterOptions={[
                            {
                                caption: dynamicValue<string>("wrong enum value"),
                                value: dynamicValue<string>("enum_value_3")
                            },
                            {
                                caption: dynamicValue<string>("wrong boolean value"),
                                value: dynamicValue<string>("no")
                            }
                        ]}
                    />
                );

                expect(filter.find(Alert).text()).toBe("There are invalid values available in the Drop-down filter");
            });
        });
    });

    describe("with multiple instances", () => {
        beforeAll(() => {
            (window as any)["com.mendix.widgets.web.filterable.filterContext"] = createContext({
                filterDispatcher: jest.fn(),
                singleAttribute: new ListAttributeValueBuilder()
                    .withUniverse(["enum_value_1", "enum_value_2"])
                    .withType("Enum")
                    .withFilterable(true)
                    .withFormatter(
                        value => value,
                        () => console.log("Parsed")
                    )
                    .build()
            } as FilterContextValue);
        });

        it("renders with a unique id", () => {
            const { asFragment: fragment1 } = render(
                <DatagridDropdownFilter {...commonProps} auto multiSelect={false} filterOptions={[]} />
            );
            const { asFragment: fragment2 } = render(
                <DatagridDropdownFilter {...commonProps} auto multiSelect={false} filterOptions={[]} />
            );

            expect(fragment1().querySelector("input")?.getAttribute("aria-controls")).not.toBe(
                fragment2().querySelector("input")?.getAttribute("aria-controls")
            );
        });

        afterAll(() => {
            (window as any)["com.mendix.widgets.web.filterable.filterContext"] = undefined;
            delete (global as any)["com.mendix.widgets.web.UUID"];
        });
    });
});
