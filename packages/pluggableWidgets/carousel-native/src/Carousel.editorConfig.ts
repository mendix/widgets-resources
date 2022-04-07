import { RowLayoutProps, StructurePreviewProps } from "@mendix/piw-utils-internal";

import paginationSVG from "./assets/pagination.svg";

import { CarouselPreviewProps } from "../typings/CarouselProps";

export function getPreview(values: CarouselPreviewProps, isDarkMode: boolean): StructurePreviewProps {
    const paginationImageRowLayout: RowLayoutProps = {
        type: "RowLayout",
        columnSize: "grow",
        padding: 4,
        children: [
            {
                type: "Container",
                grow: 1
            },
            {
                type: "Image",
                document: decodeURIComponent(paginationSVG.replace("data:image/svg+xml,", "")),
                width: 57
            },
            {
                type: "Container",
                grow: 1
            }
        ]
    };

    return {
        type: "Container",
        borders: true,
        children: [
            {
                type: "Container",
                backgroundColor: isDarkMode ? "#454545" : "#F5F5F5",
                children: [
                    {
                        type: "Container",
                        padding: 4,
                        children: [
                            {
                                type: "Text",
                                fontColor: isDarkMode ? "#DEDEDE" : "#6B707B",
                                content: "Carousel"
                            }
                        ]
                    }
                ]
            },
            {
                type: "DropZone",
                placeholder: "Place content here",
                property: values.content
            },
            ...(values.showPagination ? [paginationImageRowLayout] : [])
        ]
    };
}
