import { Alert, FilterContextValue, ListAttributeValueBuilder } from "@mendix/piw-utils-internal";
import { mount } from "enzyme";
import { createContext, createElement } from "react";
import DatagridDateFilter from "../../DatagridDateFilter";

const commonProps = {
    class: "filter-test",
    tabIndex: 0,
    name: "filter-test",
    defaultFilter: "equal" as const,
    adjustable: true
};

const mxObject = {
    session: {
        getConfig: () => ({
            locale: {
                languageTag: "en-US",
                patterns: {
                    date: "dd/MM/YYYY"
                }
            }
        })
    }
};

describe("Date Filter", () => {
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
            const filter = mount(<DatagridDateFilter {...commonProps} />);

            expect(filter).toMatchSnapshot();
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
            const filter = mount(<DatagridDateFilter {...commonProps} />);

            expect(filter).toMatchSnapshot();
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
                'To use multiple filters you need to define a filter identification in the properties of Date filter or have a "Date and Time" attribute available.'
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
