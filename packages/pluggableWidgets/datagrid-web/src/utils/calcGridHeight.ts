import type { CalcHeightFn } from "@mendix/piw-utils-internal";

export const calcGridHeight: CalcHeightFn = (container, _numberOfItems, pageSize) => {
    const elements = container.querySelectorAll<HTMLElement>(".th:first-child, .td:first-child");
    const pageSizeWithHeader = pageSize + 1;

    const pageHeight = Array.from(elements)
        .slice(0, pageSizeWithHeader)
        .reduce((acc, elt) => acc + elt.offsetHeight, 0);

    return pageHeight - 30;
};
