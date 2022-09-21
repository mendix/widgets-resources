import { createElement, createContext } from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { FilterContextValue } from "@mendix/piw-utils-internal/components/native";
import { actionValue, dynamicValue, EditableValueBuilder, ListAttributeValueBuilder } from "@mendix/piw-utils-internal";
import { GalleryTextFilter, Props } from "../../GalleryTextFilter";

jest.useFakeTimers();

const commonProps: Props = {
    name: "filter-test",
    defaultFilter: "equal" as const,
    delay: 1000,
    style: []
};

describe("Text Filter", () => {
    describe("sync input value with defaultValue prop", () => {
        beforeAll(() => {
            (global as any)["com.mendix.widgets.native.filterable.filterContext"] = createContext({
                filterDispatcher: jest.fn(),
                singleAttribute: new ListAttributeValueBuilder().withType("String").withFilterable(true).build()
            } as FilterContextValue);
        });

        it("sync value when defaultValue changes from undefined to string", () => {
            const component = render(<GalleryTextFilter {...commonProps} defaultValue={undefined} />);
            expect(component.getByTestId(`${commonProps.name}-text-input`).props.value).toBe("");

            const defaultValue = dynamicValue<string>("xyz");
            component.rerender(<GalleryTextFilter {...commonProps} defaultValue={defaultValue} />);
            expect(component.getByTestId(`${commonProps.name}-text-input`).props.value).toBe("xyz");
        });

        it("sync value when defaultValue changes from string to string", () => {
            const component = render(<GalleryTextFilter {...commonProps} defaultValue={dynamicValue<string>("abc")} />);
            expect(component.getByTestId(`${commonProps.name}-text-input`).props.value).toBe("abc");

            const defaultValue = dynamicValue<string>("xyz");
            component.rerender(<GalleryTextFilter {...commonProps} defaultValue={defaultValue} />);
            expect(component.getByTestId(`${commonProps.name}-text-input`).props.value).toBe("xyz");
        });

        it("sync value when defaultValue changes from string to undefined", () => {
            const component = render(<GalleryTextFilter {...commonProps} defaultValue={dynamicValue<string>("abc")} />);
            expect(component.getByTestId(`${commonProps.name}-text-input`).props.value).toBe("abc");

            component.rerender(<GalleryTextFilter {...commonProps} defaultValue={undefined} />);
            expect(component.getByTestId(`${commonProps.name}-text-input`).props.value).toBe("");
        });

        afterAll(() => {
            (global as any)["com.mendix.widgets.native.filterable.filterContext"] = undefined;
        });
    });

    describe("with single attribute", () => {
        beforeAll(() => {
            (global as any)["com.mendix.widgets.native.filterable.filterContext"] = createContext({
                filterDispatcher: jest.fn(),
                singleAttribute: new ListAttributeValueBuilder().withType("String").withFilterable(true).build()
            } as FilterContextValue);
        });

        it("renders correctly", () => {
            const component = render(<GalleryTextFilter {...commonProps} />);
            expect(component).toMatchSnapshot();
        });

        it("triggers attribute and onchange action on change filter value", () => {
            const action = actionValue();
            const attribute = new EditableValueBuilder<string>().build();
            const component = render(
                <GalleryTextFilter {...commonProps} onChange={action} valueAttribute={attribute} />
            );
            fireEvent.changeText(component.getByTestId(`${commonProps.name}-text-input`), "B");
            jest.advanceTimersByTime(1000);
            expect(action.execute).toHaveBeenCalledTimes(1);
        });

        afterAll(() => {
            (global as any)["com.mendix.widgets.native.filterable.filterContext"] = undefined;
        });
    });

    describe("with multiple attributes", () => {
        beforeAll(() => {
            (global as any)["com.mendix.widgets.native.filterable.filterContext"] = createContext({
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
        });

        it("renders correctly", () => {
            const component = render(<GalleryTextFilter {...commonProps} />);
            expect(component).toMatchSnapshot();
        });

        afterAll(() => {
            (global as any)["com.mendix.widgets.native.filterable.filterContext"] = undefined;
        });
    });

    describe("with wrong attribute's type", () => {
        beforeAll(() => {
            (global as any)["com.mendix.widgets.native.filterable.filterContext"] = createContext({
                filterDispatcher: jest.fn(),
                singleAttribute: new ListAttributeValueBuilder().withType("Decimal").withFilterable(true).build()
            } as FilterContextValue);
        });

        it("renders error message", () => {
            const component = render(<GalleryTextFilter {...commonProps} />);
            expect(component).toMatchSnapshot();
        });

        afterAll(() => {
            (global as any)["com.mendix.widgets.native.filterable.filterContext"] = undefined;
        });
    });

    describe("with wrong multiple attributes' types", () => {
        beforeAll(() => {
            (global as any)["com.mendix.widgets.native.filterable.filterContext"] = createContext({
                filterDispatcher: jest.fn(),
                multipleAttributes: {
                    attribute1: new ListAttributeValueBuilder()
                        .withId("attribute1")
                        .withType("Decimal")
                        .withFilterable(true)
                        .build(),
                    attribute2: new ListAttributeValueBuilder()
                        .withId("attribute2")
                        .withType("Long")
                        .withFilterable(true)
                        .build()
                }
            } as FilterContextValue);
        });

        it("renders error message", () => {
            const component = render(<GalleryTextFilter {...commonProps} />);
            expect(component).toMatchSnapshot();
        });

        afterAll(() => {
            (global as any)["com.mendix.widgets.native.filterable.filterContext"] = undefined;
        });
    });

    describe("without context", () => {
        beforeAll(() => {
            (global as any)["com.mendix.widgets.native.filterable.filterContext"] = undefined;
        });

        it("renders error message", async () => {
            const component = render(<GalleryTextFilter {...commonProps} />);
            expect(component).toMatchSnapshot();
        });
    });
});
