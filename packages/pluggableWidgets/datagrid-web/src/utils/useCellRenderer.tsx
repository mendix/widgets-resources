import { createElement, useCallback } from "react";
import { ListActionValue } from "mendix";
import { CellRenderer } from "../components/Table";
import { ColumnsType } from "../../typings/DatagridProps";
import classNames from "classnames";
import { executeAction } from "@mendix/piw-utils-internal";

interface CellRendererHookProps {
    columns: ColumnsType[];
    onClick?: ListActionValue;
}

export function useCellRenderer(props: CellRendererHookProps): CellRenderer {
    const renderer: CellRenderer = (renderWrapper, value, columnIndex) => {
        const column = props.columns[columnIndex];
        const title = column.tooltip && column.tooltip.get(value)?.value;
        let content;

        if (column.showContentAs === "attribute") {
            content = (
                <span title={title} className="td-text">
                    {column.attribute?.get(value)?.displayValue ?? ""}
                </span>
            );
        } else if (column.showContentAs === "dynamicText") {
            content = (
                <span title={title} className="td-text">
                    {column.dynamicText?.get(value)?.value ?? ""}
                </span>
            );
        } else {
            content = column.content?.get(value);
        }

        return renderWrapper(
            content,
            classNames(`align-column-${column.alignment}`, column.columnClass?.get(value)?.value, {
                "wrap-text": column.wrapText
            }),
            props.onClick ? () => executeAction(props.onClick?.get(value)) : undefined
        );
    };

    return useCallback(renderer, [props.columns, props.onClick]);
}
