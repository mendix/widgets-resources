import { CalcHeightFn } from "@mendix/piw-utils-internal";

export const calcGalleryHeight: CalcHeightFn = (container, _numberOfItems, pageSize) => {
    const elements = Array.from(container.querySelectorAll<HTMLElement>(".widget-gallery-item")).slice(0, pageSize);
    const [firstColumnElements] = elements.reduce(
        ([items, visitedRows], elt) => {
            if (!visitedRows.has(elt.offsetTop)) {
                items.push(elt);
                visitedRows.add(elt.offsetTop);
            }

            return [items, visitedRows];
        },
        [[] as HTMLElement[], new Set<number>()] as const
    );
    const pageHeight = firstColumnElements.reduce((acc, elt) => acc + elt.offsetHeight, 0);
    return pageHeight - 30;
};
