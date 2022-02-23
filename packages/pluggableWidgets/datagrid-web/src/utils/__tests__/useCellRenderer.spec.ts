import { GUID } from "mendix";
import { renderHook } from "@testing-library/react-hooks";
import { useCellRenderer } from "../useCellRenderer";
import {
    dynamicValue,
    buildListExpression,
    buildWidgetValue,
    EditableValueBuilder,
    ListAttributeValueBuilder
} from "@mendix/piw-utils-internal";
import { ColumnsType } from "../../../typings/DatagridProps";

const col: ColumnsType = {
    showContentAs: "attribute",
    header: dynamicValue("Test"),
    sortable: false,
    resizable: false,
    draggable: false,
    hidable: "no" as const,
    width: "autoFill" as const,
    size: 1,
    alignment: "left" as const,
    wrapText: false
};

describe("Datagrid useCellRenderer hook", () => {
    it("adds title when column has attribute as datasource", () => {
        const tooltipValue = "Jupiter is the fifth planet from the Sun";
        const { result } = renderHook(() => {
            const attribute = new ListAttributeValueBuilder().withId("attribute1").withType("String").build();
            const tooltip = buildListExpression(tooltipValue);

            attribute.get = jest.fn(() => new EditableValueBuilder<string>().withValue("Jupiter").build());

            return useCellRenderer({
                columns: [{ ...col, attribute, tooltip }]
            });
        });

        const renderWrapper = jest.fn(x => x);
        const output = result.current(renderWrapper, { id: "111" as GUID }, 0);
        expect(renderWrapper).toBeCalled();
        expect(output.type).toBe("span");
        expect(output.props.title).toEqual(tooltipValue);
        expect(output.props.children).toEqual("Formatted Jupiter");
    });

    it("not render title attribute if tooltip is empty string", () => {
        const tooltipValue = "";
        const { result: resultA } = renderHook(() => {
            const attribute = new ListAttributeValueBuilder().withId("attribute1").withType("String").build();
            const tooltip = buildListExpression(tooltipValue);

            attribute.get = jest.fn(() => new EditableValueBuilder<string>().withValue("Jupiter").build());

            return useCellRenderer({
                columns: [{ ...col, attribute, tooltip }]
            });
        });

        const { result: resultB } = renderHook(() => {
            const tooltip = buildListExpression(tooltipValue);
            const dynamicText = buildListExpression("Make me happy");

            return useCellRenderer({
                columns: [{ ...col, showContentAs: "dynamicText", dynamicText, tooltip }]
            });
        });

        const wrapperA = jest.fn(x => x);
        const wrapperB = jest.fn(x => x);
        const outputA = resultA.current(wrapperA, { id: "111" as GUID }, 0);
        const outputB = resultB.current(wrapperB, { id: "112" as GUID }, 0);
        expect(outputA.props.title).toBe("");
        expect(outputB.props.title).toBe("");
    });

    it("adds title when column has dynamicText as datasource", () => {
        const tooltipValue = "Do not forget to make $ git lfs pull";
        const { result } = renderHook(() => {
            const tooltip = buildListExpression(tooltipValue);
            const dynamicText = buildListExpression("Make me happy");

            return useCellRenderer({
                columns: [{ ...col, showContentAs: "dynamicText", dynamicText, tooltip }]
            });
        });

        const renderWrapper = jest.fn(x => x);
        const output = result.current(renderWrapper, { id: "222" as GUID }, 0);
        expect(renderWrapper).toBeCalled();
        expect(output.type).toBe("span");
        expect(output.props.title).toEqual(tooltipValue);
        expect(output.props.children).toEqual("Make me happy");
    });

    it("ignores tooltip when content is 'customContent'", () => {
        const tooltipValue = "Lorem ipsum";
        const { result } = renderHook(() => {
            const tooltip = buildListExpression(tooltipValue);
            const content = buildWidgetValue("custom content");

            return useCellRenderer({
                columns: [{ ...col, showContentAs: "customContent", content, tooltip }]
            });
        });

        const renderWrapper = jest.fn(x => x);
        const output = result.current(renderWrapper, { id: "333" as GUID }, 0);
        expect(renderWrapper).toBeCalled();
        expect(output).toEqual("custom content");
    });
});
