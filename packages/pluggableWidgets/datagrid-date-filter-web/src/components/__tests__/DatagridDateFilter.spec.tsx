import { Alert, FilterContextValue } from "@mendix/piw-utils-internal/components/web";
import { ListAttributeValueBuilder } from "@mendix/piw-utils-internal";
import { mount } from "enzyme";
import { render } from "@testing-library/react";
import { createContext, createElement } from "react";
import DatagridDateFilter from "../../DatagridDateFilter";

const commonProps = {
    class: "filter-custom-class",
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
