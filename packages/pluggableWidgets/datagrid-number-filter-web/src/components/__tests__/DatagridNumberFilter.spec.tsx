import { Alert, FilterContextValue } from "@mendix/piw-utils-internal/components/web";
import { ListAttributeValueBuilder } from "@mendix/piw-utils-internal";
import { mount, render } from "enzyme";
import { createContext, createElement } from "react";
import { render as testingLibraryRender } from "@testing-library/react";

import DatagridNumberFilter from "../../DatagridNumberFilter";

const commonProps = {
    class: "filter-custom-class",
    tabIndex: 0,
    name: "filter-test",
    defaultFilter: "equal" as const,
    adjustable: true,
    delay: 1000
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

describe("Number Filter", () => {
    describe("with single instance", () => {
        afterEach(() => {
            delete (global as any)["com.mendix.widgets.web.UUID"];
        });

        describe("with single attribute", () => {
            beforeAll(() => {
                (window as any)["com.mendix.widgets.web.filterable.filterContext"] = createContext({
                    filterDispatcher: jest.fn(),
                    singleAttribute: new ListAttributeValueBuilder().withType("Long").withFilterable(true).build()
                } as FilterContextValue);
                (window as any).mx = mxObject;
            });

            it("renders correctly", () => {
                const filter = render(<DatagridNumberFilter {...commonProps} />);

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
                            .withType("Long")
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

            it("renders correctly", () => {
                const filter = render(<DatagridNumberFilter {...commonProps} />);

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
                    singleAttribute: new ListAttributeValueBuilder().withType("Boolean").withFilterable(true).build()
                } as FilterContextValue);
                (window as any).mx = mxObject;
            });

            it("renders error message", () => {
                const filter = mount(<DatagridNumberFilter {...commonProps} />);

                expect(filter.find(Alert).text()).toBe(
                    "The attribute type being used for Number filter is not 'Autonumber, Decimal, Integer or Long'"
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
                            .withType("HashString")
                            .withFilterable(true)
                            .build()
                    }
                } as FilterContextValue);
                (window as any).mx = mxObject;
            });

            it("renders error message", () => {
                const filter = mount(<DatagridNumberFilter {...commonProps} />);

                expect(filter.find(Alert).text()).toBe(
                    'The Number filter widget can\'t be used with the filters options you have selected. It requires a "Autonumber, Decimal, Integer or Long" attribute to be selected.'
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
                const filter = mount(<DatagridNumberFilter {...commonProps} />);

                expect(filter.find(Alert).text()).toBe(
                    "The Number filter widget must be placed inside the header of the Data grid 2.0 or Gallery widget."
                );
            });
        });
    });

    describe("with multiple instances", () => {
        beforeAll(() => {
            (window as any)["com.mendix.widgets.web.filterable.filterContext"] = createContext({
                filterDispatcher: jest.fn(),
                singleAttribute: new ListAttributeValueBuilder().withType("Long").withFilterable(true).build()
            } as FilterContextValue);
            (window as any).mx = mxObject;
        });

        it("renders with a unique id", () => {
            const { asFragment: fragment1 } = testingLibraryRender(<DatagridNumberFilter {...commonProps} />);
            const { asFragment: fragment2 } = testingLibraryRender(<DatagridNumberFilter {...commonProps} />);

            expect(fragment1().querySelector("button")?.getAttribute("aria-controls")).not.toBe(
                fragment2().querySelector("button")?.getAttribute("aria-controls")
            );
        });

        afterAll(() => {
            (window as any)["com.mendix.widgets.web.filterable.filterContext"] = undefined;
            delete (global as any)["com.mendix.widgets.web.UUID"];
        });
    });
});
