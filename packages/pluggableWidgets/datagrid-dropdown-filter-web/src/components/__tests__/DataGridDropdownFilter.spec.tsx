import { Alert, FilterContextValue } from "@mendix/piw-utils-internal/components/web";
import { dynamicValue, ListAttributeValueBuilder } from "@mendix/piw-utils-internal";
import { createContext, createElement } from "react";
import DatagridDropdownFilter from "../../DatagridDropdownFilter";
import { render } from "@testing-library/react";
import { mount } from "enzyme";
import { FilterComponent } from "../FilterComponent";

const commonProps = {
    class: "filter-custom-class",
    tabIndex: 0,
    name: "filter-test"
};

describe("Dropdown Filter", () => {
    afterEach(() => {
        delete (global as any)["com.mendix.widgets.web.UUID"];
    });

    describe("with single attribute", () => {
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
