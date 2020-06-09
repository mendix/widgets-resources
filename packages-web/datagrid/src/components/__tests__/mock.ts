import { createElement } from "react";
import { dynamicValue } from "@widgets-resources/piw-utils";

/* eslint-disable @typescript-eslint/camelcase */
export function mockData(amount: number, value = "test", hasWidget = false): any {
    return Array(amount).map(index => ({
        [`col_${index}`]: value,
        [`col_${index}_hasWidgets`]: hasWidget,
        [`content_col_${index}`]: hasWidget ? createElement("span", {}, "Test") : undefined
    }));
}

export function mockColumns(amount: number, value = "test"): any {
    return Array(amount).map(() => ({
        header: dynamicValue(value),
        sortable: false,
        filterable: false,
        resizable: false,
        draggable: false,
        hidable: "no"
    }));
}
