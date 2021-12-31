import { StructurePreviewProps, RowLayoutProps, ContainerProps } from "@mendix/piw-utils-internal";
import { ReactNode } from "react";
import { ListViewSwipeProps } from "../typings/ListViewSwipeProps";

const swipeContentContainer = (property: ReactNode, isDarkMode: boolean): ContainerProps => ({
    type: "Container",
    borders: true,
    backgroundColor: isDarkMode ? "#4F4F4F" : "#F5F5F5",
    children: [
        {
            type: "DropZone",
            property: property as object
        }
    ]
});

export function getPreview(values: ListViewSwipeProps<any>, isDarkMode: boolean): RowLayoutProps {
    const children: StructurePreviewProps[] = [
        {
            type: "Container",
            grow: 2,
            borders: true,
            children: [
                {
                    type: "DropZone",
                    property: values.content as object
                }
            ]
        }
    ];

    if (values.leftRenderMode !== "disabled") {
        children.unshift(swipeContentContainer(values.left, isDarkMode));
    }
    if (values.rightRenderMode !== "disabled") {
        children.push(swipeContentContainer(values.right, isDarkMode));
    }

    return {
        type: "RowLayout",
        borders: false,
        columnSize: "fixed",
        children
    };
}
