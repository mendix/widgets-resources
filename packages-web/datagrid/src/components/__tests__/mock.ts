import { createElement } from "react";
import { ColumnsConfig } from "../../../typings/ReactTable";

/* eslint-disable @typescript-eslint/camelcase */
export function mockData(amount: number, value = "test", hasWidget = false): any {
    return Array(amount).map(index => ({
        [`col_${index}`]: value,
        [`col_${index}_hasWidgets`]: hasWidget,
        [`content_col_${index}`]: hasWidget ? createElement("span", {}, "Test") : undefined
    }));
}

export function mockColumns(amount: number, value = "test"): any {
    return Array(amount).map(index => ({
        Header: value,
        accessor: `col_${index}`
    }));
}

export function mockColumnsConfig(amount: number): ColumnsConfig {
    return Array(amount)
        .map(index => ({
            [`col_${index}`]: {
                hasWidgets: false,
                sortable: false,
                filterable: false,
                resizable: false,
                draggable: false,
                hidable: "no" as const
            }
        }))
        .reduce((acc, current) => ({ ...acc, ...current }), {});
}
