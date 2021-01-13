import { StructurePreviewProps, RowLayoutProps, ContainerProps } from "@widgets-resources/piw-utils";
import { ReactNode } from "react";
import { ListViewSwipeProps } from "../typings/ListViewSwipeProps";

const swipeContentContainer = (property: ReactNode): ContainerProps => ({
    type: "Container",
    borders: true,
    backgroundColor: "#F5F5F5",
    children: [
        {
            type: "DropZone",
            property: property as object
        }
    ]
});

export function getPreview(values: ListViewSwipeProps<any>): RowLayoutProps {
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
        children.unshift(swipeContentContainer(values.left));
    }
    if (values.rightRenderMode !== "disabled") {
        children.push(swipeContentContainer(values.right));
    }

    return {
        type: "RowLayout",
        borders: false,
        columnSize: "fixed",
        children
    };
}
