import { Alert, FilterContextValue } from "@mendix/piw-utils-internal/components/web";
import { actionValue, dynamicValue, EditableValueBuilder, ListAttributeValueBuilder } from "@mendix/piw-utils-internal";
import { mount } from "enzyme";
import { render, fireEvent, screen } from "@testing-library/react";
import { createContext, createElement } from "react";
import DatagridDateFilter from "../../DatagridDateFilter";

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
});
