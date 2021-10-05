import { Alert, SortContextValue, SortInstruction } from "@mendix/piw-utils-internal/components/web";
import { ListAttributeValueBuilder } from "@mendix/piw-utils-internal";
import { createContext, createElement } from "react";
import { DropdownSort } from "../../DropdownSort";
import { render } from "@testing-library/react";
import { mount } from "enzyme";
import { SortComponent } from "../SortComponent";

const commonProps = {
    class: "filter-custom-class",
    tabIndex: 0,
    name: "filter-test",
    sortOrder: "asc" as const
};

describe("Dropdown Sort", () => {
    describe("with single instance", () => {
        afterEach(() => {
            delete (global as any)["com.mendix.widgets.web.UUID"];
        });

        describe("with correct context", () => {
            beforeAll(() => {
                (window as any)["com.mendix.widgets.web.sortable.sortContext"] = createContext({
                    sortDispatcher: jest.fn(),
                    attributes: [
                        {
                            attribute: new ListAttributeValueBuilder()
                                .withId("attribute1")
                                .withType("String")
                                .withSortable(true)
                                .build(),
                            caption: "Option 1"
                        },
                        {
                            attribute: new ListAttributeValueBuilder()
                                .withId("attribute2")
                                .withType("Decimal")
                                .withSortable(true)
                                .build(),
                            caption: "Option 2"
                        }
                    ]
                } as SortContextValue);
            });

            it("loads correct values from attributes", () => {
                const filter = mount(<DropdownSort {...commonProps} />);

                expect(filter.find(SortComponent).prop("options")).toStrictEqual([
                    {
                        caption: "",
                        value: ""
                    },
                    {
                        caption: "Option 1",
                        value: "attribute1"
                    },
                    {
                        caption: "Option 2",
                        value: "attribute2"
                    }
                ]);
            });

            it("renders correctly", () => {
                const { asFragment } = render(<DropdownSort {...commonProps} />);

                expect(asFragment()).toMatchSnapshot();
            });

            afterAll(() => {
                (window as any)["com.mendix.widgets.web.sortable.sortContext"] = undefined;
            });
        });

        describe("with view state", () => {
            beforeAll(() => {
                (window as any)["com.mendix.widgets.web.sortable.sortContext"] = createContext({
                    sortDispatcher: jest.fn(),
                    attributes: [
                        {
                            attribute: new ListAttributeValueBuilder()
                                .withId("attribute1")
                                .withType("String")
                                .withSortable(true)
                                .build(),
                            caption: "Option 1"
                        },
                        {
                            attribute: new ListAttributeValueBuilder()
                                .withId("attribute2")
                                .withType("Decimal")
                                .withSortable(true)
                                .build(),
                            caption: "Option 2"
                        }
                    ],
                    initialSort: [["attribute2", "asc"] as SortInstruction]
                } as SortContextValue);
            });

            it("loads correct default option", () => {
                const filter = mount(<DropdownSort {...commonProps} />);

                expect(filter.find(SortComponent).prop("defaultOption")).toStrictEqual({
                    caption: "Option 2",
                    value: "attribute2"
                });
            });

            afterAll(() => {
                (window as any)["com.mendix.widgets.web.sortable.sortContext"] = undefined;
            });
        });

        describe("with no context", () => {
            beforeAll(() => {
                (window as any)["com.mendix.widgets.web.sortable.sortContext"] = undefined;
            });

            it("renders error message", () => {
                const filter = mount(<DropdownSort {...commonProps} />);

                expect(filter.find(Alert).text()).toBe(
                    "The Drop-down sort widget must be placed inside the header of the Gallery widget."
                );
            });
        });
    });

    describe("with multiple instances", () => {
        beforeAll(() => {
            (window as any)["com.mendix.widgets.web.sortable.sortContext"] = createContext({
                sortDispatcher: jest.fn(),
                attributes: [
                    {
                        attribute: new ListAttributeValueBuilder()
                            .withId("attribute1")
                            .withType("String")
                            .withSortable(true)
                            .build(),
                        caption: "Option 1"
                    },
                    {
                        attribute: new ListAttributeValueBuilder()
                            .withId("attribute2")
                            .withType("Decimal")
                            .withSortable(true)
                            .build(),
                        caption: "Option 2"
                    }
                ]
            } as SortContextValue);
        });

        it("renders with a unique id", () => {
            const { asFragment: fragment1 } = render(<DropdownSort {...commonProps} />);
            const { asFragment: fragment2 } = render(<DropdownSort {...commonProps} />);

            console.warn(fragment1().querySelector("input")?.getAttribute("aria-controls"));

            expect(fragment1().querySelector("input")?.getAttribute("aria-controls")).not.toBe(
                fragment2().querySelector("input")?.getAttribute("aria-controls")
            );
        });

        afterAll(() => {
            (window as any)["com.mendix.widgets.web.sortable.sortContext"] = undefined;
            delete (global as any)["com.mendix.widgets.web.UUID"];
        });
    });
});
